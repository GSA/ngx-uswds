import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { USWDSAlertModule } from "uswds-components";
import { AlertComponent } from "./alert.component";


@NgModule({
  imports: [
    CommonModule,
    USWDSAlertModule
  ],
  declarations: [
    AlertComponent
  ],
  exports: [
    AlertComponent
  ]
})
export class AlertModule {}
