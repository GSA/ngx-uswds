import { SidenavModel } from "@gsa-sam/ngx-uswds";
import { UsaNavigationMode } from "projects/uswds-components/src/lib/util/navigation";

export const dropdownSidenavModel: SidenavModel[] = [
  {
    mode: UsaNavigationMode.EVENT,
    text: 'Entity Registration',
    path: '/entity-registration',
    queryParams: { index: 'opportunities' },
    id: '1',
    children: [
        {
            mode: UsaNavigationMode.EVENT,
            text: 'Core Data',
            path: '/core-data',
            id: '10',
        },
        {
            mode: UsaNavigationMode.EVENT,
            text: 'Assertions',
            path: '/assertions',
            id: '20',
            children: [
            {
                mode: UsaNavigationMode.EVENT,
                text: 'Service Classifications',
                path: '/service-classifications',
                id: '200',
            },
            {
                mode: UsaNavigationMode.EVENT,
                text: 'Disaster Response',
                path: '/disaster-response',
                id: '300',
            }
            ]
        },
      {
        mode: UsaNavigationMode.EVENT,
        text: 'Reps and Certs',
        path: '/reps-and-certs',
        id: '30',
      }
    ]
  },
  {
    mode: UsaNavigationMode.EVENT,
    text: 'Exclusions',
    path: '/exclusions',
    id: '2',
  },
  {
    mode: UsaNavigationMode.EVENT,
    text: 'Responsibility/Qualification',
    path: 'responsibility-qualification',
    id: '3'
  },
  {
    mode: UsaNavigationMode.EVENT,
    text: 'Entity Reporting',
    path: '/entity-reporting',
    id: '4'
  }
];