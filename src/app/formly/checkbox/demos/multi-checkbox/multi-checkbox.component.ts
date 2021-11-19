import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

        selectAllLable: "Select All",
        options: [
          {
            key: 'vet',
            value: 'Veteran Owned',
            checked: true,
            control: new FormControl(true)
          },
          {
            key: 'women',
            value: 'Women Owned',
            control: new FormControl(false)

          },
          {
            key: 'minority',
            value: 'Minority Owned',
            control: new FormControl(false)
          }
        ]
      }
    }
  ];
}
