import { Component, ViewChild } from '@angular/core';
import { UsaAccordionComponent } from '@gsa-sam/ngx-uswds';

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
