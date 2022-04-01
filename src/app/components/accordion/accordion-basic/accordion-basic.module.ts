import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaAccordionModule } from "@gsa-sam/ngx-uswds";
import { AccordionBasicComponent } from "./accordion-basic.component";


@NgModule({
  imports: [CommonModule, UsaAccordionModule],
  declarations: [AccordionBasicComponent],
  exports: [AccordionBasicComponent],
})
export class AccordionBasicModule {}
