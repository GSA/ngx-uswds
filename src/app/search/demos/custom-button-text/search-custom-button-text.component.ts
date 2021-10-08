import { Component } from '@angular/core';

@Component({
  selector: 'usa-search-custom-button-text',
  templateUrl: './search-custom-button-text.component.html',
})
export class SearchCustomButtonTextComponent {
  model = '';

  searchSettings = {
    ariaLabel: 'Default Search Component',
    id: 'search-field-search-field',
    size: 'default',
    buttonText: 'Apply'
  };
}
