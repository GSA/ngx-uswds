import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionFooterComponent } from './accordion-footer.component';
import { USWDSCardModule } from 'uswds-components';



@NgModule({
  declarations: [AccordionFooterComponent],
  imports: [
    CommonModule,
    USWDSCardModule
  ]
})
export class AccordionFooterModule { }
