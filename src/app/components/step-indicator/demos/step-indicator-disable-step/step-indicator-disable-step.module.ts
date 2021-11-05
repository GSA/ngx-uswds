import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndicatorDisableStepComponent } from './step-indicator-disable-step.component';
import { UsaStepIndicatorModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [StepIndicatorDisableStepComponent],
  imports: [
    CommonModule,
    UsaStepIndicatorModule,
  ],
  exports: [StepIndicatorDisableStepComponent]
})
export class StepIndicatorDisableStepModule { }
