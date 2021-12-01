import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UsaAffixModule } from "@gsa-sam/ngx-uswds";
import { InputPrefixComponent } from "./input-prefix.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsaAffixModule
  ],
  declarations: [
    InputPrefixComponent
  ],
  exports: [
    InputPrefixComponent
  ]
})
export class InputPrefixModule { }
