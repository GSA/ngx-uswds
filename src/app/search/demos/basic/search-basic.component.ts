import { Component } from '@angular/core';

@Component({
  selector: 'usa-search-basic',
  templateUrl: './search-basic.component.html',
})
export class SearchBasicComponent {
  defaultModel = '';

  searchSettings = {
    ariaLabel: 'Default Search Component',
    id: 'search-field-search-field',
    size: 'default',
    language: 'en'
  };
}
