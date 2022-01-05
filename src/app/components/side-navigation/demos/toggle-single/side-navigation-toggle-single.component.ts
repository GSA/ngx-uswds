import { Component, ViewChild } from '@angular/core';
import { UsaNavigationMode, SidenavModel, UsaSidenavComponent } from '@gsa-sam/ngx-uswds';

@Component({
  selector: 'app-side-navigation-toggle-single',
  templateUrl: './side-navigation-toggle-single.component.html'
})
export class SideNavigationToggleSingleComponent {

  @ViewChild(UsaSidenavComponent)
  sidenav: UsaSidenavComponent;



  sidenavModel: SidenavModel[] = [
    {
      text: 'Accordion',
      path: 'accordion',
      id: '1',
      mode: UsaNavigationMode.EVENT,
      children: [
        {
          text: 'Accordion - Child',
          path: 'accordian-child',
          id: '100',
          mode: UsaNavigationMode.INTERNAL,
          children: [
            {
              text: 'Accordion - Grandchild',
              path: 'accordian-grandchild',
              id: '1000',
              mode: UsaNavigationMode.INTERNAL,
            }
          ]
        },
        {
          text: 'Accordion - Child 2',
          path: 'accordian-child-2',
          id: '200',
          mode: UsaNavigationMode.INTERNAL,
        },
        {
          text: 'Accordion - Child 3',
          path: 'accordian-child-3',
          id: '300',
          mode: UsaNavigationMode.INTERNAL,
        }
      ]
    },
    {
      text: 'File Input',
      path: 'file-input',
      id: '10',
      mode: UsaNavigationMode.EVENT,
      children: [
        {
          text: 'File Input - Child',
          path: 'file-input-child',
          id: '104',
          mode: UsaNavigationMode.INTERNAL,
        },
      ]
    },
    {
      text: 'Step Indicator',
      path: 'step-indicator',
      id: '14',
      mode: UsaNavigationMode.INTERNAL,
    },
    {
      text: 'Modal',
      path: 'modal',
      id: '15',
      mode: UsaNavigationMode.INTERNAL,
    },
    {
      text: 'Tooltip',
      path: 'tooltip',
      id: '16',
      mode: UsaNavigationMode.INTERNAL,
    },
    {
      text: 'Table',
      path: 'table',
      id: '17',
      mode: UsaNavigationMode.INTERNAL,
    }
  ];

  constructor() { }

  collapseAll(): void {
    this.sidenav.collapseAll();
  }

}
