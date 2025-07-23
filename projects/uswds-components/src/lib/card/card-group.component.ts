import { Component } from '@angular/core';


	@Component({
	standalone: false,
  selector: `uswds-card-group`,
  template: `
  <ul class="usa-card-group">
    <ng-content></ng-content>
  </ul>`
})
export class USWDSCardGroupComponent {
  
}
