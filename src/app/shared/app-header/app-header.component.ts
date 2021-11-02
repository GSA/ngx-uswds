import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";
import { UsaHeaderPrimaryLink } from "uswds-components";


@Component({
  selector: `usa-app-header`,
  templateUrl: './app-header.component.html',
})
export class UsaAppHeaderComponent {

  @Output() tab = new EventEmitter<string>();
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
      route: 'accordion',
    },
    {
      text: 'Formly',
      id: 'formly',
      route: 'input',
    },
  ];

  constructor(
    private router: Router,
  ) { }

  onLinkClicked(link: UsaHeaderPrimaryLink) {
    this.tab.emit(link.id);
    this.router.navigate([link.route]);
  }
}