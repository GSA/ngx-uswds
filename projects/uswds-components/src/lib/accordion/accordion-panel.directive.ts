import { AfterContentChecked, ContentChildren, Directive, EventEmitter, Input, Output, QueryList } from "@angular/core";
import { USWDSAccordionContent } from "./accordion-content.directive";
import { USWDSAccordionHeader } from "./accordion-header.directive";
import { USWDSAccordionTitle } from "./accordion-title.directive";
let nextId = 0;

/**
 * A directive that wraps an individual accordion panel with title and collapsible content.
 */
 @Directive({selector: 'uswds-panel'})
 export class USWDSPanel implements AfterContentChecked {
   /**
    *  If `true`, the panel is disabled an can't be toggled.
    */
   @Input() disabled = false;
 
   /**
    *  An optional id for the panel that must be unique on the page.
    *
    *  If not provided, it will be auto-generated in the `uswds-panel-xxx` format.
    */
   @Input() id = `uswds-panel-${nextId++}`;
 
   isOpen = false;
 
   /* A flag to specified that the transition panel classes have been initialized */
   initClassDone = false;
 
   /* A flag to specified if the panel is currently being animated, to ensure its presence in the dom */
   transitionRunning = false;
 
   /**
    *  The panel title.
    *
    *  You can alternatively use [`NgbPanelTitle`] to set panel title.
    */
   @Input() title: string;
 
   /**
    * Type of the current panel.
    *
    * Bootstrap provides styles for the following types: `'success'`, `'info'`, `'warning'`, `'danger'`, `'primary'`,
    * `'secondary'`, `'light'` and `'dark'`.
    */
   @Input() type: string;
 
   /**
    * An optional class applied to the accordion card element that wraps both panel title and content.
    *
    * @since 5.3.0
    */
   @Input() cardClass: string;
 
   /**
    * An event emitted when the panel is shown, after the transition. It has no payload.
    *
    * @since 8.0.0
    */
   @Output() shown = new EventEmitter<void>();
 
   /**
    * An event emitted when the panel is hidden, after the transition. It has no payload.
    *
    * @since 8.0.0
    */
   @Output() hidden = new EventEmitter<void>();
 
 
   titleTpl: USWDSAccordionTitle;
   headerTpl: USWDSAccordionHeader;
   contentTpl: USWDSAccordionContent;
 
   @ContentChildren(USWDSAccordionTitle, {descendants: false}) titleTpls: QueryList<USWDSAccordionTitle>;
   @ContentChildren(USWDSAccordionHeader, {descendants: false}) headerTpls: QueryList<USWDSAccordionHeader>;
   @ContentChildren(USWDSAccordionContent, {descendants: false}) contentTpls: QueryList<USWDSAccordionContent>;
 
   ngAfterContentChecked() {
     // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
     // only @ContentChildren allows us to specify the {descendants: false} option.
     // Without {descendants: false} there are issues when accordions are wrapped inside accordions
     this.titleTpl = this.titleTpls.first;
     this.headerTpl = this.headerTpls.first;
     this.contentTpl = this.contentTpls.first;
   }
 }