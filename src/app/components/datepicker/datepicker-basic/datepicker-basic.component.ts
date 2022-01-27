import { Component } from "@angular/core";

@Component({
  selector: 'datepicker-basic',
  templateUrl: './datepicker-basic.component.html'
})
export class DatepickerBasicComponent {
  
  calendarOpen() {
    console.log('Calendar Open')
  }

  calendarClosed() {
    console.log('Calendar Closed');
  }
}
