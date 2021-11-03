import { Component, OnInit } from '@angular/core';
import { DropdownOptionsModel } from 'uswds-components';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {

  dropdownOptions: DropdownOptionsModel[] = [
    {
      label: '--Select--',
      value: null,
    },
    {
      label: 'Option A',
      value: 'value1'
    },
    {
      label: 'Option B',
      value: 'value2'
    },
    {
      label: 'Option C',
      value: 'value3'
    },
    {
      label: 'Option D',
      value: 'value4'
    },
    {
      label: 'Option E',
      value: 'value5'
    }
  ]

  selectedOption: DropdownOptionsModel;

  onOptionChange($event) {
    this.selectedOption = $event;
  }

}
