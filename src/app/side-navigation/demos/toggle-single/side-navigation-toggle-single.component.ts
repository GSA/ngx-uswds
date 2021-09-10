import { Component, ViewChild } from '@angular/core';
import { SidenavModel, USWDSSidenavComponent } from 'uswds-components';

@Component({
  selector: 'app-side-navigation-toggle-single',
  templateUrl: './side-navigation-toggle-single.component.html'
})
export class SideNavigationToggleSingleComponent {

  @ViewChild(USWDSSidenavComponent)
  sidenav: USWDSSidenavComponent;



  sidenavModel: SidenavModel[] = [
    {
      labelText: 'Accordion',
      href: 'accordion',
      id: 1,
      children: [
        {
          labelText: 'Accordion - Child',
          href: 'accordian-child',
          id: 100,
          children: [
            {
              labelText: 'Accordion - Grandchild',
              href: 'accordian-grandchild',
              id: 1000
            }
          ]
        },
        {
          labelText: 'Accordion - Child 2',
          href: 'accordian-child-2',
          id: 200,
        },
        {
          labelText: 'Accordion - Child 3',
          href: 'accordian-child-3',
          id: 300,
        }
      ]
    },
    {
      labelText: 'File Input',
      href: 'file-input',
      id: 10,
      children: [
        {
          labelText: 'File Input - Child',
          href: 'file-input-child',
          id: 104
        },
      ]
    },
    {
      labelText: 'Step Indicator',
      href: 'step-indicator',
      id: 14
    },
    {
      labelText: 'Modal',
      href: 'modal',
      id: 15
    },
    {
      labelText: 'Tooltip',
      href: 'tooltip',
      id: 16
    },
    {
      labelText: 'Table',
      href: 'table',
      id: 17,
    }
  ];

  constructor() { }

  collapseAll(): void {
    this.sidenav.collapseAll();
  }

}
