import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaAccordionModule } from "uswds-components";
import { AccordionMultiSelectComponent } from "./accordion-multi-select.component";


@NgModule({
  imports: [
    CommonModule,
    UsaAccordionModule,
  ],
  declarations: [
    AccordionMultiSelectComponent
  ],
  exports: [
    AccordionMultiSelectComponent
  ]
})
export class AccordionMultiSelectModule {}
