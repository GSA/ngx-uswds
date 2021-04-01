import { Directive, Host, Input, Optional } from "@angular/core";
import { USWDSPanel } from "./accordion-panel.directive";
import { USWDSAccordionComponent } from "./accordion.component";

/**
 * A directive to put on a button that toggles panel opening and closing.
 *
 * To be used inside the [`NgbPanelHeader`](#/components/accordion/api#NgbPanelHeader)
 *
 * @since 4.1.0
 */
 @Directive({
    selector: 'button[USWDSAccordionToggle]',
    host: {
      'type': 'button',
      '[disabled]': 'panel.disabled',
      '[class.collapsed]': '!panel.isOpen',
      '[attr.aria-expanded]': 'panel.isOpen',
      '[attr.aria-controls]': 'panel.id',
      '(click)': 'accordion.toggle(panel.id)',
    }
  })
  export class USWDSAccordionToggle {
    static ngAcceptInputType_USWDSAccordionToggle: USWDSPanel | '';
  
    @Input()
    set USWDSAccordionToggle(panel: USWDSPanel) {
      if (panel) {
        this.panel = panel;
      }
    }
  
    constructor(public accordion: USWDSAccordionComponent, @Optional() @Host() public panel: USWDSPanel) {}
}