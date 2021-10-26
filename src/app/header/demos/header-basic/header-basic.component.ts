import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderModel } from 'projects/uswds-components/src/lib/header/header.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'usa-header-basic',
  templateUrl: './header-basic.component.html',
  styles: [
  ]
})
export class HeaderBasicComponent implements OnInit {

  constructor(private locationStrategy: LocationStrategy) {}

  public linkEvent = new BehaviorSubject<object>(null);

  modelHeader: HeaderModel = {
    secondaryLinks: [
      {
        imageClass: 'request',
        text: 'Requests',
        route: '/',
        id: 'request',
        hasCounter: true,
        selected: true,
        mode: 0
      },
      {
        imageClass: 'messages',
        text: 'Notifications',
        route: '/',
        id: 'messages',
        mode: 0
      },
      {
        imageClass: 'workspace',
        text: 'Workspace',
        route: '/',
        id: 'workspace',
        mode: 0
      },
      {
        imageClass: 'log-out',
        text: 'Sign Out',
        route: '/',
        id: 'signOut',
        mode: 0
      }
    ],
    navigationLinks: [
      {
        text: 'Home',
        selected: true,
        route: '/',
        id: 'home',
        mode: 0
      },
      {
        text: 'Search',
        route: '/',
        id: 'search',
        mode: 0
      },
      {
        text: 'Databank',
        route: '/',
        id: 'databank',
        mode: 0
      },
      {
        text: 'Data Services',
        route: '/',
        id: 'dataService',
        mode: 0
      },
      { text: 'Help', route: '/', id: 'help', mode: 0 }
    ],
    home: {
      text: 'Logo',
      logo: this.locationStrategy.getBaseHref() + 'assets/img/logo-sam.svg',
      route: '/',
      id: 'home',
      mode: 0
    }
  };

  ngOnInit() {
    this.linkEvent.subscribe(value => {
      console.log('Link Event Clicked Change');
      console.log(value);
    });
  }
}
