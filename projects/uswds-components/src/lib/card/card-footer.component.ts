import { Component } from '@angular/core';


@Component({
  selector: `uswds-card-footer`,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    'class': 'usa-card__footer'
  }
})
export class USWDSCardFooterComponent {}
