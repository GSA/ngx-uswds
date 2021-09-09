import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
  isDevMode,
  Inject,
  forwardRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { KeyCode } from '../../util/key';
import { DateAdapter } from '../dateadapter/date-adapter';
import { DateRange } from '../date-selection-model';
import { createMissingDateImplError } from '../date-picker-errors';
import { UsaCalendar } from './calendar';
import { UsaCalendarUserEvent, UsaCalendarBody, UsaCalendarCell, UsaCalendarCellClassFunction } from './calendar-body';

export const yearsPerPage = 12;

export const yearsPerRow = 4;

/**
 * An internal component used to display a year selector in the datePicker.
 * @docs-private
 */
@Component({
  selector: 'usa-multi-year-view',
  templateUrl: './multi-year-view.html',
  exportAs: 'usaMultiYearView',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsaMultiYearView<D> implements AfterContentInit, OnDestroy {
  private _rerenderSubscription = Subscription.EMPTY;

  /** Flag used to filter out space/enter keyup events that originated outside of the view. */
  private _selectionKeyPressed: boolean;

  /** The date to display in this multi-year view (everything other than the year is ignored). */
  @Input()
  get activeDate(): D { return this._activeDate; }
  set activeDate(value: D) {
    let oldActiveDate = this._activeDate;
    const validDate =
      this._dateAdapter.getValidDateOrNull(
        this._dateAdapter.deserialize(value)
      ) || this._dateAdapter.today();
    this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);

    if (!isSameMultiYearView(
      this._dateAdapter, oldActiveDate, this._activeDate, this.minDate, this.maxDate)) {
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

    this._setSelectedYear(value);
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

  /** A function used to filter which dates are selectable. */
  @Input() dateFilter: (date: D) => boolean;

  /** Function that can be used to add custom CSS classes to date cells. */
  @Input() dateClass: UsaCalendarCellClassFunction<D>;

  /** Emits when a new year is selected. */
  @Output() readonly selectedChange: EventEmitter<D> = new EventEmitter<D>();

  /** Emits the selected year. This doesn't imply a change on the selected date */
  @Output() readonly yearSelected: EventEmitter<D> = new EventEmitter<D>();

  /** Emits when any date is activated. */
  @Output() readonly activeDateChange: EventEmitter<D> = new EventEmitter<D>();

  /** The body of calendar table */
  @ViewChild(UsaCalendarBody) _usaCalendarBody: UsaCalendarBody;

  /** Grid of calendar cells representing the currently displayed years. */
  _years: UsaCalendarCell[][];

  /** The year that today falls on. */
  _todayYear: number;

  /** The year of the selected date. Null if the selected date is null. */
  _selectedYear: number | null;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() public _dateAdapter: DateAdapter<D>,
  ) {
    if (!this._dateAdapter && isDevMode()) {
      throw createMissingDateImplError('DateAdapter');
    }

    this._activeDate = this._dateAdapter.today();
  }

  ngAfterContentInit() {
    this._rerenderSubscription = this._dateAdapter.localeChanges
      .pipe(startWith(null))
      .subscribe(() => this._init());
  }

  ngOnDestroy() {
    this._rerenderSubscription.unsubscribe();
  }

  /** Initializes this multi-year view. */
  _init() {
    this._todayYear = this._dateAdapter.getYear(this._dateAdapter.today());

    // We want a range years such that we maximize the number of
    // enabled dates visible at once. This prevents issues where the minimum year
    // is the last item of a page OR the maximum year is the first item of a page.

    // The offset from the active year to the "slot" for the starting year is the
    // *actual* first rendered year in the multi-year view.
    const activeYear = this._dateAdapter.getYear(this._activeDate);
    const minYearOfPage = activeYear - getActiveOffset(
      this._dateAdapter, this.activeDate, this.minDate, this.maxDate);

    this._years = [];
    for (let i = 0, row: number[] = []; i < yearsPerPage; i++) {
      row.push(minYearOfPage + i);
      if (row.length == yearsPerRow) {
        this._years.push(row.map(year => this._createCellForYear(year)));
        row = [];
      }
    }
    this._changeDetectorRef.markForCheck();
  }

  // TODO
  getNextYears() {
    this.activeDate = this._dateAdapter.addCalendarYears(this.activeDate, yearsPerPage);
  }

  getPreviousYears() {
    this.activeDate = this._dateAdapter.addCalendarYears(this.activeDate, -yearsPerPage);
  }

  /** Handles when a new year is selected. */
  _yearSelected(event: UsaCalendarUserEvent<number>) {
    const year = event.value;
    this.yearSelected.emit(this._dateAdapter.createDate(year, 0, 1));
    let month = this._dateAdapter.getMonth(this.activeDate);
    let daysInMonth =
      this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(year, month, 1));
    this.selectedChange.emit(this._dateAdapter.createDate(year, month,
      Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth)));
  }

  /** Handles keydown events on the calendar body when calendar is in multi-year view. */
  _handleCalendarBodyKeydown(event: KeyboardEvent): void {
    const oldActiveDate = this._activeDate;
    switch (event.keyCode) {
      case KeyCode.ArrowLeft:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -1);
        break;
      case KeyCode.ArrowRight:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, 1);
        break;
      case KeyCode.ArrowUp:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -yearsPerRow);
        break;
      case KeyCode.ArrowDown:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, yearsPerRow);
        break;
      case KeyCode.Home:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate,
          -getActiveOffset(this._dateAdapter, this.activeDate, this.minDate, this.maxDate));
        break;
      case KeyCode.End:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate,
          yearsPerPage - getActiveOffset(
            this._dateAdapter, this.activeDate, this.minDate, this.maxDate) - 1);
        break;
      case KeyCode.PageUp:
        this.activeDate =
          this._dateAdapter.addCalendarYears(
            this._activeDate, event.altKey ? -yearsPerPage * 10 : -yearsPerPage);
        break;
      case KeyCode.PageDown:
        this.activeDate =
          this._dateAdapter.addCalendarYears(
            this._activeDate, event.altKey ? yearsPerPage * 10 : yearsPerPage);
        break;
      case KeyCode.Enter:
      case KeyCode.Space:
        // Note that we only prevent the default action here while the selection happens in
        // `keyup` below. We can't do the selection here, because it can cause the calendar to
        // reopen if focus is restored immediately. We also can't call `preventDefault` on `keyup`
        // because it's too late (see #23305).
        this._selectionKeyPressed = true;
        break;
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

  /** Handles keyup events on the calendar body when calendar is in multi-year view. */
  _handleCalendarBodyKeyup(event: KeyboardEvent): void {
    if (event.keyCode === KeyCode.Space || event.keyCode === KeyCode.Enter) {
      if (this._selectionKeyPressed) {
        this._yearSelected({ value: this._dateAdapter.getYear(this._activeDate), event });
      }

      this._selectionKeyPressed = false;
    }
  }

  _getActiveCell(): number {
    return getActiveOffset(this._dateAdapter, this.activeDate, this.minDate, this.maxDate);
  }

  /** Focuses the active cell after the microtask queue is empty. */
  _focusActiveCell() {
    this._usaCalendarBody._focusActiveCell();
  }

  /** Creates an UsaCalendarCell for the given year. */
  private _createCellForYear(year: number) {
    const date = this._dateAdapter.createDate(year, 0, 1);
    const yearName = this._dateAdapter.getYearName(date);
    const cellClasses = this.dateClass ? this.dateClass(date, 'multi-year') : undefined;

    return new UsaCalendarCell(year, yearName, yearName, this._shouldEnableYear(year), cellClasses);
  }

  /** Whether the given year is enabled. */
  private _shouldEnableYear(year: number) {
    // disable if the year is greater than maxDate lower than minDate
    if (year === undefined || year === null ||
      (this.maxDate && year > this._dateAdapter.getYear(this.maxDate)) ||
      (this.minDate && year < this._dateAdapter.getYear(this.minDate))) {
      return false;
    }

    // enable if it reaches here and there's no filter defined
    if (!this.dateFilter) {
      return true;
    }

    const firstOfYear = this._dateAdapter.createDate(year, 0, 1);

    // If any date in the year is enabled count the year as enabled.
    for (let date = firstOfYear; this._dateAdapter.getYear(date) == year;
      date = this._dateAdapter.addCalendarDays(date, 1)) {
      if (this.dateFilter(date)) {
        return true;
      }
    }

    return false;
  }

  /** Sets the currently-highlighted year based on a model value. */
  private _setSelectedYear(value: DateRange<D> | D | null) {
    this._selectedYear = null;

    if (value instanceof DateRange) {
      const displayValue = value.start || value.end;

      if (displayValue) {
        this._selectedYear = this._dateAdapter.getYear(displayValue);
      }
    } else if (value) {
      this._selectedYear = this._dateAdapter.getYear(value);
    }
  }
}

export function isSameMultiYearView<D>(
  dateAdapter: DateAdapter<D>, date1: D, date2: D, minDate: D | null, maxDate: D | null): boolean {
  const year1 = dateAdapter.getYear(date1);
  const year2 = dateAdapter.getYear(date2);
  const startingYear = getStartingYear(dateAdapter, minDate, maxDate);
  return Math.floor((year1 - startingYear) / yearsPerPage) ===
    Math.floor((year2 - startingYear) / yearsPerPage);
}

/**
 * When the multi-year view is first opened, the active year will be in view.
 * So we compute how many years are between the active year and the *slot* where our
 * "startingYear" will render when paged into view.
 */
export function getActiveOffset<D>(
  dateAdapter: DateAdapter<D>, activeDate: D, minDate: D | null, maxDate: D | null): number {
  const activeYear = dateAdapter.getYear(activeDate);
  return euclideanModulo((activeYear - getStartingYear(dateAdapter, minDate, maxDate)),
    yearsPerPage);
}

/**
 * We pick a "starting" year such that either the maximum year would be at the end
 * or the minimum year would be at the beginning of a page.
 */
function getStartingYear<D>(
  dateAdapter: DateAdapter<D>, minDate: D | null, maxDate: D | null): number {
  let startingYear = 0;
  if (maxDate) {
    const maxYear = dateAdapter.getYear(maxDate);
    startingYear = maxYear - yearsPerPage + 1;
  } else if (minDate) {
    startingYear = dateAdapter.getYear(minDate);
  }
  return startingYear;
}

/** Gets remainder that is non-negative, even if first number is negative */
function euclideanModulo(a: number, b: number): number {
  return (a % b + b) % b;
}
