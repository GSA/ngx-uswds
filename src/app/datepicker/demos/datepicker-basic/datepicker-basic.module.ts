import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerBasicComponent } from './datepicker-basic.component';
import { UsaDatepickerModule } from 'uswds-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DatepickerBasicComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsaDatepickerModule,
  ],
  exports: [DatepickerBasicComponent]
})
export class DatepickerBasicModule { }
