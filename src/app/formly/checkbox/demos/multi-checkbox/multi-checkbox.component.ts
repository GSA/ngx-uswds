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
        // selectAll: true,
        selectAllLable: "Select All",
        options: [
          { name: 'Sojourner Truth', control: new FormControl(false) },
          { name: 'Frederick Douglass', control: new FormControl(false) },
          { name: 'Booker T. Washington', control: new FormControl(false) },
          { name: 'George Washington Carver', control: new FormControl(true) },
        ]
      }
    }
  ];
}
