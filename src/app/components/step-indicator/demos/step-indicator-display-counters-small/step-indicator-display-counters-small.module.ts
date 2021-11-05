import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndicatorDisplayCountersSmallComponent } from './step-indicator-display-counters-small.component';
import { UsaStepIndicatorModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [StepIndicatorDisplayCountersSmallComponent],
  imports: [
    CommonModule,
    UsaStepIndicatorModule,
  ],
  exports: [StepIndicatorDisplayCountersSmallComponent]
})
export class StepIndicatorDisplayCountersSmallModule { }
