import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndicatorComponent } from './step-indicator.component';
import { UsaStepIndicatorModule, USWDSCardModule } from 'uswds-components';

@NgModule({
  declarations: [StepIndicatorComponent],
  imports: [
    CommonModule,
    UsaStepIndicatorModule,
    USWDSCardModule,
  ],
  exports: [
    StepIndicatorComponent
  ]
})
export class StepIndicatorModule { }
