import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UsaAffixModule } from "@gsa-sam/ngx-uswds";
import { InputPrefixAndSuffixComponent } from "./input-prefix-and-suffix.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsaAffixModule
  ],
  declarations: [
    InputPrefixAndSuffixComponent
  ],
  exports: [
    InputPrefixAndSuffixComponent
  ]
})
export class InputPrefixAndSuffixModule { }
