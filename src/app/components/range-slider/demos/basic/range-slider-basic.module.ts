import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsaRangeSliderModule } from '@gsa-sam/ngx-uswds';
import { RangeSliderBasicComponent } from "./range-slider-basic.component";


@NgModule({
  imports: [
    CommonModule,
    UsaRangeSliderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RangeSliderBasicComponent
  ],
  exports: [
    RangeSliderBasicComponent
  ]
})
export class RangeSliderBasicModule { }
