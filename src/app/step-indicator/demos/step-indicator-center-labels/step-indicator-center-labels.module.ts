import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndicatorCenterLabelsComponent } from './step-indicator-center-labels.component';
import { UsaStepIndicatorModule } from 'uswds-components';



@NgModule({
  declarations: [StepIndicatorCenterLabelsComponent],
  imports: [
    CommonModule,
    UsaStepIndicatorModule,
  ],
  exports: [StepIndicatorCenterLabelsComponent]
})
export class StepIndicatorCenterLabelsModule { }
