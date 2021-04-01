import { Component, Input } from '@angular/core';


@Component({
  selector: `uswds-card-media`,
  template: `
  <header>
    <div class="usa-card__img">
      <ng-content></ng-content>
    </div>
  </header>`,
  host: {
    'class': 'usa-card__media',
    '[class.usa-card__inset]': 'inset',
    '[class.usa-card__exdent]': 'exdent',
  }
})
export class USWDSCardMediaComponent {
  // Inset media content - aligns media within the card's padding
  @Input() inset = false;

  // Stretch media content to card border
  @Input() exdent = false;
}
