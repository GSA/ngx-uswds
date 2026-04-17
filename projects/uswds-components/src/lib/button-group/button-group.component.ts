import { Component, Input } from '@angular/core';

	@Component({
	standalone: false,
  selector: 'uswds-button-group',
  template: `
  <ul class="usa-button-group" [ngClass]="{'usa-button-group--segmented': isSegmented}">
    <ng-content></ng-content>
  </ul>`
})
export class USWDSButtonGroupComponent {  
  @Input() isSegmented = false;
}
