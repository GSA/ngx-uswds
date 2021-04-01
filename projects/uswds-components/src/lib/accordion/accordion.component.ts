import { AfterViewInit, ChangeDetectorRef, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { USWDSAccordionItemComponent } from './accordion-item.component';

@Component({
  selector: 'uswds-accordion',
  templateUrl: './accordion.component.html',
})
export class USWDSAccordionComponent implements AfterViewInit{

  @ContentChildren(USWDSAccordionItemComponent) accordionItems: QueryList<USWDSAccordionItemComponent>;

  @Input() isMultiSelectable = false;
  @Input() isBordered: boolean = true;


  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  onAccordionClicked(accordion: USWDSAccordionItemComponent) {

    accordion.expanded = !accordion.expanded;

    if (this.isMultiSelectable || !accordion.expanded) {
      return;
    }

    this.accordionItems.forEach(accordion => accordion.expanded = false);
    accordion.expanded = true;
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
