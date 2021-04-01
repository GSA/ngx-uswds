import { Component } from '@angular/core';

@Component({
  selector: '[uswds-process-list]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    'class': 'usa-process-list',
  }
})
export class USWDSProcessListComponent {}
