import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { USWDSAlertComponent } from "./alert.component";
import { USWDSAlertHeaderComponent } from "./alert-header.component";
import { USWDSAlertTextComponent } from "./alert-text.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    USWDSAlertComponent,
    USWDSAlertHeaderComponent,
    USWDSAlertTextComponent
  ],
  exports: [
    USWDSAlertComponent,
    USWDSAlertHeaderComponent,
    USWDSAlertTextComponent
  ]
})
export class USWDSAlertModule {}
