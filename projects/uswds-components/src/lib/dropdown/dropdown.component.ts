import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownOptionsModel } from './dropdown-options.model';

@Component({
  selector: 'uswds-dropdown',
  templateUrl: './dropdown.component.html',
})
export class USWDSDropdownComponent {

  /** Id of dropdown field */
  @Input() id: string;

  /** Label string for dropdown input */
  @Input() label: string;

  /** List of selectable options */
  @Input() options: DropdownOptionsModel[];

  @Input() disabled = false;
  
  @Output() optionChange = new EventEmitter<DropdownOptionsModel>();

  onOptionSelected($event) {
    const options: HTMLOptionsCollection = $event.target.options;
    const selectedOption = options.item(options.selectedIndex);
    const dropdownOption: DropdownOptionsModel = {label: selectedOption.label, value: selectedOption.value};
    this.optionChange.emit(dropdownOption);
  }

}
