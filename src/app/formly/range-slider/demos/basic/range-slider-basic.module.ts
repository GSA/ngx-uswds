import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";
import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
import { FormlyBasicRangeSliderComponent } from './range-slider-basic.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    UsaFormlyModule
  ],
  declarations: [
    FormlyBasicRangeSliderComponent
  ],
  exports: [
    FormlyBasicRangeSliderComponent
  ]
})
export class FormlyBasicRangeSliderModule { }
