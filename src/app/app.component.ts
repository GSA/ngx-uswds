import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ThemeSwitcherService } from './shared/theme-switcher/theme-switcher.service';
import { NavigationMode, SidenavModel } from 'projects/uswds-components/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'usa-components';
  homeSidenavModel: SidenavModel[] = [
    {
      labelText: 'Accordion',
      href: 'accordion',
      id: 1,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Character Count',
      href: 'character-count',
      id: 20,
      mode: NavigationMode.INTERNAL

    },
    {
      labelText: 'Checkbox',
      href: 'checkbox',
      id: 19,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Date Picker',
      href: 'datepicker',
      id: 18,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'File Input',
      href: 'file-input',
      id: 10,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Modal',
      href: 'modal',
      id: 15,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Radio',
      href: 'radio',
      id: 21,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Step Indicator',
      href: 'step-indicator',
      id: 14,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Tooltip',
      href: 'tooltip',
      id: 16,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Table',
      href: 'table',
      id: 17,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Side Navigation',
      href: 'side-navigation',
      id: 18,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Search',
      href: 'search',
      id: 22,
      mode: NavigationMode.INTERNAL
    },
    {
      labelText: 'Header',
      href: 'header',
      id: 23,
      mode: NavigationMode.INTERNAL
    }
  ];

  formlySidenavModel: SidenavModel[] = [
    {
      labelText: 'Formly Input',
      href: 'input',
      id: 24,
      mode: NavigationMode.INTERNAL
    }
  ];

  sidenavModel: SidenavModel[];

  selectedItem: SidenavModel;
  selectedTab: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private themeSwitcher: ThemeSwitcherService,
  ) { }


  ngOnInit() {
    const subscription = this.router.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        const url = this.router.url;
        const sideNavItem = url.substring(1, url.length).split('/')[0];
        this.selectedItem = this.homeSidenavModel.find(model => model.href === sideNavItem);
        if (this.selectedItem) {
          this.selectedItem.selected = true;
          subscription.unsubscribe();
        }
      }
    });

    this.themeSwitcher.setStyle('theme', 'uswds-styles.css');
    this.sidenavModel = this.homeSidenavModel;
  }

  tabSelected(event) {
    this.selectedTab = event;
    this.sidenavModel = this.selectedTab === 'formly' ? this.formlySidenavModel : this.homeSidenavModel;
    this.onSidenavClick(this.sidenavModel[0]);
  }

  onSidenavClick(sidenav: SidenavModel) {
    this.selectedItem = sidenav;
    this.router.navigate([sidenav.href], { relativeTo: this.activatedRoute });
  }
}
