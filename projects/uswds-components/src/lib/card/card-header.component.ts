import { Component } from '@angular/core';


@Component({
  selector: `uswds-card-header`,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    'class': 'usa-card__header'
  }
})
export class USWDSCardHeaderComponent {}
