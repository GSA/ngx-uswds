import { SidenavModel } from "@gsa-sam/ngx-uswds";
import { UsaNavigationMode } from "projects/uswds-components/src/lib/util/navigation";

export const sidenavModel: SidenavModel[] = [
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
            id: '1000',
            children: [
              {
                mode: UsaNavigationMode.EXTERNAL,
                text: 'Accordion - Great-Grandchild',
                path: 'javascript:void(0)',
                id: '10000',
                children: [
                  {
                    mode: UsaNavigationMode.EXTERNAL,
                    text: 'Accordion - Great-Great-Grandchild',
                    path: 'javascript:void(0)',
                    id: '100000',
                    children: [
                      {
                        mode: UsaNavigationMode.EXTERNAL,
                        text: 'Accordion - Great-Great-Great-Grandchild',
                        path: 'javascript:void(0)',
                        id: '1000000'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    mode: UsaNavigationMode.EVENT,
    text: 'File Input',
    path: '/file-input',
    id: '10',
    queryParams: { index: 'opportunities' },
    children: [
      {
        mode: UsaNavigationMode.EVENT,
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