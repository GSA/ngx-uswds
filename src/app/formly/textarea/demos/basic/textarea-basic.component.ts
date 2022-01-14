import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-textarea-basic',
  templateUrl: './textarea-basic.component.html',
  styles: [],
})
export class FormlyTextareaBasicComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'textarea',
      type: 'textarea',
      templateOptions: {
        label: 'TextArea',
        placeholder: 'type here',
        maxLength: 100,
      },
    },
  ];
}
