import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { USWDSAccordionContent } from "./accordion-content.directive";
import { USWDSAccordionHeader } from "./accordion-header.directive";
import { USWDSPanel } from "./accordion-panel.directive";
import { USWDSAccordionTitle } from "./accordion-title.directive";
import { USWDSAccordionToggle } from "./accordion-toggle.directive";
import { USWDSAccordionComponent } from "./accordion.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    USWDSAccordionComponent,
    USWDSAccordionHeader,
    USWDSAccordionContent,
    USWDSAccordionTitle,
    USWDSAccordionToggle,
    USWDSPanel
  ],
  exports: [
    USWDSAccordionComponent,
    USWDSAccordionHeader,
    USWDSAccordionContent,
    USWDSAccordionTitle,
    USWDSAccordionToggle,
    USWDSPanel
  ]
})
export class USWDSAccordionModule {}
