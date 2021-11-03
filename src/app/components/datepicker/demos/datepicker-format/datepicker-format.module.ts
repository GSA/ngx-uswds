import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerFormatComponent } from './datepicker-format.component';
import { UsaDateFormats, UsaDatePickerModule, USA_DATE_FORMATS, USA_NATIVE_DATE_FORMATS } from 'uswds-components';


@NgModule({
  declarations: [DatepickerFormatComponent],
  imports: [
    CommonModule,
    UsaDatePickerModule,
  ],
  exports: [DatepickerFormatComponent]
})
export class DatepickerFormatModule { }
