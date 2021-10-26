
import {
  AfterContentInit,
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  isDevMode,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  SimpleChanges,
  ViewChild,
  ɵComponentType,
} from '@angular/core';
import { Subject } from 'rxjs';
import { UsaCalendarUserEvent, UsaCalendarCellClassFunction } from './calendar-body';
import { createMissingDateImplError } from '../date-picker-errors';
import { UsaMonthView } from './month-view';
import {
  isSameMultiYearView,
  UsaMultiYearView,
} from './multi-year-view';
import { UsaYearView } from './year-view';
import { USA_SINGLE_DATE_SELECTION_MODEL_PROVIDER, DateRange } from '../date-selection-model';
import { DateAdapter } from '../dateadapter/date-adapter';
import { UsaDateFormats, USA_DATE_FORMATS } from '../dateadapter/date-formats';

/**
 * Possible views for the calendar.
 * @docs-private
 */
export type UsaCalendarView = 'month' | 'year' | 'multi-year';

/** Counter used to generate unique IDs. */
let uniqueId = 0;

/** Default header for MatCalendar */
@Component({
  selector: 'usa-calendar-header',
  templateUrl: './calendar-header.html',
  exportAs: 'usaCalendarHeader',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsaCalendarHeader<D> {
  _buttonDescriptionId = `mat-calendar-button-${uniqueId++}`;
  ariaLiveText = '';

  constructor(
    @Inject(forwardRef(() => UsaCalendar)) public calendar: UsaCalendar<D>,
    @Optional() private _dateAdapter: DateAdapter<D>,
    @Optional() @Inject(USA_DATE_FORMATS) private _dateFormats: UsaDateFormats,
    changeDetectorRef: ChangeDetectorRef) {

    this.calendar.stateChanges.subscribe(() => changeDetectorRef.markForCheck());
  }

  get monthLabel(): string {
    return this._dateAdapter
      .format(this.calendar.activeDate, this._dateFormats.display.monthLabel)
      .toLocaleUpperCase();
  }

  get yearLabel(): string {
    return this._dateAdapter.getYearName(this.calendar.activeDate);
  }

  /** Handles user clicks on month label */
  monthClicked() {
    this.calendar.currentView = 'year';
  }

  /**
   * Handles user clicks on year label
   */
  yearClicked() {
    this.calendar.currentView = 'multi-year';
  }

  /** Handles user clicks on the previous button. */
  previousClicked(): void {
    this.calendar.activeDate = this._dateAdapter.addCalendarMonths(this.calendar.activeDate, -1);
    this.ariaLiveText = this._dateAdapter.getMonthNames('long')[this._dateAdapter.getMonth(this.calendar.activeDate)];
  }

  /** Handles user clicks on the next button. */
  nextClicked(): void {
    this.calendar.activeDate = this._dateAdapter.addCalendarMonths(this.calendar.activeDate, 1);
  }

  /** Handles user click of next year */
  nextYearClicked(): void {
    this.calendar.activeDate = this._dateAdapter.addCalendarYears(this.calendar.activeDate, 1);
  }

  /** Handles user click of previous year */
  previousYearClicked(): void {
    this.calendar.activeDate = this._dateAdapter.addCalendarYears(this.calendar.activeDate, -1);
  }

  /** Whether the previous period button is enabled. */
  previousEnabled(): boolean {
    if (!this.calendar.minDate) {
      return true;
    }
    return !this.calendar.minDate ||
      !this._isSameView(this.calendar.activeDate, this.calendar.minDate);
  }

  /** Whether the next period button is enabled. */
  nextEnabled(): boolean {
    return !this.calendar.maxDate ||
      !this._isSameView(this.calendar.activeDate, this.calendar.maxDate);
  }

  previousYearEnabled(): boolean {
    return !this.calendar.minDate ||
      !(this._dateAdapter.getYear(this.calendar.activeDate) === this._dateAdapter.getYear(this.calendar.minDate));
  }

  nextYearEnabled(): boolean {
    return !this.calendar.maxDate ||
      !(this._dateAdapter.getYear(this.calendar.activeDate) === this._dateAdapter.getYear(this.calendar.maxDate));
  }

  /** Whether the two dates represent the same view in the current view mode (month or year). */
  private _isSameView(date1: D, date2: D): boolean {
    if (this.calendar.currentView == 'month') {
      return this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2) &&
        this._dateAdapter.getMonth(date1) == this._dateAdapter.getMonth(date2);
    }
    if (this.calendar.currentView == 'year') {
      return this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2);
    }
    // Otherwise we are in 'multi-year' view.
    return isSameMultiYearView(
      this._dateAdapter, date1, date2, this.calendar.minDate, this.calendar.maxDate);
  }
}

/** A calendar that is used as part of the datePicker. */
@Component({
  selector: 'usa-calendar',
  templateUrl: 'calendar.html',
  exportAs: 'usaCalendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [USA_SINGLE_DATE_SELECTION_MODEL_PROVIDER]
})
export class UsaCalendar<D> implements AfterContentInit, AfterViewChecked, OnDestroy, OnChanges {
  /** An input indicating the type of the header component, if set. */
  @Input() headerComponent: ɵComponentType<any>;

  /**
   * Used for scheduling that focus should be moved to the active cell on the next tick.
   * We need to schedule it, rather than do it immediately, because we have to wait
   * for Angular to re-evaluate the view children.
   */
  private _moveFocusOnNextTick = false;

  /** A date representing the period (month or year) to start the calendar in. */
  @Input()
  get startAt(): D | null { return this._startAt; }
  set startAt(value: D | null) {
    this._startAt = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  private _startAt: D | null;

  /** Whether the calendar should be started in month or year view. */
  @Input() startView: UsaCalendarView = 'month';

  /** The currently selected date. */
  @Input()
  get selected(): DateRange<D> | D | null { return this._selected; }
  set selected(value: DateRange<D> | D | null) {
    if (value instanceof DateRange) {
      this._selected = value;
    } else {
      this._selected = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
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

  /** Emits when the currently selected date changes. */
  @Output() readonly selectedChange: EventEmitter<D | null> = new EventEmitter<D | null>();

  /**
   * Emits the year chosen in multiyear view.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly yearSelected: EventEmitter<D> = new EventEmitter<D>();

  /**
   * Emits the month chosen in year view.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly monthSelected: EventEmitter<D> = new EventEmitter<D>();

  /**
   * Emits when the current view changes.
   */
  @Output() readonly viewChanged: EventEmitter<UsaCalendarView> =
    new EventEmitter<UsaCalendarView>(true);

  /** Emits when any date is selected. */
  @Output() readonly _userSelection: EventEmitter<UsaCalendarUserEvent<D | null>> =
    new EventEmitter<UsaCalendarUserEvent<D | null>>();

  /** Reference to the current month view component. */
  @ViewChild(UsaMonthView) monthView: UsaMonthView<D>;

  /** Reference to the current year view component. */
  @ViewChild(UsaYearView) yearView: UsaYearView<D>;

  /** Reference to the current multi-year view component. */
  @ViewChild(UsaMultiYearView) multiYearView: UsaMultiYearView<D>;

  /**
   * The current active date. This determines which time period is shown and which date is
   * highlighted when using keyboard navigation.
   */
  get activeDate(): D { return this._clampedActiveDate; }
  set activeDate(value: D) {
    this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate);
    this.stateChanges.next();
    this._changeDetectorRef.markForCheck();
  }
  private _clampedActiveDate: D;

  /** Whether the calendar is in month view. */
  get currentView(): UsaCalendarView { return this._currentView; }
  set currentView(value: UsaCalendarView) {
    const viewChangedResult = this._currentView !== value ? value : null;
    this._currentView = value;
    this._moveFocusOnNextTick = true;
    this._changeDetectorRef.markForCheck();
    if (viewChangedResult) {
      this.viewChanged.emit(viewChangedResult);
    }
  }
  private _currentView: UsaCalendarView;

  /**
   * Emits whenever there is a state change that the header may need to respond to.
   */
  readonly stateChanges = new Subject<void>();

  constructor(
    @Optional() private _dateAdapter: DateAdapter<D>,
    @Optional() @Inject(USA_DATE_FORMATS) private _dateFormats: UsaDateFormats,
    private _changeDetectorRef: ChangeDetectorRef) {

    if (isDevMode()) {
      if (!this._dateAdapter) {
        throw createMissingDateImplError('DateAdapter');
      }

      if (!this._dateFormats) {
        throw createMissingDateImplError('USA_DATE_FORMATS');
      }
    }
  }

  ngAfterContentInit() {
    this.activeDate = this.startAt || this._dateAdapter.today();

    // Assign to the private property since we don't want to move focus on init.
    this._currentView = this.startView;
  }

  ngAfterViewChecked() {
    if (this._moveFocusOnNextTick) {
      this._moveFocusOnNextTick = false;
      this.focusActiveCell();
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    const change =
      changes['minDate'] || changes['maxDate'] || changes['dateFilter'];

    if (change && !change.firstChange) {
      const view = this._getCurrentViewComponent();

      if (view) {
        // We need to `detectChanges` manually here, because the `minDate`, `maxDate` etc. are
        // passed down to the view via data bindings which won't be up-to-date when we call `_init`.
        this._changeDetectorRef.detectChanges();
        view._init();
      }
    }

    this.stateChanges.next();
  }

  /** Focuses the active date. */
  focusActiveCell() {
    this._getCurrentViewComponent()._focusActiveCell(false);
  }

  /** Updates today's date after an update of the active date */
  updateTodaysDate() {
    this._getCurrentViewComponent()._init();
  }

  /** Handles date selection in the month view. */
  _dateSelected(event: UsaCalendarUserEvent<D | null>): void {
    const date = event.value;

    if (this.selected instanceof DateRange ||
      (date && !this._dateAdapter.sameDate(date, this.selected))) {
      this.selectedChange.emit(date);
    }

    this._userSelection.emit(event);
  }

  /** Handles year selection in the multiyear view. */
  _yearSelectedInMultiYearView(normalizedYear: D) {
    this.yearSelected.emit(normalizedYear);
  }

  /** Handles month selection in the year view. */
  _monthSelectedInYearView(normalizedMonth: D) {
    this.monthSelected.emit(normalizedMonth);
  }

  /** Handles year/month selection in the multi-year/year views. */
  _goToDateInView(date: D, view: 'month' | 'year' | 'multi-year'): void {
    this.activeDate = date;
    this.currentView = view;
  }

  /** Returns the component instance that corresponds to the current calendar view. */
  private _getCurrentViewComponent(): UsaMonthView<D> | UsaYearView<D> | UsaMultiYearView<D> {
    // The return type is explicitly written as a union to ensure that the Closure compiler does
    // not optimize calls to _init(). Without the explict return type, TypeScript narrows it to
    // only the first component type. See https://github.com/angular/components/issues/22996.
    return this.monthView || this.yearView || this.multiYearView;
  }
}
