import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-checkbox-basic',
  templateUrl: './checkbox-basic.component.html',

})
export class FormlyBasicCheckboxComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'checkbox',
      type: 'checkbox',
      templateOptions: {
        label: 'Label for Checkbox',
        description: 'some description',
        required: true,
      }
    }
  ];
}
