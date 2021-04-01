import { Component, Input } from '@angular/core';

@Component({
  selector: '[uswds-card]',
  template: `
    <div class="usa-card__container">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    'class': 'usa-card',
    '[class.usa-card--header-first]': 'headerFirst',
    '[class.usa-card--flag]': 'flagView',
    '[class.usa-card--media-right]': 'flagMediaRight',
  }
})
export class USWDSCardComponent {
  @Input() flagView = false;
  @Input() headerFirst = false;
  @Input() flagMediaRight = false;

  // Additional classes to add to card item eg: 'tablet:grid-col-6 desktop:grid-col-9'
  @Input() additionalStyles: string;
}
