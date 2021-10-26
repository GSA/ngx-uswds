import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-onchange',
  templateUrl: './search-onchange.component.html',
  styles: [
  ]
})
export class SearchOnChangeComponent implements OnInit {
  onBlurSearchText = '';
  searchtext = '';
  searchTextModel = '';


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
