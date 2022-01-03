import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-slider-range-basic',
  templateUrl: './range-slider-basic.component.html'
})
export class FormlyBasicRangeSliderComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'value',
      type: 'range-slider',
      templateOptions: {
        min: 0,
        max: 150,
        step: 15,
        startingValue: 120
      },
    },
  ];

}
