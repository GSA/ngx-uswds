import { 
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, 
  Component, ElementRef, EventEmitter, Inject, Input, OnChanges, OnDestroy, 
  Output, Renderer2, SimpleChanges, ViewChild } from "@angular/core";
import { UsaComboBoxItemTemplate } from "./combo-box-selectors";
import { isArrowDown, isArrowUp, isEnd, isEnter, isHome, isPageDown, isPageUp } from "../util/key";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: `usa-combo-box-dropdown`,
  templateUrl: './combo-box-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: Window, useValue: window}
  ]
})
export class UsaComboboxDropdown implements AfterViewInit, OnDestroy, OnChanges {

  @ViewChild('dropdownListbox') dropdownListBox: ElementRef<HTMLUListElement>;

  /** List of items to display in dropdown */
  @Input() items: any[];

  @Input() labelField: string;
  @Input() valueFiend: string;

  /** Provided custom template for displaying each item. 
   * If none provided, then the label property of each item will be shown */
  @Input() customItemTemplate: UsaComboBoxItemTemplate;

  /**
   * HTML id value to attach to container element
   */
  @Input() listId: string;

  /**
   * If virtualScroll is enabled, a scrollEnd event
   * will be fired when user scrolls to last item in the list,
   * allowing clients to load in more data
   */
  @Input() virtualScroll = true;

  /**
   * Direction to display the dropdown box
   */
  @Input() direction: 'top' | 'bottom';

  /** Id of label for listbox */
  @Input() ariaLabelledBy: string;

  /**
   * Emitted when a value is selected from the dropdown list
   */
  @Output() selected = new EventEmitter<any>();

  /**
   * Emitted when the user presses the up arrow key and focus
   * is on first item in dropdown list. This indicates to the client
   * that the dropdown list should close and focus should move
   * back to the combo box input field
   */
  @Output() focusInput = new EventEmitter();

  /**
   * Emitted when user has scrolled to the end of the dropdown list.
   * This event only fires if virtual scroll is enabled
   */
  @Output() scrollEnd = new EventEmitter();

  // Reference to currently focused item
  _focusedItem: {item: any, index: number, itemHtml: HTMLDataListElement};

  /** List of functions to call to un-bind events registered through renderer.listen call */
  _eventListeners: (()=>void)[] = [];

  constructor(
    private el: ElementRef,
    private windowRef: Window,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
  ) { }

  trackByFn(index: number) {
    return index;
  }

  ngAfterViewInit() {
    this.setDropdownDirection();
    this.registerEventHandlers();
  }

  ngOnDestroy() {
    this._eventListeners.forEach(listener => listener());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.items) {
      return;
    }
    
    /** 
     * New list of items is provided. Remove listeners to old item list, and attach listeners
     * to the new items
     */
    this._eventListeners.forEach(unlistener => unlistener());
    this._eventListeners = [];
    this.cdr.detectChanges();
    this.registerEventHandlers();
  }

  selectItem(item) {
    if (item.disabled) return;

    this.selected.emit(item);
  }

  /**
 * Handles keypress on combobox dropdown items
 * @param $event 
 * @returns 
 */
  onKeyDown($event: KeyboardEvent) {
    switch (true) {
      case isArrowDown($event):
        if (this._focusedItem?.index === this.items.length - 1) return;
        const nextSibling = this._focusedItem.itemHtml.nextElementSibling as HTMLDataListElement;
        this.updateFocusedItem(this._focusedItem.index + 1, nextSibling);
        $event.preventDefault();
        break;

      case isArrowUp($event):
        if (this._focusedItem?.index === 0) {
          this.focusInput.emit();
          return;
        }

        const previousSibling = this._focusedItem.itemHtml.previousElementSibling as HTMLDataListElement;
        this.updateFocusedItem(this._focusedItem.index - 1, previousSibling);
        $event.preventDefault();
        break;
      
      case isPageUp($event):
      case isPageDown($event):
        const dropdownNativeElement = this.dropdownListBox.nativeElement;

        if (!dropdownNativeElement.firstElementChild || !dropdownNativeElement.firstElementChild.clientHeight) {
          return;
        }

        const numItemsToScrollPast = Math.ceil(dropdownNativeElement.clientHeight / dropdownNativeElement.firstElementChild.clientHeight);
        let newIndex = Math.min(this._focusedItem.index + numItemsToScrollPast, this.items.length - 1);
        if (isPageUp($event)) {
          newIndex = Math.max(this._focusedItem.index - numItemsToScrollPast, 0)
        }

        const newFocusedElement = this.el.nativeElement.querySelector(`#${this.listId}-${newIndex}`);
        this.updateFocusedItem(newIndex, newFocusedElement);
        $event.preventDefault();
        break;

      case isHome($event):
        this.focusFirstElement();
        $event.preventDefault();
        break;

      case isEnd($event):
        this.focusLastElement();
        $event.preventDefault();
        break;

      case isEnter($event):
        this.selectItem(this._focusedItem.item);
        $event.preventDefault();
        break;
    }
  }

  /**
  * Focus on first element of combo-box dropdown
  */
  focusFirstElement() {
    const firstElement = this.dropdownListBox.nativeElement.firstElementChild as HTMLDataListElement;
    this.updateFocusedItem(0, firstElement);
    this.cdr.detectChanges();
  }

  focusLastElement() {
    const lastIndex = this.items.length - 1;
    const lastElement = this.dropdownListBox.nativeElement.lastElementChild as HTMLDataListElement;
    this.updateFocusedItem(lastIndex, lastElement);
    this.cdr.detectChanges();
  }

  private registerEventHandlers() {
    this.bindMouseOverListeners();
    this.bindScrollListener();
  }

  /**
   * Attaches mouseover event to each list element in the dropdown. Since the mouseover
   * event fires quite often, we attach it this way in the ts rather than through HTML
   * This coupled with changeDetectionStrategy of OnPush minimizes the amount
   * of necessary change detection triggers
   */
  private bindMouseOverListeners() {
    const children = Array.from(this.dropdownListBox.nativeElement.children);
    children.forEach((child: HTMLDataListElement, index: number) => {
      const listener = this.renderer.listen(child, 'mouseover', () => {
        if (this.document.activeElement === child) {
          return;
        }

        this.updateFocusedItem(index, child);
        this.cdr.detectChanges();
      });

      this._eventListeners.push(listener)
    });
  }

  /**
   * Adds scroll event binding if virtual scrolling is enabled.
   * This event listens for whether the user has scrolled to the last
   * item in the list or not. If so, it will fire an event
   * indicating that the user has scrolled to the end and more data
   * should be fetched
   * @returns 
   */
  private bindScrollListener() {
    if (!this.virtualScroll) return;

    const dropdownElement = this.dropdownListBox.nativeElement;
    const scrollListener = this.renderer.listen(dropdownElement, 'scroll', () => {
      const currentScrolledAmount = dropdownElement.offsetHeight + dropdownElement.scrollTop;
      const totalScrollAmount = dropdownElement.scrollHeight;
      if (currentScrolledAmount >= totalScrollAmount) {
        this.scrollEnd.emit();
      }
    })
  
    this._eventListeners.push(scrollListener);
  }

  private setDropdownDirection() {
    const dropdownRect = this.dropdownListBox.nativeElement.getClientRects().item(0);
    /** 
    * If there isn't enough room to display dropdown above the input, then simply display dropdown
    * below regardless of space
    */
    if (this.direction === 'bottom' || dropdownRect.height > dropdownRect.top) return;


    const dropdownY = dropdownRect.height + dropdownRect.top;

    /**
     * If there is no space to display dropdown below the input, then display dropdown above the input
     */
    if (this.direction === 'top' || dropdownY >= this.windowRef.innerHeight) {
      this.dropdownListBox.nativeElement.style.bottom = '100%';
      this.dropdownListBox.nativeElement.style.borderBottomWidth = '0';
      this.dropdownListBox.nativeElement.style.borderTop = '1px solid';
    }
  }

  private updateFocusedItem(index: number, itemHtml: HTMLDataListElement) {
    const item = this.items[index];

    this._focusedItem = {
      item,
      index,
      itemHtml
    };

    itemHtml.focus();
  }
}
