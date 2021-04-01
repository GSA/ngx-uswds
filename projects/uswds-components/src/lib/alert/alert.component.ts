import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uswds-alert',
  templateUrl: './alert.component.html',
})
export class USWDSAlertComponent implements OnInit {

  @Input() alertType: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
  @Input() displayIcon = true;
  @Input() isSlim = false;
  @Input() role: string;

  alertClass: string;

  constructor() { }

  ngOnInit(): void {
    this.alertClass = this.getAlertClass();
  }

  getAlertClass() {
    switch(this.alertType) {
      case 'INFO':
        return 'usa-alert--info'
      case 'WARNING':
        return 'usa-alert--warning'
      case 'ERROR':
        return 'usa-alert--error';
      case 'SUCCESS':
        return 'usa-alert--success';
      default:
        return 'usa-alert--info';
    }
  }
}
