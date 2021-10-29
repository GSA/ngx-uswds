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
  sidenavModel: SidenavModel[] = [];
  componentModel = [
    {
      labelText: 'Accordion',
      href: 'accordion',
      id: 1
    },
    {
      labelText: 'Character Count',
      href: 'character-count',
      id: 20,
    },
    {
      labelText: 'Checkbox',
      href: 'checkbox',
      id: 19,
    },
    {
      labelText: 'Date Picker',
      href: 'datepicker',
      id: 18,
    },
    {
      labelText: 'File Input',
      href: 'file-input',
      id: 10
    },
    {
      labelText: 'Modal',
      href: 'modal',
      id: 15
    },
    {
      labelText: 'Radio',
      href: 'radio',
      id: 21,
    },
    {
      labelText: 'Step Indicator',
      href: 'step-indicator',
      id: 14
    },
    {
      labelText: 'Table',
      href: 'table',
      id: 17,
    },
    {
      labelText: 'Tooltip',
      href: 'tooltip',
      id: 16
    },
    {
      labelText: 'Search',
      href: 'search',
      id: 22,
    },
  ];
  formlySidenavModel: SidenavModel[] = [
    {
      labelText: 'Input',
      href: 'input',
      id: 1
    },

  ];
  selectedItem: SidenavModel;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit() {
    const subscription = this.router.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        const url = this.router.url;
        const sideNavItem = url.substring(1, url.length).split('/')[0];
        this.sidenavModel = sideNavItem == 'formly' ? this.formlySidenavModel : this.componentModel
        console.log(sideNavItem)
        this.selectedItem = this.sidenavModel.find(model => model.href === sideNavItem);
        if (this.selectedItem) {
          this.selectedItem.selected = true;
          subscription.unsubscribe();
        }
      }
    })
  }

  onNavigationChange(name: string) {
    this.router.navigate([`/${name}`]);
    this.sidenavModel = name == 'formly' ? this.formlySidenavModel : this.componentModel
  }
  onSidenavClick(sidenav: SidenavModel) {
    this.selectedItem = sidenav;
    this.router.navigate([sidenav.href], { relativeTo: this.activatedRoute });
  }
}
