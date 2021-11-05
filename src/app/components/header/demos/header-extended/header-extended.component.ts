import { Component } from '@angular/core';
import { NavigationMode, UsaHeaderPrimaryLink, UsaNavigationLink } from '@gsa-sam/ngx-uswds';

@Component({
  selector: 'usa-header-extended',
  templateUrl: './header-extended.component.html',
})
export class HeaderExtendedComponent {

  secondaryLinks: UsaNavigationLink[] = [
    {
      text: 'Secondary Link',
      id: 'request',
      selected: true,
      href: '/header/examples'
    },
    {
      text: 'Custom Template Link',
      id: 'messages',
    },
  ];

  primaryLinks: UsaHeaderPrimaryLink[] = [
    {
      text: 'Home',
      selected: true,
      id: 'home',
    },
    {
      text: 'Search',
      id: 'search',
    },
    {
      text: 'Databank',
      id: 'databank',
    },
  ]

  logLinkEvent($event) {
    console.log('Link Event Extended Header', $event);
  }
}
