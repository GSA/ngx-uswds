import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { USWDSButtonGroupItemComponent } from "./button-group-item.component";
import { USWDSButtonGroupComponent } from "./button-group.component";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    USWDSButtonGroupComponent,
    USWDSButtonGroupItemComponent
  ],
  exports: [
    USWDSButtonGroupComponent,
    USWDSButtonGroupItemComponent,
  ]
})
export class USWDSButtonGroupModule {};
