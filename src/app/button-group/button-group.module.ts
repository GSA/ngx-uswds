import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { USWDSButtonGroupModule } from "uswds-components";
import { ButtonGroupComponent } from "./button-group.component";


@NgModule({
  imports: [
    CommonModule,
    USWDSButtonGroupModule
  ],
  declarations: [
    ButtonGroupComponent
  ],
  exports: [
    ButtonGroupComponent
  ]
})
export class ButtonGroupModule {}
