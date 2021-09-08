import { DOCUMENT } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EventEmitter, HostListener, Inject, Injector, Input, isDevMode, NgZone, OnChanges, OnDestroy, OnInit, Optional, Output, SimpleChanges, ViewChild, ViewContainerRef } from "@angular/core";
import { merge, Observable, Subject, Subscription } from "rxjs";
import { filter, take } from "rxjs/operators";
import { BooleanInput, coerceBooleanProperty } from "../util/boolean-property";
import { usaFocusTrap } from "../util/focus-trap";
import { hasModifierKey, KeyCode } from "../util/key";
import { coerceStringArray } from "../util/util";
import { UsaCalendar, UsaCalendarHeader } from "./calendar/calendar";
import { MatCalendarUserEvent, UsaCalendarCellClassFunction } from "./calendar/calendar-body";
import { DateAdapter } from "./date-adapter/date-adapter";
import { UsaDateRangeSelectionStrategy, USA_DATE_RANGE_SELECTION_STRATEGY } from "./date-range-selection-strategy";
import { DateRange, ExtractDateTypeFromSelection, UsaDateSelectionModel } from "./date-selection-model";
import { createMissingDateImplError } from "./datepicker-errors";
import { DateFilterFn } from "./datepicker-input-base";

let datepickerUid = 0;

/** Possible positions for the datepicker dropdown along the X axis. */
export type DatepickerDropdownPositionX = 'start' | 'end';

/** Possible positions for the datepicker dropdown along the Y axis. */
export type DatepickerDropdownPositionY = 'above' | 'below';

export interface UsaDatepickerControl<D> {
  getStartValue(): D | null;
  min: D | null;
  max: D | null;
  disabled: boolean;
  dateFilter: DateFilterFn<D>;
  getConnectedOverlayOrigin(): ElementRef;
  getOverlayLabelId(): string | null;
  stateChanges: Observable<void>;
}

/** A datepicker that can be attached to a {@link MatDatepickerControl}. */
export interface UsaDatepickerPanel<C extends UsaDatepickerControl<D>, S,
    D = ExtractDateTypeFromSelection<S>> {
  /** Stream that emits whenever the date picker is closed. */
  closedStream: EventEmitter<void>;
  /** The input element the datepicker is associated with. */
  datepickerInput: C;
  /** Whether the datepicker pop-up should be disabled. */
  disabled: boolean;
  /** The id for the datepicker's calendar. */
  id: string;
  /** Whether the datepicker is open. */
  opened: boolean;
  /** Stream that emits whenever the date picker is opened. */
  openedStream: EventEmitter<void>;
  /** Emits when the datepicker's state changes. */
  stateChanges: Subject<void>;
  /** Opens the datepicker. */
  open(): void;
  /** Register an input with the datepicker. */
  registerInput(input: C): UsaDateSelectionModel<S, D>;
}

/**
 * Component used as the content for the datepicker overlay. We use this instead of using
 * MatCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the overlay that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */
 @Component({
  selector: 'usa-datepicker-content',
  templateUrl: './datepicker-content.html',
  host: {
    'class': 'usa-date-picker__calendar',
    '[attr.role]': 'dialog',
    '[attr.aria-modal]': 'true',
    '[attr.tabindex]': '-1',
  },
  exportAs: 'usaDatepickerContent',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsaDatepickerContent<S, D = ExtractDateTypeFromSelection<S>> implements OnInit, AfterViewInit, OnDestroy {
  private _subscriptions = new Subscription();
  private _model: UsaDateSelectionModel<S, D>;

  /** Reference to the internal calendar component. */
  @ViewChild(UsaCalendar) _calendar: UsaCalendar<D>;

  /** Reference to the datepicker that created the overlay. */
  datepicker: MatDatepickerBase<any, S, D>;

  /** Start of the comparison range. */
  comparisonStart: D | null;

  /** End of the comparison range. */
  comparisonEnd: D | null;

  /** Whether the datepicker is above or below the input. */
  _isAbove: boolean;

  /** Current state of the animation. */
  _animationState: 'enter-dropdown' | 'enter-dialog' | 'void';

  /** Emits when an animation has finished. */
  readonly _animationDone = new Subject<void>();

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
      this.datepicker.close();
    }
    this.wasInside = false;
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
    usaFocusTrap(this._zone, this._el.nativeElement, this.datepicker.closedStream);
  }

  ngAfterViewInit() {
    this._subscriptions.add(this.datepicker.stateChanges.subscribe(() => {
      this._changeDetectorRef.markForCheck();
    }));
    this._calendar.focusActiveCell();
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
    this._animationDone.complete();
  }

  _handleUserSelection(event: MatCalendarUserEvent<D | null>) {
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
      this.datepicker.close();
    }
  }

  _startExitAnimation() {
    this._animationState = 'void';
    this._changeDetectorRef.markForCheck();
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

/** Base class for a datepicker. */
@Directive()
export abstract class MatDatepickerBase<C extends UsaDatepickerControl<D>, S,
  D = ExtractDateTypeFromSelection<S>> implements UsaDatepickerPanel<C, S, D>, OnDestroy,
    OnChanges {
  private _inputStateChanges = Subscription.EMPTY;

  /** An input indicating the type of the custom header component for the calendar, if set. */
  @Input() calendarHeaderComponent: UsaCalendarHeader<any>;

  /** The date to open the calendar to initially. */
  @Input()
  get startAt(): D | null {
    // If an explicit startAt is set we start there, otherwise we start at whatever the currently
    // selected value is.
    return this._startAt || (this.datepickerInput ? this.datepickerInput.getStartValue() : null);
  }
  set startAt(value: D | null) {
    this._startAt = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  private _startAt: D | null;

  /** The view that the calendar should start in. */
  @Input() startView: 'month' | 'year' | 'multi-year' = 'month';

  /**
   * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
   * than a dropdown and elements have more padding to allow for bigger touch targets.
   */
  @Input()
  get touchUi(): boolean { return this._touchUi; }
  set touchUi(value: boolean) {
    this._touchUi = coerceBooleanProperty(value);
  }
  private _touchUi = false;

  /** Whether the datepicker pop-up should be disabled. */
  @Input()
  get disabled(): boolean {
    return this._disabled === undefined && this.datepickerInput ?
        this.datepickerInput.disabled : !!this._disabled;
  }
  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value);

    if (newValue !== this._disabled) {
      this._disabled = newValue;
      this.stateChanges.next(undefined);
    }
  }
  private _disabled: boolean;

  /** Preferred position of the datepicker in the X axis. */
  @Input()
  xPosition: DatepickerDropdownPositionX = 'start';

  /** Preferred position of the datepicker in the Y axis. */
  @Input()
  yPosition: DatepickerDropdownPositionY = 'below';

  /**
   * Whether to restore focus to the previously-focused element when the calendar is closed.
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

  /** Emits when the datepicker has been opened. */
  @Output('opened') readonly openedStream = new EventEmitter<void>();

  /** Emits when the datepicker has been closed. */
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

  /** The id for the datepicker calendar. */
  id: string = `mat-datepicker-${datepickerUid++}`;

  /** The minimum selectable date. */
  _getMinDate(): D | null {
    return this.datepickerInput && this.datepickerInput.min;
  }

  /** The maximum selectable date. */
  _getMaxDate(): D | null {
    return this.datepickerInput && this.datepickerInput.max;
  }

  _getDateFilter(): DateFilterFn<D> {
    return this.datepickerInput && this.datepickerInput.dateFilter;
  }

  /** Reference to the component instance rendered in the overlay. */
  private _componentRef: ComponentRef<UsaDatepickerContent<S, D>> | null;

  /** The element that was focused before the datepicker was opened. */
  private _focusedElementBeforeOpen: HTMLElement | null = null;

  /** The input element this datepicker is associated with. */
  datepickerInput: C;

  /** Emits when the datepicker's state changes. */
  readonly stateChanges = new Subject<void>();

  constructor(
    @Inject(ElementRef) _dialog: any,
    private _injector: Injector,
    private _vcr: ViewContainerRef,
    private _cfr: ComponentFactoryResolver,
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

  ngOnChanges(changes: SimpleChanges) {
    const positionChange = changes['xPosition'] || changes['yPosition'];

    if (positionChange && !positionChange.firstChange) {
      console.log('todo');
    }

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
   * Register an input with this datepicker.
   * @param input The datepicker input to register with this datepicker.
   * @returns Selection model that the input should hook itself up to.
   */
  registerInput(input: C): UsaDateSelectionModel<S, D> {
    if (this.datepickerInput && isDevMode()) {
      throw Error('A MatDatepicker can only be associated with a single input.');
    }
    this._inputStateChanges.unsubscribe();
    this.datepickerInput = input;
    this._inputStateChanges =
        input.stateChanges.subscribe(() => this.stateChanges.next(undefined));
    return this._model;
  }



  /** Open the calendar. */
  open(): void {
    if (this._opened || this.disabled) {
      return;
    }

    if (!this.datepickerInput && isDevMode()) {
      throw Error('Attempted to open an MatDatepicker with no associated input.');
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

    if (this._restoreFocus && this._focusedElementBeforeOpen &&
      typeof this._focusedElementBeforeOpen.focus === 'function') {
      // Because IE moves focus asynchronously, we can't count on it being restored before we've
      // marked the datepicker as closed. If the event fires out of sequence and the element that
      // we're refocusing opens the datepicker on focus, the user could be stuck with not being
      // able to close the calendar at all. We work around it by making the logic, that marks
      // the datepicker as closed, async as well.
      this._focusedElementBeforeOpen.focus();
      setTimeout(completeClose);
    } else {
      completeClose();
    }
  }

  /** Applies the current pending selection on the overlay to the model. */
  _applyPendingSelection() {
    this._componentRef?.instance?._applyPendingSelection();
  }

  /** Forwards relevant values from the datepicker to the datepicker content inside the overlay. */
  protected _forwardContentValues(instance: UsaDatepickerContent<S, D>) {
    instance.datepicker = this;
  }

  /** Opens the overlay with the calendar. */
  private _openOverlay(): void {
    this._destroyOverlay();

    const calendarComponent = this._cfr.resolveComponentFactory<UsaDatepickerContent<S, D>>(UsaDatepickerContent);
    this._componentRef = this._vcr.createComponent(calendarComponent, undefined, this._injector);

    this._forwardContentValues(this._componentRef.instance);

    /** TODO: USE ID INSTEAD */
    const wrapper = document.querySelector('.usa-date-picker__wrapper');

    (this._componentRef.location.nativeElement as HTMLElement).style.top = `${(wrapper as any).offsetHeight}px`;
    wrapper.appendChild(this._componentRef.location.nativeElement);
  }

  /** Destroys the current overlay. */
  private _destroyOverlay() {
    if (!this._componentRef) {
      return;
    }
    this._vcr.remove(this._vcr.indexOf(this._componentRef !.hostView));
    this._componentRef = null;
  }

  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_opened: BooleanInput;
  static ngAcceptInputType_touchUi: BooleanInput;
  static ngAcceptInputType_restoreFocus: BooleanInput;
}