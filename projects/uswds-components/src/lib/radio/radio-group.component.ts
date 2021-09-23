import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Directive, EventEmitter, forwardRef, Input, OnDestroy, Output, QueryList } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subscription } from "rxjs";
import { UsaRadioComponent } from "./radio.component";

/**
 * Directive to allow heading for group of radio options
 */
@Directive({
  selector: '[usaRadioGroupLabel]',
})
export class UsaRadioGroupLabel {}

@Component({
  selector: `usa-radio-group`,
  template: `
  <div role="radiogroup" [attr.aria-labelledby]="ariaLabelledBy">
    <ng-content select="usaRadioGroupLabel"></ng-content>
    <ng-content></ng-content>
  </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsaRadioGroupComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsaRadioGroupComponent implements AfterContentInit, OnDestroy, ControlValueAccessor {

  /**
   * Invoked when the model has been changed
   */
  onChange: (_: any) => void = (_: any) => { };

  /**
  * Invoked when the model has been touched
  */
  onTouched: () => void = () => { };

  @ContentChildren(UsaRadioComponent) radioComponents: QueryList<UsaRadioComponent>;

  /**
   * Name for radio groups. A group of radio options should contain the same name
   */
  @Input() name: string;

  /**
   * Whether or not to display radio options as tile. This input is purely for presentation
   */
  @Input() tile: boolean;

  /**
   * Value of currently selected radio option. Each radio option within the group
   * should have a unique value. This value will match the currently selected
   * radio option's value within the group
   */
  @Input()
  get value() {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    if (!this.radioComponents) return;
    this.radioComponents.forEach(radio => {
      radio.checked = radio.value === val;
    })
  }
  _value: string;

  /**
   * Defines whether all radio options within the group are disabled or not.
   * To dispable individual radio buttons, please pass the disabled property directly
   * to the radio button
   */
  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
    if (this.radioComponents) {
      this.radioComponents.forEach(radio => {
        radio.disabled = value;
      })
    }
  }
  _disabled: boolean = false;

  @Input() ariaLabelledBy: string;

  /**
   * Outputs whenever radio option changes. The output data will
   * contain two properties, target and value. Target will refer to
   * the HTMLInputElement for the selected radio input while value will
   * contain the provided value of the input
   */
  @Output() change = new EventEmitter<{target: HTMLInputElement, value: string}>();

  _subscriptions = new Subscription();

  ngAfterContentInit() {
    this.radioComponents.forEach(radio => {
      radio.name = radio.name ? radio.name : this.name;
      radio.tile = radio.tile ? radio.tile : this.tile;
      radio.disabled = radio.disabled != undefined ? radio.disabled : this.disabled;
      if (this.value && radio.value === this.value) {
        radio.checked = true;
      }
      this._subscribeToRadioChange(radio);
    });
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  writeValue(value: string): void {
    this.value = value;
    if (this.radioComponents) {
      this.radioComponents.forEach(radio => {
        radio.checked = value === radio.value;
      })
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _subscribeToRadioChange(radio: UsaRadioComponent) {
    const changeSubscription = radio.change.subscribe((change: {target: HTMLInputElement, value: string}) => {
      this.radioComponents.forEach(component => {
        component.checked = component === radio;
        component.cdr.markForCheck();
      });

      this.onChange(change.value);
      this.change.emit(change);
    });
    this._subscriptions.add(changeSubscription);
  }
}