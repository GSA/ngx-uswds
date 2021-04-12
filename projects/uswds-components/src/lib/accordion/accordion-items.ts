import { 
  AfterContentChecked, 
  ContentChildren, 
  Directive, 
  EventEmitter, 
  Input, 
  Output, 
  QueryList, 
  TemplateRef } from "@angular/core";

let nextId = 0;


/**
 * An event emitted right before toggling an accordion panel.
 */
 export interface UsaAccordionChangeEvent {
  /**
   * The id of the accordion panel being toggled.
   */
  panelId: string;

  /**
   * The next state of the panel.
   *
   * `true` if it will be opened, `false` if closed.
   */
  nextState: boolean;

  /**
   * Calling this function will prevent panel toggling.
   */
  preventDefault: () => void;
}

/**
 * A directive that wraps the accordion panel content.
 */
@Directive({ selector: 'ng-template[UsaAccordionContent]' })
export class UsaAccordionContent {
  constructor(public templateRef: TemplateRef<any>) { }
}

/**
 * A directive that wraps the accordion header content.
 */
@Directive({ 
  selector: 'ng-template[UsaAccordionHeader]',
})
export class UsaAccordionHeader {
  constructor(public templateRef: TemplateRef<any>) { }
}

/**
 * A directive that wraps an individual accordion panel with title and collapsible content.
 */
@Directive({ selector: 'usa-accordion-item' })
export class UsaAccordionItem implements AfterContentChecked {
  /**
   *  If `true`, the panel is disabled an can't be toggled.
   */
  @Input() disabled = false;

  /**
   *  An optional id for the panel that must be unique on the page.
   *
   *  If not provided, it will be auto-generated in the `usa-panel-xxx` format.
   */
  @Input() id = `usa-accordion-item-${nextId++}`;

  isOpen = false;

  /* A flag to specified that the transition panel classes have been initialized */
  initClassDone = false;

  /**
   *  The panel header.
   */
  @Input() header: string;


  /**
   * An optional class applied to the accordion card element that wraps both panel title and content.
   *
   * @since 5.3.0
   */
  @Input() cardClass: string;

  /**
   * Defines the aria label for accordion header button. Generally if the header is a text, then this is
   * not needed as screen readers can announce the text. However, if the header is a custom template
   * with items that screen readers cannot compute (icons / images), then having a descriptive label can
   * help
   */
  @Input() ariaLabel: string;

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


  headerTpl: UsaAccordionHeader;
  contentTpl: UsaAccordionContent;

  @ContentChildren(UsaAccordionHeader, { descendants: false }) headerTpls: QueryList<UsaAccordionHeader>;
  @ContentChildren(UsaAccordionContent, { descendants: false }) contentTpls: QueryList<UsaAccordionContent>;

  ngAfterContentChecked() {
    // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
    // only @ContentChildren allows us to specify the {descendants: false} option.
    // Without {descendants: false} there are issues when accordions are wrapped inside accordions
    this.headerTpl = this.headerTpls.first;
    this.contentTpl = this.contentTpls.first;
  }
}