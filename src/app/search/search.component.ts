import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {
  defaultModel = '';
  bigModel = '';
  smallModel = '';
  spanishModel = '';

  searchSettings = {

    ariaLabel: 'Default Search Component',
    formClass: '',
    id: 'search-field-search-field',
    size: 'default',
    language: 'en'
  };

  bigSearchSettings = {

    ariaLabel: 'Big Search Component',
    formClass: 'usa-search--big',
    id: 'search-field-en-big',
    size: 'big',
    language: 'en'
  };

  smallSearchSettings = {
    ariaLabel: 'Small Search Component',
    formClass: 'usa-search--small',
    id: 'search-field-en-small',
    size: 'small',
    language: 'en'
  };

  spanishSearchSettings = {

    ariaLabel: 'Default (Spanish) search component',
    formClass: '',
    id: 'search-field-es',
    size: 'default',
    language: 'es'
  };

  spanishBigSearchSettings = {

    ariaLabel: 'Big (Spanish) Search Component',
    formClass: 'usa-search--big',
    id: 'search-field-es-big',
    size: 'big',
    language: 'es'
  };

  spanishSmallSearchSettings = {

    ariaLabel: 'Small (Spanish) Search Component',
    formClass: 'usa-search--small',
    id: 'search-field-es-small',
    size: 'small',
    language: 'es'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
