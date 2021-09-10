
import { BooleanInput, coerceBooleanProperty } from '../util/boolean-property';
import {
  AfterContentInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { merge, Observable, of as observableOf, Subscription } from 'rxjs';
import { UsaDatePickerControl, UsaDatePickerPanel } from './date-picker-base';


/** Can be used to override the icon of a `usaDatePickerButton`. */
@Directive({
  selector: '[usaDatePickerButtonIcon]'
})
export class UsaDatePickerButtonIcon { }


@Component({
  selector: 'usa-date-picker-button',
  templateUrl: './date-picker-button.html',
  host: {
    'class': 'usa-date-picker__button',
    '[attr.tabindex]': 'null',
    // Used by the test harness to tie this toggle to its datePicker.
    '[attr.data-usa-calendar]': 'datePicker ? datePicker.id : null',
    // Bind the `click` on the host, rather than the inner `button`, so that we can call
    // `stopPropagation` on it without affecting the user's `click` handlers. We need to stop
    // it so that the input doesn't get focused automatically by the form field (See #21836).
    '(click)': '_toggle($event)',
  },
  exportAs: 'usaDatePickerButton',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsaDatePickerButton<D> implements AfterContentInit, OnChanges, OnDestroy {
  private _stateChanges = Subscription.EMPTY;

  /** DatePicker instance that the button will toggle. */
  @Input('for') datePicker: UsaDatePickerPanel<UsaDatePickerControl<any>, D>;

  /** Tabindex for the toggle. */
  @Input() tabIndex: number | null;

  /** Screenreader label for the button. */
  @Input('aria-label') ariaLabel: string = 'Open Date Picker'

  /** Whether the toggle button is disabled. */
  @Input()
  get disabled(): boolean {
    if (this._disabled === undefined && this.datePicker) {
      return this.datePicker.disabled;
    }

    return !!this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled: boolean;

  /** Custom icon set by the consumer. */
  @ContentChild(UsaDatePickerButtonIcon) _customIcon: UsaDatePickerButtonIcon;

  /** Underlying button element. */
  @ViewChild('button') _button: HTMLButtonElement;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    @Attribute('tabindex') defaultTabIndex: string) {

    const parsedTabIndex = Number(defaultTabIndex);
    this.tabIndex = (parsedTabIndex || parsedTabIndex === 0) ? parsedTabIndex : null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['datePicker']) {
      this._watchStateChanges();
    }
  }

  ngOnDestroy() {
    this._stateChanges.unsubscribe();
  }

  ngAfterContentInit() {
    this._watchStateChanges();
  }

  _toggle(event: Event): void {
    if (!this.datePicker) {
      return;
    }

    if (this.datePicker && this.datePicker.opened) {
      this.datePicker.close();
    } else if (!this.disabled) {
      this.datePicker.open();
      event.stopPropagation();
    }
  }

  private _watchStateChanges() {
    const datePickerStateChanged = this.datePicker ? this.datePicker.stateChanges : observableOf();
    const inputStateChanged = this.datePicker && this.datePicker.datePickerInput ?
      this.datePicker.datePickerInput.stateChanges : observableOf();
    const datePickerToggled = this.datePicker ?
      merge(this.datePicker.openedStream, this.datePicker.closedStream) :
      observableOf();

    this._stateChanges.unsubscribe();
    this._stateChanges = merge(
      datePickerStateChanged as Observable<void>,
      inputStateChanged,
      datePickerToggled
    ).subscribe(() => this._changeDetectorRef.markForCheck());
  }

  static ngAcceptInputType_disabled: BooleanInput;
}