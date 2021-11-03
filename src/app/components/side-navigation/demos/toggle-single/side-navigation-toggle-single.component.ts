import { Component, ViewChild } from '@angular/core';
import { NavigationMode, SidenavModel, UsaSidenavComponent } from 'uswds-components';

@Component({
  selector: 'app-side-navigation-toggle-single',
  templateUrl: './side-navigation-toggle-single.component.html'
})
export class SideNavigationToggleSingleComponent {

  @ViewChild(UsaSidenavComponent)
  sidenav: UsaSidenavComponent;



  sidenavModel: SidenavModel[] = [
    {
      labelText: 'Accordion',
      href: 'accordion',
      id: 1,
      mode: NavigationMode.LABEL,
      children: [
        {
          labelText: 'Accordion - Child',
          href: 'accordian-child',
          id: 100,
          mode: NavigationMode.INTERNAL,
          children: [
            {
              labelText: 'Accordion - Grandchild',
              href: 'accordian-grandchild',
              id: 1000,
              mode: NavigationMode.INTERNAL,
            }
          ]
        },
        {
          labelText: 'Accordion - Child 2',
          href: 'accordian-child-2',
          id: 200,
          mode: NavigationMode.INTERNAL,
        },
        {
          labelText: 'Accordion - Child 3',
          href: 'accordian-child-3',
          id: 300,
          mode: NavigationMode.INTERNAL,
        }
      ]
    },
    {
      labelText: 'File Input',
      href: 'file-input',
      id: 10,
      mode: NavigationMode.LABEL,
      children: [
        {
          labelText: 'File Input - Child',
          href: 'file-input-child',
          id: 104,
          mode: NavigationMode.INTERNAL,
        },
      ]
    },
    {
      labelText: 'Step Indicator',
      href: 'step-indicator',
      id: 14,
      mode: NavigationMode.INTERNAL,
    },
    {
      labelText: 'Modal',
      href: 'modal',
      id: 15,
      mode: NavigationMode.INTERNAL,
    },
    {
      labelText: 'Tooltip',
      href: 'tooltip',
      id: 16,
      mode: NavigationMode.INTERNAL,
    },
    {
      labelText: 'Table',
      href: 'table',
      id: 17,
      mode: NavigationMode.INTERNAL,
    }
  ];

  constructor() { }

  collapseAll(): void {
    this.sidenav.collapseAll();
  }

}
