import { Component, Input } from '@angular/core';

@Component({
  selector: '[uswds-list]',
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'usa-list',
    '[class.usa-list--unstyled]': 'unstyled',
  }
})
export class USWDSListComponent {

  @Input() unstyled = false;
  constructor() { }

}
