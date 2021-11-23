import { Component } from '@angular/core';
import { HeaderNavigationLink } from 'uswds';
import { UsaHeaderPrimaryLink } from '@gsa-sam/ngx-uswds';

@Component({
  selector: 'usa-header-basic',
  templateUrl: './header-primary.component.html',
})
export class HeaderPrimaryComponent {


  navigationLinks: UsaHeaderPrimaryLink[] = [
    {
      text: 'Home',
      id: 'home',
      // Including children link in data model adds them in as submenu
      children: [
        {
          text: 'Item 1',
          id: 'homeChild1',
          path: '/header/examples',
        },
        {
          text: 'Item 2',
          id: 'homeChild2',
          path: '/header/examples',
        },
        {
          text: 'Item 3',
          id: 'homeChild3',
          path: '/header/examples',
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
          path: '/header/examples',
        },
        {
          text: 'Item 2',
          id: 'homeChild2',
          path: '/header/examples',
        },
        {
          text: 'Item 3',
          id: 'homeChild3',
          path: '/header/examples',
        },
      ],
    },
    {
      text: 'Databank',
      id: 'databank',
    },
  ];

  onLinkClicked($event: HeaderNavigationLink) {
    console.log('Header Primary Nav Clicked', $event);
  }
}
