import { Component } from "@angular/core";


@Component({
  selector: `[uswds-process-list-header]`,
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'usa-process-list__heading',
  }
})
export class USWDSProcessListHeaderComponent {}