import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-input-basic',
  templateUrl: './radio-basic.component.html'
})
export class FormlyBasicRadioComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'historical-figures',
      type: 'radio',
      templateOptions: {

        label: 'Historical Figures',
        options: [
          {
            value: 'sojourner-truth',
            label:
              'Sojourner Truth',
          },
          {
            value: 'frederick-douglass',
            label:
              'Frederick Douglass',
          },
          {
            value: 'booker-t-washington',
            label: 'Booker T.Washington',
          },
          {
            value: 'booker-t-washington',
            label: 'Sole Proprietorship',
          },
          {
            value: 'george-washington-carver',
            label: 'George Washington Carver',
          },
          {
            value: 'other',
            label: 'Other',
          },
        ],
      },
    },];

}
