import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SidenavModel, UsaNavigationMode } from "@gsa-sam/ngx-uswds";


@Component({
  selector: 'app-formly-main',
  template: `
    <div class="padding-1 grid-row">
      <div class="tablet:grid-col-2 mobile-lg: grid-col-12 margin-right-2 margin-bottom-2 margin-left-2 site-sidenav">
        <usa-sidenav [sidenavContent]="sidenavModel" (sidenavClicked)="onSidenavClick($event)">
        </usa-sidenav>
      </div>

      <div uswds-card class="tablet:grid-col-9 mobile-lg: grid-col-12">
        <uswds-card-header>
          <h1 class="usa-card__heading">{{selectedItem?.text}}</h1>
        </uswds-card-header>
        <uswds-card-body class="padding-1">
          <router-outlet></router-outlet>
        </uswds-card-body>
      </div>
    </div>
  `
})
export class FormlyMainComponent implements OnInit {
  selectedItem: SidenavModel;

  sidenavModel: SidenavModel[] = [
    {
      text: 'Checkbox',
      path: 'checkbox',
      id: '4',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'DatePicker',
      path: 'datepicker',
      id: '5',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'Input',
      path: 'input',
      id: '1',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'Radio',
      path: 'radio',
      id: '2',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'Search',
      path: 'search',
      id: '3',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'Range Slider',
      path: 'range-slider',
      id: '6',
      mode: UsaNavigationMode.INTERNAL
    },

  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const selectedComponent = this.router.url.split('/')[2];
    const selectedNav = this.sidenavModel.find(nav => nav.path === selectedComponent);
    if (selectedNav) {
      selectedNav.selected = true;
    }
  }

  onSidenavClick(sidenav: SidenavModel) {
    this.selectedItem = sidenav;
    this.router.navigate([sidenav.path], { relativeTo: this.activatedRoute });
  }
}
