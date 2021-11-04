import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndicatorDisableAllStepsComponent } from './step-indicator-disable-all-steps.component';
import { UsaStepIndicatorModule } from 'uswds-components';



@NgModule({
  declarations: [StepIndicatorDisableAllStepsComponent],
  imports: [
    CommonModule,
    UsaStepIndicatorModule,
  ],
  exports: [StepIndicatorDisableAllStepsComponent]
})
export class StepIndicatorDisableAllStepsModule { }
