import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndicatorSubstepsComponent } from './step-indicator-substeps.component';
import { UsaStepIndicatorModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [
    StepIndicatorSubstepsComponent
  ],
  imports: [
    CommonModule,
    UsaStepIndicatorModule,
  ],
  exports: [
    StepIndicatorSubstepsComponent
  ]
})
export class StepIndicatorSubstepsModule { }
