import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  templateUrl: './input-suffix.component.html',

})
export class FormlySuffixInputComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'search',
      type: 'input',
      templateOptions: {
        placeholder: 'type here...',
        label: 'Keyword Search',
        description: `For more information on how to use our keyword search, visit our <a href="#"> help guide </a>`,
        required: true,
        suffix: 'lbs'
      },
    },];

}
