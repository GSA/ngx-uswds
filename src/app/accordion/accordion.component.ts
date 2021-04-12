import { Component, ViewChild } from '@angular/core';
import { UsaAccordionComponent, UsaAccordionChangeEvent } from 'projects/uswds-components/src/public-api';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {

  @ViewChild('dynamicAccordion') accordion: UsaAccordionComponent;

  toggleAccordion(id: string) {
    this.accordion.toggle(id);
  }

  beforePanelChange($event: UsaAccordionChangeEvent) {
    if ($event.panelId === 'panelToggle2') {
      $event.preventDefault();
    } else if ($event.panelId === 'panelToggle3' && $event.nextState == false) {
      $event.preventDefault();
    }
  }
}
