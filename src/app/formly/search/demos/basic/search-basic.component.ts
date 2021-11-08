import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-search-basic',
  templateUrl: './search-basic.component.html',

})
export class FormlyBasicSearchComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'search',
      type: 'search',
      templateOptions: {
        placeholder: 'type here...',
        label: 'Keyword Search',
      },
    },];

}
