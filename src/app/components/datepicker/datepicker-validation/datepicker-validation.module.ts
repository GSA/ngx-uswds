import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerValidationComponent } from './datepicker-validation.component';
import { UsaDatePickerModule } from '@gsa-sam/ngx-uswds';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DatePickerValidationComponent],
  imports: [
    CommonModule,
    UsaDatePickerModule,
    FormsModule,
  ],
  exports: [DatePickerValidationComponent]
})
export class DatepickerValidationModule { }
