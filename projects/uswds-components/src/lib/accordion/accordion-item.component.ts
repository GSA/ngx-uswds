import { Component, Input, TemplateRef, ViewChild } from "@angular/core";


/**
 * Wrapper class to house the properties of each accordion items.
 */
@Component({
  selector: `uswds-accordion-item`,
  template: `
    <ng-template #itemHeaderTemplate>
    <ng-content select="uswds-accordion-header"></ng-content>
    </ng-template>
    <ng-template #itemContentTemplate>
      <ng-content select="uswds-accordion-content"></ng-content>
    </ng-template>
  `
})
export class USWDSAccordionItemComponent {
  @ViewChild('itemHeaderTemplate') itemHeaderTemplate: TemplateRef<any>;
  @ViewChild('itemContentTemplate') itemContentTemplate: TemplateRef<any>;

  @Input() expanded = false;
  @Input() id: string;
}