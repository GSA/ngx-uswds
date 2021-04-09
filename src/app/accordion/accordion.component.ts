import { Component, ViewChild } from '@angular/core';
import { UsaAccordionComponent, UsaPanel, UsaPanelChangeEvent } from 'projects/uswds-components/src/public-api';

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

  beforePanelChange($event: UsaPanelChangeEvent) {
    if ($event.panelId === 'panelToggle2') {
      $event.preventDefault();
    } else if ($event.panelId === 'panelToggle3' && $event.nextState == false) {
      $event.preventDefault();
    }
  }
}
