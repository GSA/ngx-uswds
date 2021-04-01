import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { USWDSDateInputModule } from "uswds-components";
import { DateInputComponent } from "./date-input.component";


@NgModule({
  imports: [
    CommonModule,
    USWDSDateInputModule
  ],
  declarations: [
    DateInputComponent
  ],
  exports: [
    DateInputComponent
  ]
})
export class DateInputModule {}
