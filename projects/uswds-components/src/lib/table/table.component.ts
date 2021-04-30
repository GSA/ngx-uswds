import { DOCUMENT } from '@angular/common';
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Directive, ElementRef, Inject, Input, IterableDiffers, OnDestroy, OnInit, QueryList, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TableHeader } from './table-header.model';


/** Interface used to provide an outlet for rows to be inserted into. */
export interface RowOutlet {
  viewContainer: ViewContainerRef;
}

@Directive({
  selector: `[usaTableHeaderDef]`,
})
export class UsaTableHeaderDef {
  constructor(
    public templateRef: TemplateRef<any>,
  ) {}
}

@Directive({
  selector: `[usa-table-header]`,
  host: {
    'class': 'font-mono-xs',
  }
})
export class UsaTableHeader implements AfterViewInit {
  constructor(
    public elementRef: ElementRef,
  ) {}

  ngAfterViewInit() {
  }
}

@Directive({
  selector: `[usaHeaderRowDef]`,
})
export class UsaHeaderRowDef implements AfterViewInit {
  
  @Input() usaHeaderRowDef: string[];
  
  constructor(public templateRef: TemplateRef<any>) {}

  ngAfterViewInit() {
  }
}

/**
 * Provides a handle for the table to grab the view container's ng-container to insert the header.
 * @docs-private
 */
 @Directive({selector: '[headerRowOutlet]'})
 export class HeaderRowOutlet implements RowOutlet {
   constructor(public viewContainer: ViewContainerRef, public elementRef: ElementRef) {}
 }

@Directive({
  selector: `[usaTableDataDef]`,
})
export class UsaTableDataDef {

  constructor(
    public templateRef: TemplateRef<any>,
  ) {}
}

@Directive({
  selector: `[usaDataRowDef]`,
})
export class UsaDataRowDef implements AfterViewInit {

  @Input() usaDataRowDefRow;

  @Input()
  usaDataRowDefColumns: Iterable<string>;

  constructor(
    public templateRef: TemplateRef<any>,
    public iterDiff: IterableDiffers,
  ) {}

  ngAfterViewInit() {
    console.log('datarowdef', this);
  }
}

@Directive({
  selector: `[usaColumnDef]`
})
export class UsaColumnDef implements OnInit {
  @ContentChild(UsaTableHeaderDef) tableHeader: UsaTableHeaderDef;
  @ContentChild(UsaTableDataDef) tableData: UsaTableDataDef;

  @Input() usaColumnDef: string;

  constructor(  ) {}

  ngOnInit() {
  }
}



@Component({
  selector: 'usa-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class UsaTableComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentInit {

  // Outlets in the table's template where the header, data rows, and footer will be inserted.
  // @ViewChild(DataRowOutlet, {static: true}) _rowOutlet: DataRowOutlet;
  // @ViewChild(HeaderRowOutlet, {static: true}) _headerRowOutlet: HeaderRowOutlet;
  // @ViewChild(FooterRowOutlet, {static: true}) _footerRowOutlet: FooterRowOutlet;
  // @ViewChild(NoDataRowOutlet, {static: true}) _noDataRowOutlet: NoDataRowOutlet;

  /**
   * The column definitions provided by the user that contain what the header, data, and footer
   * cells should render for each column.
   */
  @ContentChildren(UsaColumnDef, {descendants: true}) _contentColumnDefs: QueryList<UsaColumnDef>;

  /** Set of data row definitions that were provided to the table as content children. */
  @ContentChildren(UsaDataRowDef, {descendants: true}) _tableDataDefs: QueryList<UsaDataRowDef>;
  _dataRowDefs: UsaDataRowDef[];

  /** Set of header row definitions that were provided to the table as content children. */
  @ContentChildren(UsaHeaderRowDef, {
    descendants: true
  }) _contentHeaderRowDefs: QueryList<UsaHeaderRowDef>;

  /** Array Populated by Content Childern of UsaHeaderRowDef */
  _headerRowDefs: UsaHeaderRowDef[];

  // /** Set of footer row definitions that were provided to the table as content children. */
  // @ContentChildren(CdkFooterRowDef, {
  //   descendants: true
  // }) _contentFooterRowDefs: QueryList<CdkFooterRowDef>;

  // /** Row definition that will only be rendered if there's no data in the table. */
  // @ContentChild(CdkNoDataRow) _noDataRow: CdkNoDataRow;

  // @Input() displayedColumns: TableHeader[];

  
  @Input() displayedData: any[];

  _columnHeaderMap: Map<string, any>;
  _columnDataMap: Map<string, any>;

  private _document: any;

  constructor(
    @Inject(DOCUMENT) _document: any,
    private _elementRef: ElementRef,
  ) { 
    this._document = _document;
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this._columnHeaderMap = new Map();
    this._contentColumnDefs.forEach(column => {
      this._columnHeaderMap.set(column.usaColumnDef, column.tableHeader);
    });

  }

  ngAfterContentInit() {
    this._columnHeaderMap = new Map();
    this._columnDataMap = new Map();
    this._contentColumnDefs.forEach(column => {
      this._columnHeaderMap.set(column.usaColumnDef, column.tableHeader);
      this._columnDataMap.set(column.usaColumnDef, column.tableData);
    });

    this._headerRowDefs = this._contentHeaderRowDefs.toArray();
    this._dataRowDefs = this._tableDataDefs.toArray();
    console.log('data row', this._dataRowDefs);
    console.log('data map', this._columnDataMap);

  }

  ngOnDestroy() {
    // this._headerRowOutlet.viewContainer.clear();
  }

  log(headers) {
    console.log(headers);
  }
}
