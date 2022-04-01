import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { UsaNavigationLink } from '../util/navigation';

/**
 * Selector for custom link template for displaying breadcrumbs.
 * Usage:
 * <usa-breadcrumb [items]="items">
 *  <a *usaBreadcrumbLinkTemplate="let breadcrumb" href="myHref">{{breadcrumb.text}}</a>
 * </usa-breadcrumbs>
 */
@Directive({
  selector: `[usaBreadcrumbLinkTemplate]`,
})
export class UsaBreadcrumbLinkTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
  selector: 'usa-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UsaBreadcrumbComponent implements OnInit, OnChanges {
  @ContentChild(UsaBreadcrumbLinkTemplate)
  breadcrumbLinkTemplate: UsaBreadcrumbLinkTemplate;

  /**
   * Toggles whether to wrap breadcrumb trail into new line on responsive
   * view or to truncate breadcrumb text. Value of true indicates breadcrumb
   * will wrap to new line, false will allow text to truncate
   * @default false
   */
  @Input() wrap: boolean = false;

  /**
   * Hides breadcrumbs when there is only one item to show for
   * breadcrumb trail. This occurs whenever the user is on the root
   * level page of the breadcrumb trail
   */
  @Input() hideSingleCrumb: boolean = false;

  /** List of breadcrumb items */
  @Input() items: UsaNavigationLink[];

  @Output() selected = new EventEmitter<UsaNavigationLink>();

  _displayedCrumbs: UsaNavigationLink[];
  _showBreadcrumbs: boolean = true;
  _selectedBreadcrumb: UsaNavigationLink;

  constructor(
    /**
     * For public component usage if parents ever want to programatically
     * invoke change detection on component
     */
    public cdr: ChangeDetectorRef
  ) {}

  /**
   * Initialize internal data within the component
   */
  ngOnInit(): void {
    this.updateShownCrumbs();
  }

  /**
   * Update data when relevant input reference changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.items && !changes.hideSingleCrumb) return;

    if (this._selectedBreadcrumb) {
      this._selectedBreadcrumb.selected = false;
    }

    this.updateShownCrumbs();
  }

  /**
   * Called whenever we need to update selected breadcrum to
   * another item. Normally occurs if user clicks on the breadcrum
   * @param breadcrumb
   */
  updateSelectedBreadcrumb(breadcrumb: UsaNavigationLink) {
    this._selectedBreadcrumb.selected = false;
    breadcrumb.selected = true;
    this.updateShownCrumbs();
    this.selected.emit(breadcrumb);
  }

  /**
   * Internal function to update the list of breadcrumbs currently shown as well
   * as other component fields
   */
  private updateShownCrumbs() {
    if (!this.items || !this.items.length) {
      this._showBreadcrumbs = false;
      return;
    }

    let truncateIndex = this.items.findIndex(
      (breadcrumb) => breadcrumb.selected
    );

    if (truncateIndex < 0) {
      truncateIndex = this.items.length - 1;
      this.items[truncateIndex].selected = true;
    }

    this._selectedBreadcrumb = this.items[truncateIndex];

    if (truncateIndex === 0 && this.hideSingleCrumb) {
      this._showBreadcrumbs = false;
    } else {
      this._showBreadcrumbs = true;
    }

    this._displayedCrumbs = this.items.slice(0, truncateIndex);
  }
}
