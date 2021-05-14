import { 
  AfterContentChecked,
  AfterContentInit, 
  ChangeDetectionStrategy, 
  ChangeDetectorRef, 
  Component, 
  ContentChild, 
  ContentChildren, 
  Directive, 
  EventEmitter, 
  HostListener, 
  Input, 
  OnChanges, 
  Output, 
  QueryList, 
  TemplateRef,
  TrackByFunction, 
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
export class UsaTableComponent implements AfterContentInit, OnChanges, AfterContentChecked {

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
   * Tracking function that will be used to check the differences in data changes. 
   * Used similarly to ngFor trackBy function Optimize row operations by identifying 
   * a row based on its data relative to the function to know if a row should be 
   * added/removed/moved. Accepts a function that takes two parameters, index and item.
   */
  @Input() trackBy: TrackByFunction<TableDataSource>;

  /**
   * Whether or not the data is sorted server side. If set to true, then
   * the table will not perform sort operations on given data, but simply
   * handle bookkeeping of sort state and event emission
   */
  @Input() serverSideSort: boolean;

  /**
   * Emitted whenever a column's sort button is clicked. Emits columns name and
   * sort state (ascending/descending) value
   */
  @Output() sortClicked = new EventEmitter<{column: string, sortState: 'ascending' | 'descending'}>();

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
   * Internal flag that gets raised anytime input data reference changes to indicate
   * next content check cycle, we need to re-evaluate the column with data sort active
   */
  _resortAfterContentCheck: boolean = false;

  /**
   * Event bubbled up from sort button on click. Sorts the table based on
   * sort function for the given column
   * @param $event 
   */
  @HostListener('sort', ['$event'])
  onSortClicked($event: CustomEvent) {  
    let isColumnFound = false;  
    this._contentColumnDefs.forEach(column => {
      if (!column.tableSort) {
        return;
      }
      const tableSortEl = column.tableSort._el.nativeElement;
      if (column.isSortActive && $event.target != tableSortEl) {
        column.setSortInactive();
      } else if (tableSortEl === $event.target) {
        this._sortColumnData(column, $event.detail.sortFn, $event.detail.sortState);
        isColumnFound = true;
      }
    });

    this.setAriaLiveOnSort();
    $event.stopImmediatePropagation();

    if (!isColumnFound) {
      return;
    }
    
    const sortEvent = {
      column: this._sortedColumnInfo.sortColumn.usaColumnDef,
      sortState: this._sortedColumnInfo.sortState
    };

    this.sortClicked.emit(sortEvent);
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
    this.serverSideSort = this.config.serverSideSort;
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

    this._resortAfterContentCheck = true;
    this.cdr.detectChanges();
  }

  ngAfterContentChecked() {
    if (!this._resortAfterContentCheck) {
      return;
    }

    this._sortColumnData(
      this._sortedColumnInfo.sortColumn, 
      this._sortedColumnInfo.sortFn, 
      this._sortedColumnInfo.sortState);
    this.cdr.detectChanges();
    this._resortAfterContentCheck = false;
  }

  private _sortColumnData(sortColumn: UsaColumnDef, sortFn: Function, sortState: 'ascending' | 'descending') {
    sortColumn.setSortActive(sortState);

    this._sortedColumnInfo = {
      sortFn,
      sortState,
      sortColumn
    };

    /**
     * Sorting done from server side - omit front end side sorting
     */
    if (this.serverSideSort) {
      return;
    }

    this.displayedData.sort((a, b) => {
      const valueA = a[sortColumn.usaColumnDef];
      const valueB = b[sortColumn.usaColumnDef];

      // Invert sorting if state is descending
      return sortState === 'ascending' ? sortFn(valueA, valueB) : (-1) * sortFn(valueA,valueB);
    });


  }

  private setAriaLiveOnSort() {
    if (!this._sortedColumnInfo.sortColumn || !this._sortedColumnInfo.sortState) {
      return;
    }

    const sortedColumn = this._sortedColumnInfo.sortColumn.tableHeader._defaultAriaLabel;
    this._ariaLiveSortMessage = `The column ${sortedColumn} is now sorted in ${this._sortedColumnInfo.sortState} order`;
  }
}
