import { 
  Component, ContentChildren, 
  Input, QueryList, ElementRef, AfterContentChecked, 
  EventEmitter, Output, Renderer2 
} from '@angular/core';
import { Key, KeyCode, MicrosfotKeys } from '../util/key';
import { isString, findLast, getNextItemInList } from '../util/util';
import { UsaAccordionItem, UsaAccordionChangeEvent } from './accordion-items';
import { UsaAccordionConfig } from './accordion.config';
import { AnimationEvent } from '@angular/animations';
import { UsaExpansionAnimations } from './accordion-animations';

@Component({
  selector: 'usa-accordion',
  exportAs: 'usaAccordion',
  templateUrl: './accordion.component.html',
  animations: [UsaExpansionAnimations.bodyExpansion],
  host: {
    'class': 'usa-accordion',
    '[class.usa-accordion--bordered]': 'bordered',
    '[attr.aria-multiselectable]': 'singleSelect ? true : undefined',
    'role': 'tablist',
  },
})
export class UsaAccordionComponent implements AfterContentChecked  {

  @ContentChildren(UsaAccordionItem) panels: QueryList<UsaAccordionItem>;

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
  @Input() singleSelect: boolean;

  /**
   * Type of panels.
   *
   * Bootstrap provides styles for the following types: `'success'`, `'info'`, `'warning'`, `'danger'`, `'primary'`,
   * `'secondary'`, `'light'` and `'dark'`.
   */
  @Input() bordered: boolean;

  /**
   * Heading level to use for accordion headers - possible inputs are anywhere from heading level 2 to 6.
   */
  @Input() headerLevel: 2 | 3 | 4 | 5 | 6;

  /**
   * Event emitted right before the panel toggle happens.
   */
  @Output() panelChange = new EventEmitter<UsaAccordionChangeEvent>();

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
      config: UsaAccordionConfig, 
      private _element: ElementRef,
      private _renderer: Renderer2
    ) {
    this.animation = config.animation;
    this.bordered = config.bordered;
    this.singleSelect = config.singleSelect;
    this.headerLevel = config.headerLevel;
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
    if (this.singleSelect) {
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

  /** Gets the expanded state string. */
  _getExpandedState(panel: UsaAccordionItem) {
    return panel.isOpen ? 'expanded' : 'collapsed';
  }

  ngAfterContentChecked() {
    // active id updates
    if (isString(this.activeIds)) {
      this.activeIds = this.activeIds.split(/\s*,\s*/);
    }

    // update panels open states
    this.panels.forEach(panel => { panel.isOpen = !panel.disabled && this.activeIds.indexOf(panel.id) > -1; });

    // closeOthers updates
    if (this.activeIds.length > 1 && this.singleSelect) {
      this._closeOthers(this.activeIds[0]);
      this._updateActiveIds();
    }
  }

  onKeyDown($event: KeyboardEvent, panel: UsaAccordionItem) {
    const keyPressed = $event.key || $event.keyCode;
    switch(keyPressed) {
      case Key.ArrowDown:
      case MicrosfotKeys.ArrowDown:
      case KeyCode.ArrowDown:
        this._getPanelElementHeaderButton(
          this._getNextAccordion(panel, 1).id
        ).focus();
        $event.preventDefault();
        break;
      case Key.ArrowUp:
      case MicrosfotKeys.ArrowUp:
      case KeyCode.ArrowUp:
        this._getPanelElementHeaderButton(
          this._getNextAccordion(panel, -1).id
        ).focus();
        $event.preventDefault();
        break;
      case Key.Home:
      case MicrosfotKeys.Home:
      case KeyCode.Home:
        const firstPanel = this.panels.find(panel => !panel.disabled);
        if (firstPanel) {
          this._getPanelElementHeaderButton(firstPanel.id).focus();
        }
        $event.preventDefault();
        break;
      case Key.End:
      case MicrosfotKeys.End:
      case KeyCode.End:
        const lastFocusablePanel = findLast(this.panels.toArray(), (panel => !panel.disabled));
        if (lastFocusablePanel) {
          this._getPanelElementHeaderButton(lastFocusablePanel.id).focus();
        }
        $event.preventDefault();
        break;
    }
  }

  onBodyExpansionStart(event: AnimationEvent, panel: HTMLDivElement) {
    if (event.fromState === 'collapsed' && event.toState === 'expanded') {
      this._renderer.removeStyle(panel, 'display');
    }
  }

  onBodyExpansionEnd(event: AnimationEvent, panel: HTMLDivElement) {
    if (event.fromState !== 'void') {
      if (event.toState === 'expanded') {
        this.shown.emit();
      } else if (event.toState === 'collapsed') {
        this._renderer.setStyle(panel, 'display', 'none');
        this.hidden.emit();
      }
    }
  }

  private _getNextAccordion(currentPanel: UsaAccordionItem, delta: 1 | -1) {
    const allPanels = this.panels.toArray();
    const currentIndex = allPanels.indexOf(currentPanel);
    const nextPanel = getNextItemInList(currentIndex, allPanels, delta);
    return nextPanel
  }

  private _changeOpenState(panel: UsaAccordionItem | null, nextState: boolean) {
    if (panel != null && !panel.disabled && panel.isOpen !== nextState) {
      let defaultPrevented = false;

      this.panelChange.emit(
          {panelId: panel.id, nextState: nextState, preventDefault: () => { defaultPrevented = true; }});

      if (!defaultPrevented) {
        panel.isOpen = nextState;

        if (nextState && this.singleSelect) {
          this._closeOthers(panel.id);
        }
        this._updateActiveIds();
      }
    }
  }

  private _closeOthers(panelId: string) {
    this.panels.forEach(panel => {
      if (panel.id !== panelId && panel.isOpen) {
        panel.isOpen = false;
      }
    });
  }

  private _findPanelById(panelId: string): UsaAccordionItem | null { return this.panels.find(p => p.id === panelId) || null; }

  private _updateActiveIds() {
    this.activeIds = this.panels.filter(panel => panel.isOpen && !panel.disabled).map(panel => panel.id);
  }

  private _getPanelElementHeaderButton(panelId: string): HTMLElement | null {
    return this._element.nativeElement.querySelector('#' + panelId + '-header button');
  }
}
