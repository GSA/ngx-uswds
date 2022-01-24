import { Component } from '@angular/core';
import { UsaHeaderPrimaryLink, UsaNavigationLink } from '@gsa-sam/ngx-uswds';
import { primaryNavItems, secondaryNavItems } from '../header-data';

@Component({
  selector: 'header-basic',
  templateUrl: './header-basic.component.html',
})
export class HeaderBasicComponent {

  secondaryNavItems: UsaNavigationLink[] = secondaryNavItems;

  primaryNavItems: UsaHeaderPrimaryLink[] = primaryNavItems;

  extended = true;

  displayOverlayOnMenuOpen = false;

  title = 'Ngx USWDS'

  navAriaLabel = 'Demo Navigation';

  linkEvent = ($event) => {
    console.log($event);
  }

}
