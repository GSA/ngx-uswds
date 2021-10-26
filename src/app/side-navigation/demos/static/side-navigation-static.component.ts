import { Component } from '@angular/core';
import { NavigationMode, SidenavModel } from 'uswds-components';

@Component({
  selector: 'app-side-navigation-static',
  templateUrl: './side-navigation-static.component.html'
})
export class SideNavigationStaticComponent {



  sidenavModel: SidenavModel[] = [
    {
      mode: NavigationMode.EXTERNAL,
      labelText: 'Accordion',
      href: 'javascript:void(0)',
      id: 1,
      children: [
        {
          mode: NavigationMode.EXTERNAL,
          labelText: 'Accordion - Child',
          href: 'javascript:void(0)',
          id: 100,
          children: [
            {
              mode: NavigationMode.EXTERNAL,
              labelText: 'Accordion - Grandchild',
              href: 'javascript:void(0)',
              id: 1000
            }
          ]
        }
      ]
    },
    {
      mode: NavigationMode.INTERNAL,
      labelText: 'File Input',
      href: '/file-input',
      id: 10,
      queryParams: { index: 'opportunities' },
      children: [
        {
          mode: NavigationMode.INTERNAL,
          labelText: 'File Input - Child',
          href: '/file-input-child',
          id: 104
        },
      ]
    },
    {
      mode: NavigationMode.LABEL,
      labelText: 'Step Indicator',
      href: 'step-indicator',
      id: 14
    },
    {
      mode: NavigationMode.LABEL,
      labelText: 'Modal',
      href: 'modal',
      id: 15
    },
    {
      mode: NavigationMode.LABEL,
      labelText: 'Tooltip',
      href: 'tooltip',
      id: 16
    },
    {
      mode: NavigationMode.LABEL,
      labelText: 'Table',
      href: 'table',
      id: 17,
    }
  ];

  constructor() { }

  onSidenavClick(event: any): void {
    console.log('side nav link clicked');
  }

}
