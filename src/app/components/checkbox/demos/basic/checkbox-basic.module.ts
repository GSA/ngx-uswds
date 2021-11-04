import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UsaCheckboxModule } from "uswds-components";
import { CheckboxBasicComponent } from "./checkbox-basic.component";


@NgModule({
  imports: [
    CommonModule,
    UsaCheckboxModule,
    FormsModule,
  ],
  declarations: [
    CheckboxBasicComponent
  ],
  exports: [
    CheckboxBasicComponent
  ]
})
export class CheckboxBasicModule {}
