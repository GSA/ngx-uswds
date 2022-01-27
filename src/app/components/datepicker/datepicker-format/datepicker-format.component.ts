import { Component } from '@angular/core';
import { UsaDateFormats, USA_DATE_FORMATS, USA_NATIVE_DATE_FORMATS } from '@gsa-sam/ngx-uswds';

/** Define custom format here - This example overrides just the date input while keeping other values default */
export const UsaDemoFormat: UsaDateFormats = {
  ...USA_NATIVE_DATE_FORMATS,
  display: {
    ...USA_NATIVE_DATE_FORMATS.display,
    dateInput: { year: 'numeric', month: 'long', day: '2-digit' }
  }
};

@Component({
  selector: 'datepicker-format',
  templateUrl: './datepicker-format.component.html',
  providers: [
    { provide: USA_DATE_FORMATS, useValue: UsaDemoFormat }
  ]
})
export class DatepickerFormatComponent { }
