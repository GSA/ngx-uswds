import { Component } from '@angular/core';
import { UsaNavigationLink } from '@gsa-sam/ngx-uswds';

@Component({
  selector: 'breadcrumb-basic',
  templateUrl: './breadcrumb-basic.component.html'
})
export class BreadcrumbBasicComponent {
  items: UsaNavigationLink[] = [
    {
      id: '1',
      text: 'Home',
      path: '/',
    },
    {
      id: '2',
      text: 'Federal Contracting',
      path: '/'
    },
    {
      id: '3',
      text: 'Contracting assistance programs',
      path: '/'
    },
    {
      id: '4',
      text: 'Women-owned small business federal contracting program',
      path: '/'
    }
  ];

  wrap = false;
  hideSingleCrumb = false;

  onSelection($event) {
    console.log($event);
  }
}
