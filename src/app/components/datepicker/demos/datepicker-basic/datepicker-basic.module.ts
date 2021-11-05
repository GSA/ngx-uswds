import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerBasicComponent } from './datePicker-basic.component';
import { UsaDatePickerModule } from '@gsa-sam/ngx-uswds';

@NgModule({
  declarations: [DatePickerBasicComponent],
  imports: [
    CommonModule,
    UsaDatePickerModule,
  ],
  exports: [DatePickerBasicComponent]
})
export class DatePickerBasicModule { }
