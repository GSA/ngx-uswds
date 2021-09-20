import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

@Directive({
  selector: '[usaCheckboxDescription]',
  host: {
    class: 'usa-checkbox__label-description'
  }
})
export class UsaCheckboxLabelDescription {}
@Component({
  selector: 'usa-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsaCheckboxComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsaCheckboxComponent implements ControlValueAccessor {

  @ViewChild('input') nativeInput: ElementRef<HTMLInputElement>;

  @Input() tile: boolean;

  @Input() checked: boolean;

  @Input() disabled: boolean;

  @Input('aria-label') ariaLabel: string = '';

  @Input('aria-labelledby') ariaLabelledby: string | null = null;

  @Input('aria-describedby') ariaDescribedby: string;

  @Input() id = `usa-checkbox-${nextId++}`;

  @Input() required: boolean = false;

  /** Name value will be applied to the input element if present */
  @Input() name: string | null = null;

  @Input()
  get indeterminate() { return this._indeterminate};
  set indeterminate(value: boolean) {
    if (!this.nativeInput) {
      return;
    }
    this._indeterminate = value;
    this.nativeInput.nativeElement.indeterminate = value;
  }

  private _indeterminate: boolean

  @Output() change = new EventEmitter<boolean>();

  /**
  * Invoked when the model has been changed
  */
  onChange: (_: any) => void = (_: any) => {};

 /**
  * Invoked when the model has been touched
  */
  onTouched: () => void = () => {};


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

  _getAriaChecked(): 'true' | 'false' | 'mixed' {
    if (this.checked) {
      return 'true';
    }

    return this.indeterminate ? 'mixed' : 'false';
  }

  onCheckboxClick($event: PointerEvent) {
    $event.stopPropagation();
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.change.emit(this.checked);
  }

  preventChangePropogation($event: Event) {
    $event.stopPropagation();
  }

}
