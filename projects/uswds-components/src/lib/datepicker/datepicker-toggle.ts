
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
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { merge, Observable, of as observableOf, Subscription } from 'rxjs';
import { UsaDatepickerControl, UsaDatepickerPanel } from './datepicker-base';


/** Can be used to override the icon of a `usaDatepickerToggle`. */
@Directive({
  selector: '[usaDatepickerToggleIcon]'
})
export class UsaDatepickerToggleIcon { }


@Component({
  selector: 'usa-datepicker-toggle',
  templateUrl: './datepicker-toggle.html',
  host: {
    'class': 'usa-date-picker__button',
    '[attr.tabindex]': 'null',
    '[class.usa-datepicker-toggle-active]': 'datepicker && datepicker.opened',
    '[class.usa-accent]': 'datepicker && datepicker.color === "accent"',
    '[class.usa-warn]': 'datepicker && datepicker.color === "warn"',
    // Used by the test harness to tie this toggle to its datepicker.
    '[attr.data-usa-calendar]': 'datepicker ? datepicker.id : null',
    // Bind the `click` on the host, rather than the inner `button`, so that we can call
    // `stopPropagation` on it without affecting the user's `click` handlers. We need to stop
    // it so that the input doesn't get focused automatically by the form field (See #21836).
    '(click)': '_open($event)',
  },
  exportAs: 'usaDatepickerToggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsaDatepickerToggle<D> implements AfterContentInit, OnChanges, OnDestroy {
  private _stateChanges = Subscription.EMPTY;

  /** Datepicker instance that the button will toggle. */
  @Input('for') datepicker: UsaDatepickerPanel<UsaDatepickerControl<any>, D>;

  /** Tabindex for the toggle. */
  @Input() tabIndex: number | null;

  /** Screenreader label for the button. */
  @Input('aria-label') ariaLabel: string;

  /** Whether the toggle button is disabled. */
  @Input()
  get disabled(): boolean {
    if (this._disabled === undefined && this.datepicker) {
      return this.datepicker.disabled;
    }

    return !!this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled: boolean;

  /** Custom icon set by the consumer. */
  @ContentChild(UsaDatepickerToggleIcon) _customIcon: UsaDatepickerToggleIcon;

  /** Underlying button element. */
  @ViewChild('button') _button: HTMLButtonElement;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    @Attribute('tabindex') defaultTabIndex: string) {

    const parsedTabIndex = Number(defaultTabIndex);
    this.tabIndex = (parsedTabIndex || parsedTabIndex === 0) ? parsedTabIndex : null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['datepicker']) {
      this._watchStateChanges();
    }
  }

  ngOnDestroy() {
    this._stateChanges.unsubscribe();
  }

  ngAfterContentInit() {
    this._watchStateChanges();
  }

  _open(event: Event): void {
    if (this.datepicker && !this.disabled) {
      this.datepicker.open();
      event.stopPropagation();
    }
  }

  private _watchStateChanges() {
    const datepickerStateChanged = this.datepicker ? this.datepicker.stateChanges : observableOf();
    const inputStateChanged = this.datepicker && this.datepicker.datepickerInput ?
      this.datepicker.datepickerInput.stateChanges : observableOf();
    const datepickerToggled = this.datepicker ?
      merge(this.datepicker.openedStream, this.datepicker.closedStream) :
      observableOf();

    this._stateChanges.unsubscribe();
    this._stateChanges = merge(
      datepickerStateChanged as Observable<void>,
      inputStateChanged,
      datepickerToggled
    ).subscribe(() => this._changeDetectorRef.markForCheck());
  }

  static ngAcceptInputType_disabled: BooleanInput;
}