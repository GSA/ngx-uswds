import { DOCUMENT } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EventEmitter, HostListener, Inject, Injector, Input, isDevMode, NgZone, OnChanges, OnDestroy, OnInit, Optional, Output, SimpleChanges, ViewChild, ViewContainerRef } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import { BooleanInput, coerceBooleanProperty } from "../util/boolean-property";
import { usaFocusTrap } from "../util/focus-trap";
import { coerceStringArray } from "../util/util";
import { UsaCalendar, UsaCalendarHeader } from "./calendar/calendar";
import { UsaCalendarUserEvent, UsaCalendarCellClassFunction } from "./calendar/calendar-body";
import { DateAdapter } from "./dateadapter/date-adapter";
import { UsaDateRangeSelectionStrategy, USA_DATE_RANGE_SELECTION_STRATEGY } from "./date-range-selection-strategy";
import { DateRange, ExtractDateTypeFromSelection, UsaDateSelectionModel } from "./date-selection-model";
import { createMissingDateImplError } from "./date-picker-errors";
import { DateFilterFn } from "./date-picker-input-base";

let datePickerUid = 0;

/** Possible positions for the datePicker dropdown along the X axis. */
export type DatePickerDropdownPositionX = 'start' | 'end';

/** Possible positions for the datePicker dropdown along the Y axis. */
export type DatePickerDropdownPositionY = 'above' | 'below';

export interface UsaDatePickerControl<D> {
  getStartValue(): D | null;
  min: D | null;
  max: D | null;
  disabled: boolean;
  dateFilter: DateFilterFn<D>;
  getConnectedOverlayOrigin(): ElementRef;
  getOverlayLabelId(): string | null;
  stateChanges: Observable<void>;
}

/** A datePicker that can be attached to a {@link UsaDatePickerControl}. */
export interface UsaDatePickerPanel<C extends UsaDatePickerControl<D>, S,
  D = ExtractDateTypeFromSelection<S>> {
  /** Stream that emits whenever the date picker is closed. */
  closedStream: EventEmitter<void>;
  /** The input element the datePicker is associated with. */
  datePickerInput: C;
  /** Whether the datePicker pop-up should be disabled. */
  disabled: boolean;
  /** The id for the datePicker's calendar. */
  id: string;
  /** Whether the datePicker is open. */
  opened: boolean;
  /** Stream that emits whenever the date picker is opened. */
  openedStream: EventEmitter<void>;
  /** Emits when the datePicker's state changes. */
  stateChanges: Subject<void>;
  /** Opens the date picker. */
  open(): void;
  /** Closes the date picker */
  close(): void;
  /** Register an input with the datePicker. */
  registerInput(input: C): UsaDateSelectionModel<S, D>;
}

/**
 * Component used as the content for the datePicker display. We use this instead of using
 * UsaCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the display that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */
@Component({
  selector: 'usa-date-picker-content',
  templateUrl: './date-picker-content.html',
  host: {
    'class': 'usa-date-picker__calendar',
    '[attr.role]': 'dialog',
    '[attr.aria-modal]': 'true',
    '[attr.tabindex]': '-1',
  },
  exportAs: 'usaDatePickerContent',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsaDatePickerContent<S, D = ExtractDateTypeFromSelection<S>> implements OnInit, AfterViewInit, OnDestroy {
  private _subscriptions = new Subscription();
  private _model: UsaDateSelectionModel<S, D>;

  /** Reference to the internal calendar component. */
  @ViewChild(UsaCalendar) _calendar: UsaCalendar<D>;

  /** Reference to the datePicker that created the overlay. */
  datePicker: UsaDatePickerBase<any, S, D>;

  /** Start of the comparison range. */
  comparisonStart: D | null;

  /** End of the comparison range. */
  comparisonEnd: D | null;

  /** Whether the datePicker is above or below the input. */
  _isAbove: boolean;

  /** Text for the close button. */
  _closeButtonText: string;

  /** Whether the close button currently has focus. */
  _closeButtonFocused: boolean;


  /** Keeps track of last click and indicates whether it was inside the calender or outside */
  private wasInside = false;


  @HostListener('click')
  clickInside() {
    this.wasInside = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      this.datePicker.close();
    }
    this.wasInside = false;
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.datePicker.close();
    event.stopImmediatePropagation();
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _globalModel: UsaDateSelectionModel<S, D>,
    private _dateAdapter: DateAdapter<D>,
    private _zone: NgZone,
    private _el: ElementRef,
    @Optional() @Inject(USA_DATE_RANGE_SELECTION_STRATEGY)
    private _rangeSelectionStrategy: UsaDateRangeSelectionStrategy<D>) {
    this._closeButtonText = 'Close';
  }

  ngOnInit() {
    this._model = this._globalModel;
    usaFocusTrap(this._zone, this._el.nativeElement, this.datePicker.closedStream);
  }

  ngAfterViewInit() {
    this._subscriptions.add(this.datePicker.stateChanges.subscribe(() => {
      this._changeDetectorRef.markForCheck();
    }));
    this._calendar.focusActiveCell();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  _handleUserSelection(event: UsaCalendarUserEvent<D | null>) {
    const selection = this._model.selection;
    const value = event.value;
    const isRange = selection instanceof DateRange;

    // If we're selecting a range and we have a selection strategy, always pass the value through
    // there. Otherwise don't assign null values to the model, unless we're selecting a range.
    // A null value when picking a range means that the user cancelled the selection (e.g. by
    // pressing escape), whereas when selecting a single value it means that the value didn't
    // change. This isn't very intuitive, but it's here for backwards-compatibility.
    if (isRange && this._rangeSelectionStrategy) {
      const newSelection = this._rangeSelectionStrategy.selectionFinished(value,
        selection as unknown as DateRange<D>, event.event);
      this._model.updateSelection(newSelection as unknown as S, this);
    } else if (value && (isRange ||
      !this._dateAdapter.sameDate(value, selection as unknown as D))) {
      this._model.add(value);
    }

    // Delegate closing the overlay to the actions.
    if (!this._model || this._model.isComplete()) {
      this.datePicker.close();
    }
  }

  _getSelected() {
    return this._model.selection as unknown as D | DateRange<D> | null;
  }

  /** Applies the current pending selection to the global model. */
  _applyPendingSelection() {
    if (this._model !== this._globalModel) {
      this._globalModel.updateSelection(this._model.selection, this);
    }
  }
}

/** Base class for a datePicker. */
@Directive()
export abstract class UsaDatePickerBase<C extends UsaDatePickerControl<D>, S,
  D = ExtractDateTypeFromSelection<S>> implements UsaDatePickerPanel<C, S, D>, OnDestroy,
  OnChanges {
  private _inputStateChanges = Subscription.EMPTY;

  /** An input indicating the type of the custom header component for the calendar, if set. */
  @Input() calendarHeaderComponent: UsaCalendarHeader<any>;

  /** The date to open the calendar to initially. */
  @Input()
  get startAt(): D | null {
    // If an explicit startAt is set we start there, otherwise we start at whatever the currently
    // selected value is.
    return this._startAt || (this.datePickerInput ? this.datePickerInput.getStartValue() : null);
  }
  set startAt(value: D | null) {
    this._startAt = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  private _startAt: D | null;

  /** The view that the calendar should start in. */
  @Input() startView: 'month' | 'year' | 'multi-year' = 'month';

  /** Whether the datePicker pop-up should be disabled. */
  @Input()
  get disabled(): boolean {
    return this._disabled === undefined && this.datePickerInput ?
      this.datePickerInput.disabled : !!this._disabled;
  }
  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value);

    if (newValue !== this._disabled) {
      this._disabled = newValue;
      this.stateChanges.next(undefined);
    }
  }
  private _disabled: boolean;

  /**
   * Whether to restore focus to the datePicker input when the calendar is closed.
   * Note that automatic focus restoration is an accessibility feature and it is recommended that
   * you provide your own equivalent, if you decide to turn it off.
   */
  @Input()
  get restoreFocus(): boolean { return this._restoreFocus; }
  set restoreFocus(value: boolean) {
    this._restoreFocus = coerceBooleanProperty(value);
  }
  private _restoreFocus = true;

  /**
   * Emits selected year in multiyear view.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly yearSelected: EventEmitter<D> = new EventEmitter<D>();

  /**
   * Emits selected month in year view.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly monthSelected: EventEmitter<D> = new EventEmitter<D>();

  /** Function that can be used to add custom CSS classes to dates. */
  @Input() dateClass: UsaCalendarCellClassFunction<D>;

  /** Emits when the datePicker has been opened. */
  @Output('opened') readonly openedStream = new EventEmitter<void>();

  /** Emits when the datePicker has been closed. */
  @Output('closed') readonly closedStream = new EventEmitter<void>();

  /**
   * Classes to be passed to the date picker panel.
   * Supports string and string array values, similar to `ngClass`.
   */
  @Input()
  get panelClass(): string | string[] { return this._panelClass; }
  set panelClass(value: string | string[]) {
    this._panelClass = coerceStringArray(value);
  }
  private _panelClass: string[];

  /** Whether the calendar is open. */
  @Input()
  get opened(): boolean { return this._opened; }
  set opened(value: boolean) {
    coerceBooleanProperty(value) ? this.open() : this.close();
  }
  private _opened = false;

  /** The id for the datePicker calendar. */
  id: string = `usa-date-picker-${datePickerUid++}`;

  /** The minimum selectable date. */
  _getMinDate(): D | null {
    return this.datePickerInput && this.datePickerInput.min;
  }

  /** The maximum selectable date. */
  _getMaxDate(): D | null {
    return this.datePickerInput && this.datePickerInput.max;
  }

  _getDateFilter(): DateFilterFn<D> {
    return this.datePickerInput && this.datePickerInput.dateFilter;
  }

  /** Reference to the component instance rendered in the overlay. */
  private _componentRef: ComponentRef<UsaDatePickerContent<S, D>> | null;

  /** The element that was focused before the datepicker was opened. */
  private _focusedElementBeforeOpen: HTMLElement | null = null;

  /** The input element this datePicker is associated with. */
  datePickerInput: C;

  /** Emits when the datePicker's state changes. */
  readonly stateChanges = new Subject<void>();

  constructor(
    @Inject(ElementRef) _dialog: any,
    private _injector: Injector,
    private _vcr: ViewContainerRef,
    private _cfr: ComponentFactoryResolver,
    private _el: ElementRef,
    @Optional() private _dateAdapter: DateAdapter<D>,
    /**
     * @deprecated No longer being used. To be removed.
     * @breaking-change 13.0.0
     */
    @Optional() @Inject(DOCUMENT) _document: any,
    private _model: UsaDateSelectionModel<S, D>) {
    if (!this._dateAdapter && isDevMode()) {
      throw createMissingDateImplError('DateAdapter');
    }
  }

  ngOnChanges() {
    this.stateChanges.next(undefined);
  }

  ngOnDestroy() {
    this._destroyOverlay();
    this.close();
    this._inputStateChanges.unsubscribe();
    this.stateChanges.complete();
  }

  /** Selects the given date */
  select(date: D): void {
    this._model.add(date);
  }

  /** Emits the selected year in multiyear view */
  _selectYear(normalizedYear: D): void {
    this.yearSelected.emit(normalizedYear);
  }

  /** Emits selected month in year view */
  _selectMonth(normalizedMonth: D): void {
    this.monthSelected.emit(normalizedMonth);
  }

  /**
   * Register an input with this datePicker.
   * @param input The datePicker input to register with this datePicker.
   * @returns Selection model that the input should hook itself up to.
   */
  registerInput(input: C): UsaDateSelectionModel<S, D> {
    if (this.datePickerInput && isDevMode()) {
      throw Error('A UsaDatePicker can only be associated with a single input.');
    }
    this._inputStateChanges.unsubscribe();
    this.datePickerInput = input;
    this._inputStateChanges =
      input.stateChanges.subscribe(() => this.stateChanges.next(undefined));
    return this._model;
  }



  /** Open the calendar. */
  open(): void {
    if (this._opened || this.disabled) {
      return;
    }

    if (!this.datePickerInput && isDevMode()) {
      throw Error('Attempted to open an UsaDatePicker with no associated input.');
    }

    this._focusedElementBeforeOpen = document.activeElement as HTMLElement;
    this._openOverlay();
    this._opened = true;
    this.openedStream.emit();
  }

  /** Close the calendar. */
  close(): void {
    if (!this._opened) {
      return;
    }

    if (this._componentRef) {
      this._destroyOverlay();
    }

    const completeClose = () => {
      // The `_opened` could've been reset already if
      // we got two events in quick succession.
      if (this._opened) {
        this._opened = false;
        this.closedStream.emit();
        this._focusedElementBeforeOpen = null;
      }
    };

    if (this._restoreFocus) {
      // Because IE moves focus asynchronously, we can't count on it being restored before we've
      // marked the datePicker as closed. If the event fires out of sequence and the element that
      // we're refocusing opens the datePicker on focus, the user could be stuck with not being
      // able to close the calendar at all. We work around it by making the logic, that marks
      // the datePicker as closed, async as well.
      if (!this.datePickerInput.getConnectedOverlayOrigin().nativeElement.disabled) {
        this.datePickerInput.getConnectedOverlayOrigin().nativeElement.focus();
      } else if (this._focusedElementBeforeOpen) {
        this._focusedElementBeforeOpen.focus();
      }

      setTimeout(completeClose);
    } else {
      completeClose();
    }
  }

  /** Applies the current pending selection on the overlay to the model. */
  _applyPendingSelection() {
    this._componentRef?.instance?._applyPendingSelection();
  }

  /** Forwards relevant values from the datePicker to the datePicker content inside the overlay. */
  protected _forwardContentValues(instance: UsaDatePickerContent<S, D>) {
    instance.datePicker = this;
  }

  /** Opens the overlay with the calendar. */
  private _openOverlay(): void {
    this._destroyOverlay();

    const calendarComponent = this._cfr.resolveComponentFactory<UsaDatePickerContent<S, D>>(UsaDatePickerContent);
    this._componentRef = this._vcr.createComponent(calendarComponent, undefined, this._injector);

    this._forwardContentValues(this._componentRef.instance);

    const wrapper = this.findAncestor(this._el.nativeElement, 'usa-date-picker__wrapper');
    if (wrapper) {
      (this._componentRef.location.nativeElement as HTMLElement).style.top = `${(wrapper as any).offsetHeight}px`;
    }
    wrapper.appendChild(this._componentRef.location.nativeElement);
  }

  /** Destroys the current overlay. */
  private _destroyOverlay() {
    if (!this._componentRef) {
      return;
    }
    this._vcr.remove(this._vcr.indexOf(this._componentRef!.hostView));
    this._componentRef = null;
  }


  /**
   * Finds closest ancestor element with the given class
   * @param element - The element to start searching from - this element will be exempt from the search
   * @param cls - The class string to search for
   * @returns Either root element if not found or the queried element
   */
  private findAncestor(element: HTMLElement, cls: string) {
    while ((element = element.parentElement) && !element.classList.contains(cls));
    return element;
  }

  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_opened: BooleanInput;
  static ngAcceptInputType_restoreFocus: BooleanInput;
}
