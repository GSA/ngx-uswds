import { 
  ChangeDetectorRef, Component, ContentChildren, 
  Input, QueryList, ElementRef, NgZone, AfterContentChecked, 
  EventEmitter, Output 
} from '@angular/core';
import { take } from 'rxjs/operators';
import { ngbCollapsingTransition } from '../util/transition/uswdsCollapseTransition';
import { ngbRunTransition } from '../util/transition/uswdsTransition';
import { isString } from '../util/util';
import { USWDSPanel } from './accordion-panel.directive';
import { NgbAccordionConfig } from './accordion.config';


/**
 * An event emitted right before toggling an accordion panel.
 */
 export interface NgbPanelChangeEvent {
  /**
   * The id of the accordion panel being toggled.
   */
  panelId: string;

  /**
   * The next state of the panel.
   *
   * `true` if it will be opened, `false` if closed.
   */
  nextState: boolean;

  /**
   * Calling this function will prevent panel toggling.
   */
  preventDefault: () => void;
}

@Component({
  selector: 'uswds-accordion',
  exportAs: 'uswdsAccordion',
  templateUrl: './accordion.component.html',
  host: {'class': 'usa-accordion', 'role': 'tablist', '[attr.aria-multiselectable]': 'isMultiSelectable'},
})
export class USWDSAccordionComponent implements AfterContentChecked  {

  @ContentChildren(USWDSPanel) panels: QueryList<USWDSPanel>;

  /**
   * If `true`, accordion will be animated.
   *
   * @since 8.0.0
   */
  @Input() animation;

  /**
   * An array or comma separated strings of panel ids that should be opened **initially**.
   *
   * For subsequent changes use methods like `expand()`, `collapse()`, etc. and
   * the `(panelChange)` event.
   */
  @Input() activeIds: string | readonly string[] = [];

  /**
   *  If `true`, only one panel could be opened at a time.
   *
   *  Opening a new panel will close others.
   */
  @Input('closeOthers') closeOtherPanels: boolean;

  /**
   * If `true`, panel content will be detached from DOM and not simply hidden when the panel is collapsed.
   */
  @Input() destroyOnHide = true;

  /**
   * Type of panels.
   *
   * Bootstrap provides styles for the following types: `'success'`, `'info'`, `'warning'`, `'danger'`, `'primary'`,
   * `'secondary'`, `'light'` and `'dark'`.
   */
  @Input() type: string;

  /**
   * Event emitted right before the panel toggle happens.
   *
   * See [NgbPanelChangeEvent](#/components/accordion/api#NgbPanelChangeEvent) for payload details.
   */
  @Output() panelChange = new EventEmitter<NgbPanelChangeEvent>();

  /**
   * An event emitted when the expanding animation is finished on the panel. The payload is the panel id.
   *
   * @since 8.0.0
   */
  @Output() shown = new EventEmitter<string>();

  /**
   * An event emitted when the collapsing animation is finished on the panel, and before the panel element is removed.
   * The payload is the panel id.
   *
   * @since 8.0.0
   */
  @Output() hidden = new EventEmitter<string>();

  constructor(
      config: NgbAccordionConfig, private _element: ElementRef, private _ngZone: NgZone,
      private _changeDetector: ChangeDetectorRef) {
    this.animation = config.animation;
    this.type = config.type;
    this.closeOtherPanels = config.closeOthers;
  }

  /**
   * Checks if a panel with a given id is expanded.
   */
  isExpanded(panelId: string): boolean { return this.activeIds.indexOf(panelId) > -1; }

  /**
   * Expands a panel with a given id.
   *
   * Has no effect if the panel is already expanded or disabled.
   */
  expand(panelId: string): void { this._changeOpenState(this._findPanelById(panelId), true); }

  /**
   * Expands all panels, if `[closeOthers]` is `false`.
   *
   * If `[closeOthers]` is `true`, it will expand the first panel, unless there is already a panel opened.
   */
  expandAll(): void {
    if (this.closeOtherPanels) {
      if (this.activeIds.length === 0 && this.panels.length) {
        this._changeOpenState(this.panels.first, true);
      }
    } else {
      this.panels.forEach(panel => this._changeOpenState(panel, true));
    }
  }

  /**
   * Collapses a panel with the given id.
   *
   * Has no effect if the panel is already collapsed or disabled.
   */
  collapse(panelId: string) { this._changeOpenState(this._findPanelById(panelId), false); }

  /**
   * Collapses all opened panels.
   */
  collapseAll() {
    this.panels.forEach((panel) => { this._changeOpenState(panel, false); });
  }

  /**
   * Toggles a panel with the given id.
   *
   * Has no effect if the panel is disabled.
   */
  toggle(panelId: string) {
    const panel = this._findPanelById(panelId);
    if (panel) {
      this._changeOpenState(panel, !panel.isOpen);
    }
  }

  ngAfterContentChecked() {
    // active id updates
    if (isString(this.activeIds)) {
      this.activeIds = this.activeIds.split(/\s*,\s*/);
    }

    // update panels open states
    this.panels.forEach(panel => { panel.isOpen = !panel.disabled && this.activeIds.indexOf(panel.id) > -1; });

    // closeOthers updates
    if (this.activeIds.length > 1 && this.closeOtherPanels) {
      this._closeOthers(this.activeIds[0], false);
      this._updateActiveIds();
    }

    // Setup the initial classes here
    this._ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.panels.forEach(panel => {
        const panelElement = this._getPanelElement(panel.id);
        if (panelElement) {
          if (!panel.initClassDone) {
            panel.initClassDone = true;
            ngbRunTransition(this._ngZone, panelElement, ngbCollapsingTransition, {
              animation: false,
              runningTransition: 'continue',
              context: {direction: panel.isOpen ? 'show' : 'hide'}
            });
          }
        } else {
          // Classes must be initialized next time it will be in the dom
          panel.initClassDone = false;
        }
      });
    });
  }

  private _changeOpenState(panel: USWDSPanel | null, nextState: boolean) {
    if (panel != null && !panel.disabled && panel.isOpen !== nextState) {
      let defaultPrevented = false;

      this.panelChange.emit(
          {panelId: panel.id, nextState: nextState, preventDefault: () => { defaultPrevented = true; }});

      if (!defaultPrevented) {
        panel.isOpen = nextState;
        panel.transitionRunning = true;

        if (nextState && this.closeOtherPanels) {
          this._closeOthers(panel.id);
        }
        this._updateActiveIds();
        this._runTransitions(this.animation);
      }
    }
  }

  private _closeOthers(panelId: string, enableTransition = true) {
    this.panels.forEach(panel => {
      if (panel.id !== panelId && panel.isOpen) {
        panel.isOpen = false;
        panel.transitionRunning = enableTransition;
      }
    });
  }

  private _findPanelById(panelId: string): USWDSPanel | null { return this.panels.find(p => p.id === panelId) || null; }

  private _updateActiveIds() {
    this.activeIds = this.panels.filter(panel => panel.isOpen && !panel.disabled).map(panel => panel.id);
  }

  private _runTransitions(animation: boolean) {
    // detectChanges is performed to ensure that all panels are in the dom (via transitionRunning = true)
    // before starting the animation
    this._changeDetector.detectChanges();

    this.panels.forEach(panel => {
      // When panel.transitionRunning is true, the transition needs to be started OR reversed,
      // The direction (show or hide) is choosen by each panel.isOpen state
      if (panel.transitionRunning) {
        const panelElement = this._getPanelElement(panel.id);
        ngbRunTransition(this._ngZone, panelElement !, ngbCollapsingTransition, {
          animation,
          runningTransition: 'stop',
          context: {direction: panel.isOpen ? 'show' : 'hide'}
        }).subscribe(() => {
          panel.transitionRunning = false;
          const {id} = panel;
          if (panel.isOpen) {
            panel.shown.emit();
            this.shown.emit(id);
          } else {
            panel.hidden.emit();
            this.hidden.emit(id);
          }
        });
      }
    });
  }

  private _getPanelElement(panelId: string): HTMLElement | null {
    return this._element.nativeElement.querySelector('#' + panelId);
  }
}
