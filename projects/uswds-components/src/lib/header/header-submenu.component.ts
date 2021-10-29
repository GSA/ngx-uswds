import { 
  Component, ElementRef, EventEmitter, HostListener, 
  Input, Output, TemplateRef, ViewChild, ViewContainerRef, ViewRef 
} from "@angular/core";

let submenuId = 0;

@Component({
  selector: `button[usaHeaderSubmenu]`,
  host: {
    class: `usa-accordion__button usa-nav__link`,
    '[attr.aria-expanded]': 'selected',
    '[attr.aria-controls]': 'id', 
    '(click)': 'onClick()',
  },
  template: `
    <span><ng-content></ng-content></span>
    <ng-template #submenuView>
      <div class="usa-nav__submenu" [ngClass]="{'usa-megamenu': isMegamenu}">
        <ng-container [ngTemplateOutlet]="content"></ng-container>
      </div>
    </ng-template>
  `
})
export class UsaHeaderSubmenuButton {
  @ViewChild('submenuView') submenuTemplate: TemplateRef<any>;

  /**
   * Required Input - template reference of content to display within the megamenu
   */
  @Input() content: TemplateRef<any>;

  /**
   * Defines whether the content should be displayed as a megamenu rather than a menu.
   * A megamenu will open a menu that expands the entire width of the page
   * @default false
   */
  @Input() isMegamenu: boolean = false;

  /**
   * Whether the megamenu is open initially or not
   * @default - false
   */
  @Input() selected = false;

  /**
   * Id for megamenu section
   */
  @Input() id = `usa-megamenu-nav-${submenuId++}`;

  /**
   * Output event emitted whenever the state of megamenu (opened or closed) changes.
   */
  @Output() selectedChange = new EventEmitter<boolean>();

  /**
   * Listener for click events anywhere in the DOM. If the click event was outside
   * this submenu element, then close the submeny.
   * @param $event - click event
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick($event) {
    if (!this.selected || this.el.nativeElement.contains($event.target)) {
      return;
    }

    this.selected = false;
    this.detachContent();

    this.selectedChange.emit(this.selected);
  }

  private _attachedViewRef: ViewRef;

  constructor(
    private el: ElementRef,
    private viewContainer: ViewContainerRef,
  ) {}

  /**
   * Toggles selected value when button is clicked. If the item is selected, then we should
   * display the submenu. If the item is un-selected, then we should remove the submenu
   */
  onClick() {
    this.selected = !this.selected;
    this.selected ? this.attachContent() : this.detachContent();
    this.selectedChange.emit(this.selected);
  }

  /**
   * Attaches the submenu div as next sibling to button
   */
  attachContent() {
    this._attachedViewRef = this.viewContainer.createEmbeddedView(this.submenuTemplate);
  }

  /**
   * Removes dropdown content and detaches the created view container
   */
  detachContent() {
    this._attachedViewRef.destroy();
  }
}