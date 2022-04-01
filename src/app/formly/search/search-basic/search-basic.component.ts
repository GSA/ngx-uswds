import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'formly-search-basic',
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
        placeholder: 'Search',
        label: 'Keyword Search',
        ariaLabel: 'Search Input',
        id: 'usa-search-demo',
        size: 'small',
        buttonText: 'Search',
        name: 'search'
      },
    },];

}
