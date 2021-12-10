import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UsaAffixModule } from "@gsa-sam/ngx-uswds";
import { InputSuffixComponent } from "./input-suffix.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsaAffixModule
  ],
  declarations: [
    InputSuffixComponent
  ],
  exports: [
    InputSuffixComponent
  ]
})
export class InputSuffixModule { }
