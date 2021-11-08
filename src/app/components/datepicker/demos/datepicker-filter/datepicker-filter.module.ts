import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerFilterComponent } from './datepicker-filter.component';
import { UsaDatePickerModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [DatepickerFilterComponent],
  imports: [
    CommonModule,
    UsaDatePickerModule,
  ],
  exports: [DatepickerFilterComponent]
})
export class DatepickerFilterModule { }
