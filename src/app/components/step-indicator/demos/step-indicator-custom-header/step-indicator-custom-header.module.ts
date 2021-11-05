import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndicatorCustomHeaderComponent } from './step-indicator-custom-header.component';
import { UsaStepIndicatorModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [StepIndicatorCustomHeaderComponent],
  imports: [
    CommonModule,
    UsaStepIndicatorModule,
  ],
  exports: [StepIndicatorCustomHeaderComponent]
})
export class StepIndicatorCustomHeaderModule { }
