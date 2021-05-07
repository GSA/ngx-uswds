import { DOCUMENT } from '@angular/common';
import { 
  AfterContentInit, 
  ChangeDetectionStrategy, 
  ChangeDetectorRef, 
  Component, 
  ContentChild, 
  ContentChildren, 
  Directive, 
  ElementRef, 
  HostListener, 
  Inject, 
  Input, 
  OnChanges, 
  OnDestroy, 
  QueryList, 
  TemplateRef, 
} from '@angular/core';
import { TableDataSource } from './models';
import { UsaDataRowDef, UsaTableData, UsaTableDataDef } from './table-data';
import { UsaHeaderRowDef, UsaTableHeader, UsaTableHeaderDef } from './table-header';
import { UsaSort } from './table-sort.component';
import { UsaTableConfig } from './table.config';

@Directive({
  selector: `[usaColumnDef]`
})
export class UsaColumnDef {
  @ContentChild(UsaTableHeaderDef) tableHeaderTemplate: UsaTableHeaderDef;
  @ContentChild(UsaTableHeader) tableHeader: UsaTableHeader;

  @ContentChild(UsaTableDataDef) tableDataTemplate: UsaTableDataDef;
  @ContentChildren(UsaTableData) tableData: QueryList<UsaTableData>;

  @ContentChild(UsaSort) tableSort: UsaSort;

  @Input() usaColumnDef: string;

  isSortActive = false;

  setSortActive(sortState: 'ascending' | 'descending') {
    this.tableHeader.setSortState(sortState);
    this.tableData.forEach(data => data.setSortActive());
    this.isSortActive = true;
  }

  setSortInactive() {
    this.tableHeader.setSortState('none');
    this.tableData.forEach(data => data.setSortInactive());
    this.isSortActive = false;
  }
}


@Component({
  selector: 'usa-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsaTableComponent implements AfterContentInit, OnChanges {

  /**
   * Display table without column borders
   * @default false
   */
  @Input() borderless: boolean;

  /**
   * Allow table to scroll horizontally when content expand view width
   * @default true
  */
  @Input() scrollable: boolean;

  /**
   * Add alternating light/grey background color when displaying table rows
   * @default false
   */
  @Input() striped: boolean;

  /**
   * Minimize table cell padding
   * @default false
   */
  @Input() compact: boolean;

  /**
   * Stack table when in mobile sized view
   */
  @Input() stacked: boolean;

  /**
   * Displays first column as header when in stacked mode
   */
  @Input() stackedHeader: boolean;

  /**
   * The column definitions provided by the user that contain what the header, data, and footer
   * cells should render for each column.
   */
  @ContentChildren(UsaColumnDef, {descendants: true}) _contentColumnDefs: QueryList<UsaColumnDef>;

  /** Set of data row definitions that were provided to the table as content children. */
  @ContentChild(UsaDataRowDef) _tableDataDefs: UsaDataRowDef;

  /** Set of header row definitions that were provided to the table as content children. */
  @ContentChildren(UsaHeaderRowDef, {
    descendants: true
  }) _contentHeaderRowDefs: QueryList<UsaHeaderRowDef>;

  /** Array Populated by Content Childern of UsaHeaderRowDef */
  _headerRowDefs: UsaHeaderRowDef[];

  
  @Input() displayedData: TableDataSource[];

  _columnHeaderMap: Map<string, UsaColumnDef> = new Map();
  _columnDataMap: Map<string, TemplateRef<UsaTableDataDef>> = new Map();

  /**
   * Reference of table sort info if new data is dynamically added / removed
   */
  _sortedColumnInfo: {sortState: 'ascending' | 'descending', sortFn: Function, sortColumn: UsaColumnDef} = {
    sortState: undefined,
    sortFn: undefined,
    sortColumn: undefined
  }

  _ariaLiveSortMessage: string;

  /**
   * Event bubbled up from sort button on click. Sorts the table based on
   * sort function for the given column
   * @param $event 
   */
  @HostListener('sort', ['$event'])
  onSortClicked($event: CustomEvent) {    
    this._contentColumnDefs.forEach(column => {
      if (!column.tableSort) {
        return;
      }
      const tableSortEl = column.tableSort._el.nativeElement;
      if (column.isSortActive && $event.target != tableSortEl) {
        column.setSortInactive();
      } else if (tableSortEl === $event.target) {
        this._sortColumnData(column, $event.detail.sortFn, $event.detail.sortState);
      }
    });

    this.setAriaLiveOnSort();
    $event.stopImmediatePropagation();
  }

  constructor(
    private config: UsaTableConfig,
    public cdr: ChangeDetectorRef,
  ) { 
    this.borderless = this.config.borderless;
    this.compact = this.config.compact;
    this.scrollable = this.config.scrollable;
    this.striped = this.config.striped;
    this.stacked = this.config.stacked;
    this.stackedHeader = this.config.stackedHeader;
  }

  ngAfterContentInit(): void {
    this._contentColumnDefs.forEach(column => {
      this._columnHeaderMap.set(column.usaColumnDef, column);
      this._columnDataMap.set(column.usaColumnDef, column.tableDataTemplate?.templateRef); 
    });

    this._headerRowDefs = this._contentHeaderRowDefs.toArray();
  }

  ngOnChanges(changes) {
    if (!changes.displayedData || !this._sortedColumnInfo.sortColumn) {
      return;
    }

    this._sortColumnData(
      this._sortedColumnInfo.sortColumn, 
      this._sortedColumnInfo.sortFn, 
      this._sortedColumnInfo.sortState);
  }

  private _sortColumnData(sortColumn: UsaColumnDef, sortFn: Function, sortState: 'ascending' | 'descending') {
    this.displayedData.sort((a, b) => {
      const valueA = a[sortColumn.usaColumnDef];
      const valueB = b[sortColumn.usaColumnDef];

      // Invert sorting if state is descending
      return sortState === 'ascending' ? sortFn(valueA, valueB) : (-1) * sortFn(valueA,valueB);
    });

    // this._refreshDataMappings(this._contentColumnDefs, sortedData);
    sortColumn.setSortActive(sortState);

    this._sortedColumnInfo = {
      sortFn,
      sortState,
      sortColumn
    };
  }

  private setAriaLiveOnSort() {
    if (!this._sortedColumnInfo.sortColumn || !this._sortedColumnInfo.sortState) {
      return;
    }

    const sortedColumn = this._sortedColumnInfo.sortColumn.tableHeader._defaultAriaLabel;
    this._ariaLiveSortMessage = `The column ${sortedColumn} is now sorted in ${this._sortedColumnInfo.sortState} order`;
  }
}
