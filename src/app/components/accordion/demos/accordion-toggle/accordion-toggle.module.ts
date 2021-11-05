import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionToggleComponent } from './accordion-toggle.component';
import { UsaAccordionModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [
    AccordionToggleComponent
  ],
  imports: [
    CommonModule,
    UsaAccordionModule,
  ],
  exports: [
    AccordionToggleComponent,
  ]
})
export class AccordionToggleModule { }
