import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndicatorDisableAllStepsComponent } from './step-indicator-disable-all-steps.component';
import { UsaStepIndicatorModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [StepIndicatorDisableAllStepsComponent],
  imports: [
    CommonModule,
    UsaStepIndicatorModule,
  ],
  exports: [StepIndicatorDisableAllStepsComponent]
})
export class StepIndicatorDisableAllStepsModule { }
