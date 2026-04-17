import { Component } from '@angular/core';


	@Component({
	standalone: false,
  selector: `uswds-card-header`,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    'class': 'usa-card__header'
  }
})
export class USWDSCardHeaderComponent {}
