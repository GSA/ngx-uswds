import { Component } from '@angular/core';

@Component({
  selector: 'usa-date-picker-basic',
  templateUrl: './datepicker-basic.component.html',
})
export class DatePickerBasicComponent {
  log($event) {
    console.log($event);
  }
}
