import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { USWDSButtonModule } from "uswds-components";
import { ButtonComponent } from "./button.component";


@NgModule({
  imports: [
    CommonModule,
    USWDSButtonModule
  ],
  declarations: [
    ButtonComponent
  ],
  exports: [
    ButtonComponent
  ]
})
export class ButtonModule {}
