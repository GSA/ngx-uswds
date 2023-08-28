import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  UsaAccordionContent,
  UsaAccordionHeader,
  UsaAccordionItem
} from "./accordion-items";
import { UsaAccordionComponent, UsaAccordionToggle } from "./accordion.component";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    UsaAccordionComponent,
    UsaAccordionHeader,
    UsaAccordionContent,
    UsaAccordionToggle,
    UsaAccordionItem
  ],
  exports: [
    UsaAccordionComponent,
    UsaAccordionHeader,
    UsaAccordionContent,
    UsaAccordionToggle,
    UsaAccordionItem
  ]
})
export class UsaAccordionModule {}
