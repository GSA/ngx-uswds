import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-dropdown-basic',
  templateUrl: './dropdown-basic.component.html',
})
export class FormlyBasicDropdownComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'dropdown',
      type: 'dropdown',
      templateOptions: {
        label: 'Dropdown',

        options: [
          {
            label: 'Option A',
            value: 'A',
            disabled: false
          },
          {
            label: 'Option B',
            value: 'B',
            disabled: false
          },
          {
            label: 'Option C',
            value: 'C',
            disabled: false
          },
          {
            label: 'Option D',
            value: 'D',
            disabled: false
          },
          {
            label: 'Option E',
            value: 'E',
            disabled: false
          }
        ]
      }
    }
  ];
}