import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'usa-datepicker-validation',
  templateUrl: './datepicker-validation.component.html',
})
export class DatePickerValidationComponent {

  minDateModel: Date;
  maxDateModel: Date;
  validationModel: Date;

  constructor() { }

  isInvalid(datePickerValidation: NgModel) {
    return datePickerValidation.invalid && (datePickerValidation.dirty || datePickerValidation.touched);
  }
}
