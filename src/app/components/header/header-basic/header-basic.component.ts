import { Component, Input } from '@angular/core';
import { UsaHeaderPrimaryLink, UsaNavigationLink } from '@gsa-sam/ngx-uswds';
import { primaryNavItems, secondaryNavItems } from '../header-data';

@Component({
  selector: 'header-basic',
  templateUrl: './header-basic.component.html',
})
export class HeaderBasicComponent {

  @Input() secondaryNavItems: UsaNavigationLink[] = secondaryNavItems;

  @Input() primaryNavItems: UsaHeaderPrimaryLink[] = primaryNavItems;

  @Input() extended = true;

  @Input() displayOverlayOnMenuOpen = false;

  @Input() title = 'Ngx USWDS'

  @Input() navAriaLabel = 'Demo Navigation';

  @Input() linkEvent = ($event) => {
    console.log($event);
  }

}
