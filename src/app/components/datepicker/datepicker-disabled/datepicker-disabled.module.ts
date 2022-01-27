import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerDisabledComponent } from './datepicker-disabled.component';
import { UsaDatePickerModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [DatepickerDisabledComponent],
  imports: [
    CommonModule,
    UsaDatePickerModule,
  ],
  exports: [DatepickerDisabledComponent]
})
export class DatepickerDisabledModule { }
