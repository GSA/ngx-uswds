import { Component, Input } from '@angular/core';
import { UsaNavigationMode, SidenavModel } from '@gsa-sam/ngx-uswds';

@Component({
  selector: 'side-navigation-basic',
  templateUrl: './side-navigation-basic.component.html'
})
export class SideNavigationBasicComponent {

  @Input() sidenavContent: SidenavModel[] = [
    {
      mode: UsaNavigationMode.EXTERNAL,
      text: 'Accordion',
      path: 'javascript:void(0)',
      id: '1',
      children: [
        {
          mode: UsaNavigationMode.EXTERNAL,
          text: 'Accordion - Child',
          path: 'javascript:void(0)',
          id: '100',
          children: [
            {
              mode: UsaNavigationMode.EXTERNAL,
              text: 'Accordion - Grandchild',
              path: 'javascript:void(0)',
              id: '1000'
            }
          ]
        }
      ]
    },
    {
      mode: UsaNavigationMode.INTERNAL,
      text: 'File Input',
      path: '/file-input',
      id: '10',
      queryParams: { index: 'opportunities' },
      children: [
        {
          mode: UsaNavigationMode.INTERNAL,
          text: 'File Input - Child',
          path: '/file-input-child',
          id: '104'
        },
      ]
    },
    {
      mode: UsaNavigationMode.EVENT,
      text: 'Step Indicator',
      path: 'step-indicator',
      id: '14'
    },
    {
      mode: UsaNavigationMode.EVENT,
      text: 'Modal',
      path: 'modal',
      id: '15'
    },
    {
      mode: UsaNavigationMode.EVENT,
      text: 'Tooltip',
      path: 'tooltip',
      id: '16'
    },
    {
      mode: UsaNavigationMode.EVENT,
      text: 'Table',
      path: 'table',
      id: '17',
    }
  ];

  @Input() expandType: 'single' | 'multiple' = 'single';
  @Input() enableLabelCollapse: boolean = false;
  @Input() autoCollapseLabels: boolean = false;
  @Input() selectFirstLabelChild: boolean = true;
  @Input() sidenavClicked: Function = ($event) => {
    console.log($event);
  }
}
