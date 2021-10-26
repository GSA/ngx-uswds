import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Directive({
  selector: '[usaRadioDescription]',
  host: {
    class: 'usa-checkbox__label-description'
  }
})
export class UsaRadioLabelDescription { }

let nextId = 0;

@Component({
  selector: `usa-radio`,
  templateUrl: `./radio.component.html`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsaRadioComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsaRadioComponent implements ControlValueAccessor{

  @Input() tile: boolean;

  @Input() value: string;

  @Input() disabled: boolean;

  @Input() checked: boolean;

  @Input('aria-label') ariaLabel: string = '';

  @Input('aria-labelledby') ariaLabelledby: string | null = null;

  @Input('aria-describedby') ariaDescribedby: string;

  @Input() id = `usa-radio-${nextId++}`;

  @Input() required: boolean = false;

  /** Name value will be applied to the input element if present */
  @Input() name: string = null;

  @Output() change = new EventEmitter<{ target: HTMLInputElement, value: string }>();

  /**
  * Invoked when the model has been changed
  */
  onChange: (_: any) => void = (_: any) => { };

  /**
   * Invoked when the model has been touched
   */
  onTouched: () => void = () => { };


  constructor(public cdr: ChangeDetectorRef) { }

  writeValue(value: any): void {
    this.checked = !!value;
    this.cdr.markForCheck();
  }

  /**
   * Registers a callback function that should be called when the control's value changes in the UI.
   * @param fn
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
    * Registers a callback function that should be called when the control receives a blur event.
    * @param fn
    */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onRadioClicked($event: PointerEvent, input: HTMLInputElement) {
    $event.stopPropagation();
    if (this.disabled) {
      return;
    }
    const outputValue = { target: input, value: input.value };
    this.checked = true;
    this.onChange(outputValue);
    this.change.emit(outputValue);
  }

  preventChangePropogation($event: Event) {
    $event.stopPropagation();
  }
}