import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UsaHeaderPrimaryLink } from "uswds-components";


@Component({
  selector: `usa-app-header`,
  templateUrl: './app-header.component.html',
})
export class UsaAppHeaderComponent {
  navigationLinks: UsaHeaderPrimaryLink[] = [
    {
      text: 'Home',
      id: 'home',
      route: 'accordion',
      selected: true,
    },
    {
      text: 'Components',
      id: 'components',
    },
    {
      text: 'Formly',
      id: 'formly',
    },
  ];

  constructor(
    private router: Router,
  ) {}

  onLinkClicked(link: UsaHeaderPrimaryLink) {
    if (link.id === 'home') {
      this.router.navigate([link.route]);
    }
  }
}