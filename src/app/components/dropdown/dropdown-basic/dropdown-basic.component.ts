import { Component, OnInit } from '@angular/core';
import { DropdownOptionsModel } from '@gsa-sam/ngx-uswds';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown-basic.component.html',
})
export class DropdownBasicComponent {

  options: DropdownOptionsModel[] = [
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
  ];

  name: 'basicDropdown';

  selectedOption: DropdownOptionsModel;

  onOptionChange($event) {
    this.selectedOption = $event;
  }

}
