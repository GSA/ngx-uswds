import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaStepIndicatorComponent, UsaStepIndicatorHeaderComponent } from './step-indicator.component';



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
