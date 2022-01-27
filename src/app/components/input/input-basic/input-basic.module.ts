import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaAffixModule } from "@gsa-sam/ngx-uswds";
import { InputBasicComponent } from "./input-basic.component";


@NgModule({
  imports: [
    CommonModule,
    UsaAffixModule,
  ],
  declarations: [
    InputBasicComponent
  ],
  exports: [
    InputBasicComponent
  ]
})
export class InputBasicModule { }
