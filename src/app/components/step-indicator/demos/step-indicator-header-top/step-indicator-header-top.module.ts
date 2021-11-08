import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndicatorHeaderTopComponent } from './step-indicator-header-top.component';
import { UsaStepIndicatorModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [StepIndicatorHeaderTopComponent],
  imports: [
    CommonModule,
    UsaStepIndicatorModule,
  ],
  exports: [StepIndicatorHeaderTopComponent]
})
export class StepIndicatorHeaderTopModule { }
