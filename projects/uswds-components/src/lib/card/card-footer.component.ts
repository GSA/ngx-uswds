import { Component } from '@angular/core';


	@Component({
	standalone: false,
  selector: `uswds-card-footer`,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    'class': 'usa-card__footer'
  }
})
export class USWDSCardFooterComponent {}
