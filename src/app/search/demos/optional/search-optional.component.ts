import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-optional',
  templateUrl: './search-optional.component.html',
  styles: [
  ]
})
export class SearchOptionalComponent {
  defaultModel = '';
  bigModel = 'test model';
  smallModel = '';


  searchSettings = {
    ariaLabel: 'Default Search Component',
    id: 'search-field-search-field',
  };

  bigSearchSettings = {
    ariaLabel: 'Big Search Component',
    id: 'search-field-en-big',
    size: 'big',

  };

  smallSearchSettings = {
    ariaLabel: 'Small Search Component',
    id: 'search-field-small',
    size: 'small',

  };

  buttonTextSearchSettings = {
    ariaLabel: 'Small Search Component',
    id: 'search-field-small',
    buttonText: 'Apply'
  };
}
