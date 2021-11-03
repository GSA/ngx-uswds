import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaCheckboxModule, UsaTableModule } from "uswds-components";
import { CheckboxFooterComponent } from "./checkbox-footer.component";


@NgModule({
  imports: [
    CommonModule,
    UsaCheckboxModule,
    UsaTableModule,
  ],
  declarations: [
    CheckboxFooterComponent,
  ],
  exports: [
    CheckboxFooterComponent
  ]
})
export class CheckboxFooterModule {}
