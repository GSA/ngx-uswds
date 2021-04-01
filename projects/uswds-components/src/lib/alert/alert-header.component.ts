import { Component, Input } from "@angular/core";


@Component({
  selector: `uswds-alert-header`,
  template: `
    <h3 class="usa-alert__heading">
      <ng-content></ng-content>
    </h3>
  `
})
export class USWDSAlertHeaderComponent {}
