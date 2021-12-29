import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UsaNavigationMode, SidenavModel } from "@gsa-sam/ngx-uswds";


@Component({
  templateUrl: `./components-page.component.html`,
  selector: `app-components-page`
})
export class ComponentsPageComponent implements OnInit {
  sidenavModel: SidenavModel[] = [
    {
      text: 'Accordion',
      path: 'accordion',
      id: '1',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'Character Count',
      path: 'character-count',
      id: '20',
      mode: UsaNavigationMode.INTERNAL

    },
    {
      text: 'Checkbox',
      path: 'checkbox',
      id: '19',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'Date Picker',
      path: 'datepicker',
      id: '18',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'Dropdown',
      path: 'dropdown',
      id: '24',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'File Input',
      path: 'file-input',
      id: '10',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'Modal',
      path: 'modal',
      id: '15',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'Radio',
      path: 'radio',
      id: '21',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'Step Indicator',
      path: 'step-indicator',
      id: '14',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'Tooltip',
      path: 'tooltip',
      id: '16',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'Table',
      path: 'table',
      id: '17',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'Side Navigation',
      path: 'side-navigation',
      id: '18',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'Search',
      path: 'search',
      id: '22',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'Header',
      path: 'header',
      id: '23',
      mode: UsaNavigationMode.INTERNAL
    },
    {
      text: 'Input',
      path: 'input',
      id: '60',
      mode: UsaNavigationMode.INTERNAL
    },
  ];

  selectedItem: SidenavModel;

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
