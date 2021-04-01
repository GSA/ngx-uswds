import { Component } from '@angular/core';
import { USWDSBreadcrumbModel } from 'uswds-components';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  breadcrumbs: USWDSBreadcrumbModel[] = [
    {
      label: 'Home',
      id: 1
    },
    {
      label: 'Federal Contracting',
      id: 2
    },
    {
      label: 'Contracting assistance programs',
      id: 3
    },
    {
      label: 'Women-owned small business federal contracting program',
      id: 4
    }
  ];

  breadcrumbs2: USWDSBreadcrumbModel[] = [
    {
      label: 'Home',
      id: 1
    },
    {
      label: 'Federal Contracting',
      id: 2
    },
    {
      label: 'Contracting assistance programs',
      id: 3
    },
    {
      label: 'Women-owned small business federal contracting program',
      id: 4
    }
  ]
    
}
