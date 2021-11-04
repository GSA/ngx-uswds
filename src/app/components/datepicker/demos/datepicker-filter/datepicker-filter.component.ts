import { Component } from '@angular/core';

@Component({
  selector: 'usa-datepicker-filter',
  templateUrl: './datepicker-filter.component.html',
})
export class DatepickerFilterComponent {

  weekdaysOnlyFilter(value: Date) {
    if (!value) {
      return;
    }
    const day = value.getDay();

    // Saturday corresponds to day 6 and Sunday to day 0
    return day != 0 && day != 6;
  }

}
