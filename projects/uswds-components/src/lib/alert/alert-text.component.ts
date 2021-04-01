import { Component } from "@angular/core";


@Component({
  selector: `uswds-alert-text`,
  template: `
    <p class="usa-alert__text">
      <ng-content></ng-content>
    </p>
  `
})
export class USWDSAlertTextComponent {}
