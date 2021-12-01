import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UsaAffixModule } from "@gsa-sam/ngx-uswds";
import { InputBasicComponent } from "./input-basic.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsaAffixModule
  ],
  declarations: [
    InputBasicComponent
  ],
  exports: [
    InputBasicComponent
  ]
})
export class InputBasicModule { }
