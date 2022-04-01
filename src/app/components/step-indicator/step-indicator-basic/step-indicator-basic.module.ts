import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaStepIndicatorModule } from "@gsa-sam/ngx-uswds";
import { StepIndicatorBasicComponent } from "./step-indicator-basic.component";


@NgModule({
  imports: [
    CommonModule,
    UsaStepIndicatorModule
  ],
  declarations: [
    StepIndicatorBasicComponent
  ],
  exports: [
    StepIndicatorBasicComponent
  ]
})
export class StepIndicatorBasicModule {}
