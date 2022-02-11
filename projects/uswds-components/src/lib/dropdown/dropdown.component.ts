import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { DropdownOptionsModel } from './dropdown-options.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let dropdownId = 0;
@Component({
  selector: 'usa-dropdown',
  templateUrl: './dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsaDropdownComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsaDropdownComponent implements ControlValueAccessor {

  model: DropdownOptionsModel;

  /** Id of dropdown field */
  @Input() id: string = `usa-dropdown-${dropdownId++}`;

  /** HTML name attribute for dropdown */
  @Input() name: string;

  /** List of selectable options */
  @Input() options: DropdownOptionsModel[];

  @Input() disabled = false;

  @Output() optionChange = new EventEmitter<DropdownOptionsModel>();

  private onChange = (v: any) => { };
  private onTouched = () => { };

  constructor(public cdr: ChangeDetectorRef) { }

  onOptionSelected($event) {
    const options: HTMLOptionsCollection = $event.target.options;
    const selectedOption = options.item(options.selectedIndex);
    this.model = { label: selectedOption.label, value: selectedOption.value };

    this.onChange(this.model);
    this.optionChange.emit(this.model);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.model = value;
    this.cdr.markForCheck();
  }
}
