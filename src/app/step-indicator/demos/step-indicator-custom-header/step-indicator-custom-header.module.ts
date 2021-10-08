import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndicatorCustomHeaderComponent } from './step-indicator-custom-header.component';
import { UsaStepIndicatorModule } from 'uswds-components';



@NgModule({
  declarations: [StepIndicatorCustomHeaderComponent],
  imports: [
    CommonModule,
    UsaStepIndicatorModule,
  ],
  exports: [StepIndicatorCustomHeaderComponent]
})
export class StepIndicatorCustomHeaderModule { }
