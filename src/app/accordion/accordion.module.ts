import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaAccordionModule } from "uswds-components";
import { AccordionComponent } from "./accordion.component";

@NgModule({
  imports: [
    CommonModule,
    UsaAccordionModule
  ],
  declarations: [
    AccordionComponent
  ],
  exports: [
    AccordionComponent
  ]
})
export class AccordionModule {}
