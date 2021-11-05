import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndicatorCenterCountersComponent } from './step-indicator-center-counters.component';
import { UsaStepIndicatorModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [StepIndicatorCenterCountersComponent],
  imports: [
    CommonModule,
    UsaStepIndicatorModule,
  ],
  exports: [StepIndicatorCenterCountersComponent]
})
export class StepIndicatorCenterCountersModule { }
