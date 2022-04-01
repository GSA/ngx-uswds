import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DropdownOptionsModel } from '@gsa-sam/ngx-uswds';

@Component({
  selector: 'dropdown-forms',
  templateUrl: './dropdown-forms.component.html',
})
export class DropdownFormsComponent {

  templateModel: any;

  reactiveFormControl = new FormControl();

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

}
