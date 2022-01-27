import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'formly-multi-checkbox',
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
        selectAllLable: "Select All",
        options: [
          {
            key: 'vet',
            value: 'Veteran Owned',
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
