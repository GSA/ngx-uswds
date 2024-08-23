import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaAccordionModule } from "@gsa-sam/ngx-uswds";
import { AccordionMultipleComponent } from "./accordion-multiple.component";

@NgModule({
  imports: [CommonModule, UsaAccordionModule],
  declarations: [AccordionMultipleComponent],
  exports: [AccordionMultipleComponent],
})
export class AccordionMultipleModule {}
