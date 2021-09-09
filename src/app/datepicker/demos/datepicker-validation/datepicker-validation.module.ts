import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerValidationComponent } from './datePicker-validation.component';
import { UsaDatePickerModule } from 'uswds-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DatePickerValidationComponent],
  imports: [
    CommonModule,
    UsaDatePickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [DatePickerValidationComponent]
})
export class DatePickerValidationModule { }
