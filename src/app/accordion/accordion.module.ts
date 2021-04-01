import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { USWDSAccordionModule } from "uswds-components";
import { AccordionComponent } from "./accordion.component";

@NgModule({
  imports: [
    CommonModule,
    USWDSAccordionModule
  ],
  declarations: [
    AccordionComponent
  ],
  exports: [
    AccordionComponent
  ]
})
export class AccordionModule {}
