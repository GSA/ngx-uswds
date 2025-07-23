
import { ChangeDetectorRef, Directive, ElementRef, Input, OnChanges, TemplateRef } from "@angular/core";

	@Directive({
	standalone: false,
  selector: `[usaTableDataDef]`,
})
export class UsaTableDataDef {
  constructor(
    public templateRef: TemplateRef<any>,
  ) {}
}


	@Directive({
	standalone: false,
  selector: `[usa-table-data]`,
  host: {
    '[attr.data-sort-active]': '_isSortActive ? _isSortActive : undefined',
  }
})
export class UsaTableData {
  _isSortActive = false;

  constructor(
    public el: ElementRef
   ) {}

   setSortActive() {
     this._isSortActive = true;
   }

   setSortInactive() {
     this._isSortActive = false;
   }
}

/**
 * Represents one row of table data
 */
	@Directive({
	standalone: false,
  selector: `[usaDataRowDef]`,
})
export class UsaDataRowDef implements OnChanges {

  @Input()
  usaDataRowDefColumns: Iterable<string>;

  ngOnChanges() {
    this.cdr.detectChanges();
  }
  
  constructor(
    public templateRef: TemplateRef<any>,
    private cdr: ChangeDetectorRef,
  ) {}
}