import { Component } from '@angular/core';
import { UsaAccordionChangeEvent } from 'uswds-components';

@Component({
  selector: 'usa-prevent-toggle',
  templateUrl: './prevent-toggle.component.html',
})
export class PreventToggleComponent {

  beforePanelChange($event: UsaAccordionChangeEvent) {
    if ($event.panelId === 'panelToggle2') {
      $event.preventDefault();
    } else if ($event.panelId === 'panelToggle3' && $event.nextState == false) {
      $event.preventDefault();
    }
  }
}
