import { Component } from '@angular/core';


	@Component({
	standalone: false,
  selector: `uswds-card-body`,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    'class': 'usa-card__body'
  },
})
export class USWDSCardBodyComponent {}
