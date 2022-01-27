import { Component, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { UsaHeaderComponent, UsaHeaderPrimaryLink } from "@gsa-sam/ngx-uswds";


@Component({
  selector: `usa-app-header`,
  templateUrl: './app-header.component.html',
})
export class UsaAppHeaderComponent implements OnInit {

  @ViewChild(UsaHeaderComponent) usaHeader: UsaHeaderComponent;

  navigationLinks: UsaHeaderPrimaryLink[] = [
    {
      text: 'Home',
      id: 'home',
      path: 'home',
      selected: true,
    },
  ];

  constructor(
    private router: Router,
  ) { }


  ngOnInit() {
    const initRouteSubscription = this.router.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        const url = data.url.split('/')[1];
        const selectedNavLink = this.navigationLinks.find(nav => nav.path === url);
        if (selectedNavLink) {
          this.usaHeader.selectNavItem(selectedNavLink);
        } else {
          this.usaHeader.selectNavItem(this.navigationLinks[0]);
        }
        initRouteSubscription.unsubscribe();
      }
    })
  }

  onLinkClicked(link: UsaHeaderPrimaryLink) {
    this.router.navigate([link.path]);
  }
}