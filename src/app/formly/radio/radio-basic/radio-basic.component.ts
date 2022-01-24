import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'formly-radio-basic',
  templateUrl: './radio-basic.component.html'
})
export class FormlyBasicRadioComponent {

  label = 'Historical Figures';
  options: { label: string, value: string }[] = [
    {
      value: 'sojourner-truth',
      label: 'Sojourner Truth',
    },
    {
      value: 'frederick-douglass',
      label: 'Frederick Douglass',
    },
    {
      value: 'booker-t-washington',
      label: 'Booker T.Washington',
    },
    {
      value: 'george-washington-carver',
      label: 'George Washington Carver',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];

  form = new FormGroup({});
  model: any = {};
  formlyOptions: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'historical-figures',
      type: 'radio',
      templateOptions: {
        label: this.label,
        options: this.options,
      }
    }
  ];

}
