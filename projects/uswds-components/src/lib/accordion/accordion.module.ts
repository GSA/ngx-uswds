import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { USWDSAccordionContentComponent } from "./accordion-content.component";
import { USWDSAccordionHeaderComponent } from "./accordion-header.component";
import { USWDSAccordionItemComponent } from "./accordion-item.component";
import { USWDSAccordionComponent } from "./accordion.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    USWDSAccordionComponent,
    USWDSAccordionItemComponent,
    USWDSAccordionHeaderComponent,
    USWDSAccordionContentComponent,
  ],
  exports: [
    USWDSAccordionComponent,
    USWDSAccordionItemComponent,
    USWDSAccordionHeaderComponent,
    USWDSAccordionContentComponent,
  ]
})
export class USWDSAccordionModule {}
