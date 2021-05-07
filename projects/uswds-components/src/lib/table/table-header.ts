import { AfterViewInit, ContentChild, Directive, ElementRef, Input, TemplateRef } from "@angular/core";
import { UsaSort } from "./table-sort.component";


/**
 * Structural Directive to extract table header template
 * from user
 */
@Directive({
  selector: `[usaTableHeaderDef]`,
})
export class UsaTableHeaderDef {

  constructor(
    public templateRef: TemplateRef<any>,
  ) {}
}

/**
 * Directive to apply certain styles and/or attribute to table header
 */
@Directive({
  selector: `[usa-table-header]`,
  host: {
    '[attr.role]': '\'columnheader\'',
    '[attr.scope]': '\'col\'',
    '[attr.data-sortable]': 'usaSort ? true : undefined',
    '[attr.aria-sort]': 'ariaSort ? ariaSort : undefined',
    '[attr.aria-label]': 'ariaLabel'
  }
})
export class UsaTableHeader implements AfterViewInit{
  @ContentChild(UsaSort) usaSort: UsaSort;

  @Input() ariaLabel: string;

  ariaSort: 'ascending' | 'descending';

  _defaultAriaLabel: string;

  constructor(
    public elementRef: ElementRef
  ) {}

  ngAfterViewInit() {
    if (this.ariaLabel) {
      this.usaSort.setColumnHeader(this.ariaLabel);
      return;
    }

    let ariaLabel  = (this.elementRef.nativeElement as HTMLTableHeaderCellElement).innerText;
    this._defaultAriaLabel = ariaLabel;

    if (this.usaSort) {
      this.usaSort.setColumnHeader(this._defaultAriaLabel);
      ariaLabel = this._defaultAriaLabel + ', sortable column, currently unsorted'
    }

    this.ariaLabel = ariaLabel;
  }

  setSortState(sortState: 'ascending' | 'descending' | 'none') {
    if (sortState === 'none') {
      this.setSortInactive();
      return;
    }
    this.ariaSort = sortState;

    if (this._defaultAriaLabel) {
      this.ariaLabel = this._defaultAriaLabel  + ', sortable column, currently sorted ' + this.ariaSort;
    }
  }

  setSortInactive() {
    this.ariaSort = undefined;
    this.usaSort.disableSort();
    if (this._defaultAriaLabel) {
      this.ariaLabel = this._defaultAriaLabel  + ', sortable column, currently unsorted';
    }
  }
}

/**
 * Represents one row of table headers. Multiple rows of
 * table headers can exist in one table
 */
@Directive({
  selector: `[usaHeaderRowDef]`,
})
export class UsaHeaderRowDef {
  
  @Input() usaHeaderRowDef: string[];

  constructor(public templateRef: TemplateRef<any>) {}
}
