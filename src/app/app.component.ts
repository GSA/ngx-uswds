import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SidenavModel } from 'projects/uswds-components/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'usa-components';
  sidenavModel: SidenavModel[] = [
    {
      labelText: 'Accordion',
      href: 'accordion',
      id:1
    },
    // {
    //   labelText: 'Alert',
    //   href: 'alert',
    //   id:2
    // },
    // {
    //   labelText: 'Breadcrumb',
    //   href: 'breadcrumb',
    //   id:3
    // },
    // {
    //   labelText: 'Button',
    //   href: 'button',
    //   id:4
    // },
    // {
    //   labelText: 'Button Group',
    //   href: 'button-group',
    //   id:5
    // },
    // {
    //   labelText: 'Card',
    //   href: 'card',
    //   id:6
    // },
    // {
    //   labelText: 'Checkbox',
    //   href: 'checkbox',
    //   id:7
    // },
    // {
    //   labelText: 'Date Input',
    //   href: 'date-input',
    //   id:8
    // },
    // {
    //   labelText: 'Dropdown',
    //   href: 'dropdown',
    //   id:9
    // },
    // {
    //   labelText: 'File Input',
    //   href: 'file-input',
    //   id:10
    // },
    // {
    //   labelText: 'Link',
    //   href: 'link',
    //   id: 11
    // },
    // {
    //   labelText: 'List',
    //   href: 'list',
    //   id: 12
    // },
    // {
    //   labelText: 'Process List',
    //   href: 'process-list',
    //   id: 13
    // },
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
      labelText: 'Table',
      href: 'table',
      id: 16
    },
  ];

  selectedItem: SidenavModel;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}


  ngOnInit() {
    const subscription = this.router.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        const url = this.router.url;
        const sideNavItem = url.substring(1, url.length).split('/')[0];
        this.selectedItem = this.sidenavModel.find(model => model.href === sideNavItem);
        if (this.selectedItem) {
          this.selectedItem.selected = true;
          subscription.unsubscribe();
        }
      }
    })
  }

  onSidenavClick(sidenav: SidenavModel) {
    this.selectedItem = sidenav;
    this.router.navigate([sidenav.href], {relativeTo: this.activatedRoute});
  }
}
