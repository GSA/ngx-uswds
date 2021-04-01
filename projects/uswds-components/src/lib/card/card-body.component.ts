import { Component } from '@angular/core';


@Component({
  selector: `uswds-card-body`,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    'class': 'usa-card__body'
  },
})
export class USWDSCardBodyComponent {}
