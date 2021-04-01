import { Component, Input } from '@angular/core';

@Component({
  selector: '[uswds-link]',
  template: `<ng-content></ng-content>`,
  host: {
    '[class.usa-link]': '!unstyled',
    '[class.usa-link--external]': '!unstyled && isExternal',
  }
})
export class USWDSLinkComponent {

  @Input() isExternal = false;
  @Input() unstyled = false;
}
