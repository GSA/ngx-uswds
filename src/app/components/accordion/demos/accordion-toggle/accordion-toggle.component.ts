import { Component, ViewChild } from '@angular/core';
import { UsaAccordionComponent } from 'uswds-components';

@Component({
  selector: 'usa-accordion-toggle',
  templateUrl: './accordion-toggle.component.html',
})
export class AccordionToggleComponent {

  @ViewChild('dynamicAccordion') accordion: UsaAccordionComponent;

  toggleAccordion(id: string) {
    this.accordion.toggle(id);
  }
}
