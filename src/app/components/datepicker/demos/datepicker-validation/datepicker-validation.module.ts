import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerValidationComponent } from './datePicker-validation.component';
import { UsaDatePickerModule } from 'uswds-components';
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
export class DatePickerValidationModule { }
