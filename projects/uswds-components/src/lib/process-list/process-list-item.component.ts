import { Component } from "@angular/core";


@Component({
  selector: `[uswds-process-list-item]`,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    'class': 'usa-process-list__item',
  },
})
export class USWDSProcessListItemComponent {
}
