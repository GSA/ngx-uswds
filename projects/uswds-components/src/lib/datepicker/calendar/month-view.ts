import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
  ViewChild,
  OnDestroy,
  SimpleChanges,
  OnChanges,
  isDevMode,
} from '@angular/core';
import {
  UsaCalendarBody,
  UsaCalendarCell,
  UsaCalendarUserEvent,
  UsaCalendarCellClassFunction,
} from './calendar-body';
import { createMissingDateImplError } from '../date-picker-errors';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { DateRange } from '../date-selection-model';
import {
  UsaDateRangeSelectionStrategy,
  USA_DATE_RANGE_SELECTION_STRATEGY,
} from '../date-range-selection-strategy';
import { hasModifierKey, KeyCode } from '../../util/key';
import { DateAdapter } from '../dateadapter/date-adapter';
import { UsaDateFormats, USA_DATE_FORMATS } from '../dateadapter/date-formats';


const DAYS_PER_WEEK = 7;


/**
 * An internal component used to display a single month in the datePicker.
 * @docs-private
 */
@Component({
  selector: 'usa-month-view',
  templateUrl: './month-view.html',
  exportAs: 'usaMonthView',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsaMonthView<D> implements AfterContentInit, OnChanges, OnDestroy {
  private _rerenderSubscription = Subscription.EMPTY;

  /** Flag used to filter out space/enter keyup events that originated outside of the view. */
  private _selectionKeyPressed: boolean;

  /**
   * The date to display in this month view (everything other than the month and year is ignored).
   */
  @Input()
  get activeDate(): D { return this._activeDate; }
  set activeDate(value: D) {
    const oldActiveDate = this._activeDate;
    const validDate =
      this._dateAdapter.getValidDateOrNull(
        this._dateAdapter.deserialize(value)
      ) || this._dateAdapter.today();
    this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
    if (!this._hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
      this._init();
    }
  }
  private _activeDate: D;

  /** The currently selected date. */
  @Input()
  get selected(): DateRange<D> | D | null { return this._selected; }
  set selected(value: DateRange<D> | D | null) {
    if (value instanceof DateRange) {
      this._selected = value;
    } else {
      this._selected = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    }

    this._setRanges(this._selected);
  }
  private _selected: DateRange<D> | D | null;

  /** The minimum selectable date. */
  @Input()
  get minDate(): D | null { return this._minDate; }
  set minDate(value: D | null) {
    this._minDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  private _minDate: D | null;

  /** The maximum selectable date. */
  @Input()
  get maxDate(): D | null { return this._maxDate; }
  set maxDate(value: D | null) {
    this._maxDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  private _maxDate: D | null;

  /** Function used to filter which dates are selectable. */
  @Input() dateFilter: (date: D) => boolean;

  /** Function that can be used to add custom CSS classes to dates. */
  @Input() dateClass: UsaCalendarCellClassFunction<D>;

  /** Start of the comparison range. */
  @Input() comparisonStart: D | null;

  /** End of the comparison range. */
  @Input() comparisonEnd: D | null;

  /** Emits when a new date is selected. */
  @Output() readonly selectedChange: EventEmitter<D | null> = new EventEmitter<D | null>();

  /** Emits when any date is selected. */
  @Output() readonly _userSelection: EventEmitter<UsaCalendarUserEvent<D | null>> =
    new EventEmitter<UsaCalendarUserEvent<D | null>>();

  /** Emits when any date is activated. */
  @Output() readonly activeDateChange: EventEmitter<D> = new EventEmitter<D>();

  /** The body of calendar table */
  @ViewChild(UsaCalendarBody) _usaCalendarBody: UsaCalendarBody;

  /** The label for this month (e.g. "January 2017"). */
  _monthLabel: string;

  /** Grid of calendar cells representing the dates of the month. */
  _weeks: UsaCalendarCell[][];

  /** Last few dates for previous month to place in first row  if there is offset space */
  _prevMonthDays: UsaCalendarCell[];

  /** First few dates for next month to place in last row if there is offset space */
  _nextMonthDays: UsaCalendarCell[];

  /** The number of blank cells in the first row before the 1st of the month. */
  _firstWeekOffset: number;

  /** Start value of the currently-shown date range. */
  _rangeStart: number | null;

  /** End value of the currently-shown date range. */
  _rangeEnd: number | null;

  /** Start value of the currently-shown comparison date range. */
  _comparisonRangeStart: number | null;

  /** End value of the currently-shown comparison date range. */
  _comparisonRangeEnd: number | null;

  /** Start of the preview range. */
  _previewStart: number | null;

  /** End of the preview range. */
  _previewEnd: number | null;

  /** Whether the user is currently selecting a range of dates. */
  _isRange: boolean;

  /** The date of the month that today falls on. Null if today is in another month. */
  _todayDate: number | null;

  /** The names of the weekdays. */
  _weekdays: { long: string, narrow: string }[];

  constructor(readonly _changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(USA_DATE_FORMATS) private _dateFormats: UsaDateFormats,
    @Optional() public _dateAdapter: DateAdapter<D>,
    @Inject(USA_DATE_RANGE_SELECTION_STRATEGY) @Optional()
    private _rangeStrategy?: UsaDateRangeSelectionStrategy<D>) {

    if (isDevMode()) {
      if (!this._dateAdapter) {
        throw createMissingDateImplError('DateAdapter');
      }
      if (!this._dateFormats) {
        throw createMissingDateImplError('USA_DATE_FORMATS');
      }
    }

    this._activeDate = this._dateAdapter.today();
  }

  ngAfterContentInit() {
    this._rerenderSubscription = this._dateAdapter.localeChanges
      .pipe(startWith(null))
      .subscribe(() => this._init());
  }

  ngOnChanges(changes: SimpleChanges) {
    const comparisonChange = changes['comparisonStart'] || changes['comparisonEnd'];

    if (comparisonChange && !comparisonChange.firstChange) {
      this._setRanges(this.selected);
    }
  }

  ngOnDestroy() {
    this._rerenderSubscription.unsubscribe();
  }

  /** Handles when a new date is selected. */
  _dateSelected(event: UsaCalendarUserEvent<number>) {
    const date = new Date(event.value).getDate();
    const selectedYear = this._dateAdapter.getYear(this.activeDate);
    const selectedMonth = new Date(event.value).getMonth();
    const selectedDate = this._dateAdapter.createDate(selectedYear, selectedMonth, date);
    let rangeStartDate: number | null;
    let rangeEndDate: number | null;

    if (this._selected instanceof DateRange) {
      rangeStartDate = this._getDateInCurrentMonth(this._selected.start);
      rangeEndDate = this._getDateInCurrentMonth(this._selected.end);
    } else {
      rangeStartDate = rangeEndDate = this._getDateInCurrentMonth(this._selected);
    }

    if (rangeStartDate !== date || rangeEndDate !== date) {
      this.selectedChange.emit(selectedDate);
    }

    this._userSelection.emit({ value: selectedDate, event: event.event });
    this._previewStart = this._previewEnd = null;
    this._changeDetectorRef.markForCheck();
  }

  /** Handles keydown events on the calendar body when calendar is in month view. */
  _handleCalendarBodyKeydown(event: KeyboardEvent): void {
    // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
    // disabled ones from being selected. This may not be ideal, we should look into whether
    // navigation should skip over disabled dates, and if so, how to implement that efficiently.

    const oldActiveDate = this._activeDate;

    switch (event.keyCode) {
      case KeyCode.ArrowLeft:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, -1);
        break;
      case KeyCode.ArrowRight:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 1);
        break;
      case KeyCode.ArrowUp:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, -7);
        break;
      case KeyCode.ArrowDown:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 7);
        break;
      case KeyCode.Home:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate,
          1 - this._dateAdapter.getDate(this._activeDate));
        break;
      case KeyCode.End:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate,
          (this._dateAdapter.getNumDaysInMonth(this._activeDate) -
            this._dateAdapter.getDate(this._activeDate)));
        break;
      case KeyCode.PageUp:
        this.activeDate = event.altKey ?
          this._dateAdapter.addCalendarYears(this._activeDate, -1) :
          this._dateAdapter.addCalendarMonths(this._activeDate, -1);
        break;
      case KeyCode.PageDown:
        this.activeDate = event.altKey ?
          this._dateAdapter.addCalendarYears(this._activeDate, 1) :
          this._dateAdapter.addCalendarMonths(this._activeDate, 1);
        break;
      case KeyCode.Enter:
      case KeyCode.Space:
        this._selectionKeyPressed = true;

        if (this._canSelect(this._activeDate)) {
          // Prevent unexpected default actions such as form submission.
          // Note that we only prevent the default action here while the selection happens in
          // `keyup` below. We can't do the selection here, because it can cause the calendar to
          // reopen if focus is restored immediately. We also can't call `preventDefault` on `keyup`
          // because it's too late (see #23305).
          event.preventDefault();
        }
        return;
      case KeyCode.Escape:
        // Abort the current range selection if the user presses escape mid-selection.
        if (this._previewEnd != null && !hasModifierKey(event)) {
          this._previewStart = this._previewEnd = null;
          this.selectedChange.emit(null);
          this._userSelection.emit({ value: null, event });
          event.preventDefault();
          event.stopPropagation(); // Prevents the overlay from closing.
        }
        return;
      default:
        // Don't prevent default or focus active cell on keys that we don't explicitly handle.
        return;
    }

    if (this._dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
      this.activeDateChange.emit(this.activeDate);
    }

    this._focusActiveCell();
    // Prevent unexpected default actions such as form submission.
    event.preventDefault();
  }

  /** Handles keyup events on the calendar body when calendar is in month view. */
  _handleCalendarBodyKeyup(event: KeyboardEvent): void {
    if (event.keyCode === KeyCode.Space || event.keyCode === KeyCode.Enter) {
      if (this._selectionKeyPressed && this._canSelect(this._activeDate)) {
        this._dateSelected({ value: this._getCellCompareValue(this._activeDate), event });
      }

      this._selectionKeyPressed = false;
    }
  }

  /** Initializes this month view. */
  _init() {
    this._setRanges(this.selected);
    this._todayDate = this._getCellCompareValue(this._dateAdapter.today());
    this._monthLabel = this._dateFormats.display.monthLabel
      ? this._dateAdapter.format(this.activeDate, this._dateFormats.display.monthLabel)
      : this._dateAdapter.getMonthNames('short')[this._dateAdapter.getMonth(this.activeDate)]
        .toLocaleUpperCase();

    let firstOfMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate),
      this._dateAdapter.getMonth(this.activeDate), 1);
    this._firstWeekOffset =
      (DAYS_PER_WEEK + this._dateAdapter.getDayOfWeek(firstOfMonth) -
        this._dateAdapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;

    this._initWeekdays();
    this._createWeekCells();
    this._changeDetectorRef.markForCheck();
  }

  /** Focuses the active cell after the microtask queue is empty. */
  _focusActiveCell(movePreview?: boolean) {
    this._usaCalendarBody._focusActiveCell(movePreview);
  }

  /** Called when the user has activated a new cell and the preview needs to be updated. */
  _previewChanged({ event, value: cell }: UsaCalendarUserEvent<UsaCalendarCell<D> | null>) {
    if (this._rangeStrategy) {
      // We can assume that this will be a range, because preview
      // events aren't fired for single date selections.
      const value = cell ? cell.rawValue! : null;
      const previewRange =
        this._rangeStrategy.createPreview(value, this.selected as DateRange<D>, event);
      this._previewStart = this._getCellCompareValue(previewRange.start);
      this._previewEnd = this._getCellCompareValue(previewRange.end);

      // Note that here we need to use `detectChanges`, rather than `markForCheck`, because
      // the way `_focusActiveCell` is set up at the moment makes it fire at the wrong time
      // when navigating one month back using the keyboard which will cause this handler
      // to throw a "changed after checked" error when updating the preview state.
      this._changeDetectorRef.detectChanges();
    }
  }

  /** Initializes the weekdays. */
  private _initWeekdays() {
    const firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
    const narrowWeekdays = this._dateAdapter.getDayOfWeekNames('narrow');
    const longWeekdays = this._dateAdapter.getDayOfWeekNames('long');

    // Rotate the labels for days of the week based on the configured first day of the week.
    let weekdays = longWeekdays.map((long, i) => {
      return { long, narrow: narrowWeekdays[i] };
    });
    this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
  }

  /** Creates UsaCalendarCells for the dates in this month. */
  private _createWeekCells() {
    this._createCellForPrevMonth();

    const daysInMonth = this._dateAdapter.getNumDaysInMonth(this.activeDate);
    const prevMonth = this._dateAdapter.addCalendarMonths(this.activeDate, -1);
    const daysInPrevMonth = this._dateAdapter.getNumDaysInMonth(prevMonth);
    this._prevMonthDays = [];
    for (let i = daysInPrevMonth - this._firstWeekOffset; i < daysInPrevMonth; i++) {
      this._prevMonthDays.push(this.getCalendarCell(prevMonth, i));
    }

    this._weeks = [[]];
    for (let i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
      if (cell == DAYS_PER_WEEK) {
        this._weeks.push([]);
        cell = 0;
      }
      this._weeks[this._weeks.length - 1].push(this.getCalendarCell(this.activeDate, i));
    }

    this._createCellForNextMonth();
  }

  /**
   * Creates filler cells of previous month date to display in first row of current month view
   */
  private _createCellForPrevMonth() {
    const prevMonth = this._dateAdapter.addCalendarMonths(this.activeDate, -1);
    const daysInPrevMonth = this._dateAdapter.getNumDaysInMonth(prevMonth);
    this._prevMonthDays = [];
    for (let i = daysInPrevMonth - this._firstWeekOffset; i < daysInPrevMonth; i++) {
      this._prevMonthDays.push(this.getCalendarCell(prevMonth, i));
    }
  }

  /**
   * Creates filler cells of next month date to display in last row of current month view
   */
  private _createCellForNextMonth() {
    const remainingDaysInLastRow = this._dateAdapter.getDayOfWeekNames('long').length - this._weeks[this._weeks.length - 1].length;
    const nextMonth = this._dateAdapter.addCalendarMonths(this.activeDate, 1);
    this._nextMonthDays = [];
    for (let i = 0; i < remainingDaysInLastRow; i++) {
      this._nextMonthDays.push(this.getCalendarCell(nextMonth, i));
    }
  }

  /** Creates a calender cell object for each cell of the calender */
  private getCalendarCell(date: D, dateNum: number) {
    const dateNames = this._dateAdapter.getDateNames();
    const cellDate = this._dateAdapter.createDate(
      this._dateAdapter.getYear(date),
      this._dateAdapter.getMonth(date), dateNum + 1);
    const enabled = this._shouldEnableDate(cellDate);
    const ariaLabel = this._dateAdapter.format(cellDate, this._dateFormats.display.dateA11yLabel);
    const cellClasses = this.dateClass ? this.dateClass(cellDate, 'month') : undefined;
    return new UsaCalendarCell<D>(dateNum + 1, dateNames[dateNum],
      ariaLabel, enabled, cellClasses, this._getCellCompareValue(cellDate)!, cellDate)
  }

  /** Date filter for the month */
  private _shouldEnableDate(date: D): boolean {
    return !!date &&
      (!this.minDate || this._dateAdapter.compareDate(date, this.minDate) >= 0) &&
      (!this.maxDate || this._dateAdapter.compareDate(date, this.maxDate) <= 0) &&
      (!this.dateFilter || this.dateFilter(date));
  }

  /**
   * Gets the date in this month that the given Date falls on.
   * Returns null if the given Date is in another month.
   */
  private _getDateInCurrentMonth(date: D | null): number | null {
    return date && this._hasSameMonthAndYear(date, this.activeDate) ?
      this._dateAdapter.getDate(date) : null;
  }

  /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */
  private _hasSameMonthAndYear(d1: D | null, d2: D | null): boolean {
    return !!(d1 && d2 && this._dateAdapter.getMonth(d1) == this._dateAdapter.getMonth(d2) &&
      this._dateAdapter.getYear(d1) == this._dateAdapter.getYear(d2));
  }

  /** Gets the value that will be used to one cell to another. */
  private _getCellCompareValue(date: D | null): number | null {
    if (date) {
      // We use the time since the Unix epoch to compare dates in this view, rather than the
      // cell values, because we need to support ranges that span across multiple months/years.
      const year = this._dateAdapter.getYear(date);
      const month = this._dateAdapter.getMonth(date);
      const day = this._dateAdapter.getDate(date);
      return new Date(year, month, day).getTime();
    }

    return null;
  }


  /** Sets the current range based on a model value. */
  private _setRanges(selectedValue: DateRange<D> | D | null) {
    if (selectedValue instanceof DateRange) {
      this._rangeStart = this._getCellCompareValue(selectedValue.start);
      this._rangeEnd = this._getCellCompareValue(selectedValue.end);
      this._isRange = true;
    } else {
      this._rangeStart = this._rangeEnd = this._getCellCompareValue(selectedValue);
      this._isRange = false;
    }

    this._comparisonRangeStart = this._getCellCompareValue(this.comparisonStart);
    this._comparisonRangeEnd = this._getCellCompareValue(this.comparisonEnd);
  }

  /** Gets whether a date can be selected in the month view. */
  private _canSelect(date: D) {
    return !this.dateFilter || this.dateFilter(date);
  }
}
