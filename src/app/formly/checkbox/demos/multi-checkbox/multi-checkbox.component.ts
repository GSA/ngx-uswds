import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-multi-checkbox',
  templateUrl: './multi-checkbox.component.html',

})
export class FormlyMultiCheckboxComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'multi-checkbox',
      type: 'multicheckbox',
      templateOptions: {
        label: 'Label for Multi Checkbox',
        description: 'some description',
        required: true,
        options: [
          {
            key: 'vet',
            value: 'Veteran Owned'
          },
          {
            key: 'women',
            value: 'Women Owned'
          },
          {
            key: 'minority',
            value: 'Minority Owned'
          }
        ]
      }
    }
  ];
}
