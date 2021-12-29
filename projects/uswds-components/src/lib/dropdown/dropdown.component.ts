import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { DropdownOptionsModel } from './dropdown-options.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'uswds-dropdown',
  templateUrl: './dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => USWDSDropdownComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class USWDSDropdownComponent implements ControlValueAccessor {

  /** Id of dropdown field */
  @Input() id: string;

  /** Label string for dropdown input */
  @Input() label: string;

  /** List of selectable options */
  @Input() options: DropdownOptionsModel[];

  @Input() disabled = false;

  @Output() optionChange = new EventEmitter<DropdownOptionsModel>();

  private onChange = (v: any) => { };
  private onTouched = () => { };

  onOptionSelected($event) {
    const options: HTMLOptionsCollection = $event.target.options;
    const selectedOption = options.item(options.selectedIndex);
    const dropdownOption: DropdownOptionsModel = { label: selectedOption.label, value: selectedOption.value };

    this.onChange(dropdownOption);
    this.optionChange.emit(dropdownOption);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value): void {
  }
}
