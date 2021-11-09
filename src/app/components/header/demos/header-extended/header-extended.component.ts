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
      id: 'home',
      // Including children link in data model adds them in as submenu
      children: [
        {
          text: 'Item 1',
          id: 'homeChild1',
          href: '/header/examples',
        },
        {
          text: 'Item 2',
          id: 'homeChild2',
          href: '/header/examples',
        },
        {
          text: 'Item 3',
          id: 'homeChild3',
          href: '/header/examples',
        }
      ],
    },
    {
      text: 'Search',
      id: 'search',
      isMegamenu: true, // Defining megamenu with children will display the submenu as a megamenu
      children: [
        {
          text: 'Item 1',
          id: 'homeChild1',  
          href: '/header/examples',
        },
        {
          text: 'Item 2',
          id: 'homeChild2',
          href: '/header/examples',
        },
        {
          text: 'Item 3',
          id: 'homeChild3',
          href: '/header/examples',
        },
      ],
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
