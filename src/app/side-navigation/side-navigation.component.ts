import { Component, OnInit } from '@angular/core';
import { SidenavModel } from 'uswds-components';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styles: []
})
export class SideNavigationComponent implements OnInit {

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

  ngOnInit(): void {
  }

  onSidenavClick(event: any): void {
    console.log('side nav link clicked');
  }

}
