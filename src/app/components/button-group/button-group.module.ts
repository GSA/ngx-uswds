import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { USWDSButtonGroupModule } from "@gsa-sam/ngx-uswds";
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
export class ButtonGroupModule { }
