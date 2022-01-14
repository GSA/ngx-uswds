import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-datepicker-basic',
  templateUrl: './datepicker-basic.component.html',
})
export class FormlyBasicDatepickerComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'datepicker',
      type: 'datepicker',
      templateOptions: {
        label: 'Start date'
      },
    }
  ];

}
