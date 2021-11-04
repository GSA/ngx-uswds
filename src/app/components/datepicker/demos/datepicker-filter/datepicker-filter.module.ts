import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerFilterComponent } from './datepicker-filter.component';
import { UsaDatePickerModule } from 'uswds-components';



@NgModule({
  declarations: [DatepickerFilterComponent],
  imports: [
    CommonModule,
    UsaDatePickerModule,
  ],
  exports: [DatepickerFilterComponent]
})
export class DatepickerFilterModule { }
