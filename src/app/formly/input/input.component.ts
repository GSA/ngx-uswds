import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-input',
  templateUrl: './input.component.html',

})
export class FormlyInputComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'search',
      type: 'input',
      templateOptions: {
        placeholder: 'type here...',
        label: 'Search',
        required: true
      },
    },];

}
