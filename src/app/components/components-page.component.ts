import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavigationMode, SidenavModel } from "@gsa-sam/ngx-uswds";


@Component({
  templateUrl: `./components-page.component.html`,
  selector: `app-components-page`
})
export class ComponentsPageComponent implements OnInit {
  sidenavModel: SidenavModel[] = [
    {
      labelText: 'Accordion',
      href: 'accordion',
      id: 1,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Character Count',
      href: 'character-count',
      id: 10,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Checkbox',
      href: 'checkbox',
      id: 20,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Date Picker',
      href: 'datepicker',
      id: 30,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'File Input',
      href: 'file-input',
      id: 40,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Header',
      href: 'header',
      id: 50,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Input',
      href: 'input',
      id: 60,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Modal',
      href: 'modal',
      id: 70,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Radio',
      href: 'radio',
      id: 80,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Search',
      href: 'search',
      id: 90,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Side Navigation',
      href: 'side-navigation',
      id: 100,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Step Indicator',
      href: 'step-indicator',
      id: 110,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Tooltip',
      href: 'tooltip',
      id: 120,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Table',
      href: 'table',
      id: 130,
      mode: NavigationMode.INTERNAL
    },
  ];

  selectedItem: SidenavModel;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const selectedComponent = this.router.url.split('/')[2];
    const selectedNav = this.sidenavModel.find(nav => nav.href === selectedComponent);
    if (selectedNav) {
      selectedNav.selected = true;
    }
    console.log(this.router.url);
  }

  onSidenavClick(sidenav: SidenavModel) {
    this.selectedItem = sidenav;
    this.router.navigate([sidenav.href], { relativeTo: this.activatedRoute });
  }
}
