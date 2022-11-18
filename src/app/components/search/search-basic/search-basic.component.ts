import { Component, Input } from '@angular/core';

@Component({
  selector: 'search-basic',
  templateUrl: './search-basic.component.html',
})
export class SearchBasicComponent {

  @Input() buttonText: string = 'Search';
  @Input() size: 'big' | 'small' | null;
  @Input() placeholder: string = 'Search Placeholder';
  @Input() id: string = 'search-basic';
  @Input() ariaLabel: string = 'search basic';
  @Input() name: string = 'searchBasic';
  
  @Input() searchTextChange: Function = ($event) => {
    console.log($event);
  }

  @Input() onBlur: Function = ($event) => {
    console.log($event);
  }

  @Input() onTextSubmit: Function = ($event) => {
    console.log($event);
  }
}
