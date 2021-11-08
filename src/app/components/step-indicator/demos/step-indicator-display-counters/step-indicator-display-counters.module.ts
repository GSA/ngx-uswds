import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndicatorDisplayCountersComponent } from './step-indicator-display-counters.component';
import { UsaStepIndicatorModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [
    StepIndicatorDisplayCountersComponent
  ],
  imports: [
    CommonModule,
    UsaStepIndicatorModule,
  ],
  exports: [
    StepIndicatorDisplayCountersComponent
  ]
})
export class StepIndicatorDisplayCountersModule { }
