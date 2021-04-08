import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaStepIndicatorComponent } from './step-indicator.component';
import { UsaStepIndicatorHeaderComponent } from './step-indicator-header.component';



@NgModule({
  declarations: [
    UsaStepIndicatorComponent,
    UsaStepIndicatorHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UsaStepIndicatorComponent,
    UsaStepIndicatorHeaderComponent
  ]
})
export class UsaStepIndicatorModule { }
