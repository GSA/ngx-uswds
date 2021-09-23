import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndicatorFooterComponent } from './step-indicator-footer.component';
import { UsaTableModule } from 'uswds-components';



@NgModule({
  declarations: [StepIndicatorFooterComponent],
  imports: [
    CommonModule,
    UsaTableModule,
  ],
  exports: [StepIndicatorFooterComponent]
})
export class StepIndicatorFooterModule { }
