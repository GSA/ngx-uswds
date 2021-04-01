import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { USWDSCheckboxModule } from "uswds-components";
import { CheckboxComponent } from "./checkbox.component";


@NgModule({
  imports: [
    CommonModule,
    USWDSCheckboxModule
  ],
  declarations: [
    CheckboxComponent
  ],
  exports: [
    CheckboxComponent
  ]
})
export class CheckboxModule {}
