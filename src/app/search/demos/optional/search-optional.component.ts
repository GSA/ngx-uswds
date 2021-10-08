import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-optional',
  templateUrl: './search-optional.component.html',
  styles: [
  ]
})
export class SearchOptionalComponent implements OnInit {
  defaultModel = '';
  bigModel = 'test model';
  smallModel = '';
  onBlurSearchText = ''
  searchtext = '';
  searchTextModel = '';

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
    id: 'search-field-en-small',
    size: 'small',

  };

  buttonTextSearchSettings = {
    ariaLabel: 'Small (Spanish) Search Component',
    id: 'search-field-es-small',
    buttonText: 'Apply'
  };

  constructor() { }

  ngOnInit(): void {
  }

  onBlurUpdate(event) {
    this.onBlurSearchText = event;
    console.log('search value ', event)
  }
  onSearchTextUpdate(event) {
    this.searchtext = event;
  }
}
