import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { 
  UsaAccordionContent, 
  UsaAccordionHeader, 
  UsaPanel
} from "./accordion-items";
import { UsaAccordionToggle } from "./accordion-toggle.directive";
import { UsaAccordionComponent } from "./accordion.component";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    UsaAccordionComponent,
    UsaAccordionHeader,
    UsaAccordionContent,
    UsaAccordionToggle,
    UsaPanel
  ],
  exports: [
    UsaAccordionComponent,
    UsaAccordionHeader,
    UsaAccordionContent,
    UsaAccordionToggle,
    UsaPanel
  ]
})
export class UsaAccordionModule {}