import { 
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, 
  Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, 
  Output, Renderer2, SimpleChanges, ViewChild } from "@angular/core";
import { UsaComboBoxItemTemplate } from "./combo-box-selectors";
import { Key, KeyCode, MicrosfotKeys } from "../util/key";

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

  @Input() items: any[];
  @Input() customItemTemplate: UsaComboBoxItemTemplate;
  @Input() listId: string;
  @Input() virtualScroll = true;
  @Input() direction: 'top' | 'bottom';

  @Output() selected = new EventEmitter<any>();
  @Output() focusInput = new EventEmitter();
  @Output() scrollEnd = new EventEmitter();

  _focusedItem: any;
  _displayTop: boolean;

  _eventListeners: (()=>void)[] = [];

  constructor(
    private windowRef: Window,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
  ) { }

  trackByFn(index: number) {
    return index;
  }
  
  ngAfterViewInit() {
    this.setDropdownDirection();
    this.bindEventsOutsideAngular();
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
    this.cdr.detectChanges();
    this.bindEventsOutsideAngular();
    this._focusedItem = undefined;
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
    const keyPressed = $event.key || $event.keyCode;

    switch (keyPressed) {
      case Key.ArrowDown:
      case MicrosfotKeys.ArrowDown:
      case KeyCode.ArrowDown:
        if (this._focusedItem.index === this.items.length - 1) return;
        const nextSibling = this._focusedItem.itemHtml.nextElementSibling as HTMLDataListElement;
        this.updateFocusedItem(this._focusedItem.index + 1, nextSibling);
        $event.preventDefault();
        break;

      case Key.ArrowUp:
      case MicrosfotKeys.ArrowUp:
      case KeyCode.ArrowUp:
        if (this._focusedItem.index === 0) {
          this.focusInput.emit();
          return;
        }

        const previousSibling = this._focusedItem.itemHtml.previousElementSibling as HTMLDataListElement;
        this.updateFocusedItem(this._focusedItem.index - 1, previousSibling);
        $event.preventDefault();
        break;

      case Key.Home:
      case MicrosfotKeys.Home:
      case KeyCode.Home:
        this.focusFirstElement();
        $event.preventDefault();
        break;

      case Key.End:
      case MicrosfotKeys.End:
      case KeyCode.End:
        this.focusLastElement();
        $event.preventDefault();
        break;

      case Key.Enter:
      case MicrosfotKeys.Enter:
      case KeyCode.Enter:
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

  private bindEventsOutsideAngular() {
    this.bindMouseOverListeners();
    this.bindScrollListener();
  }

  /**
   * Attaches mouseover event to each list element in the dropdown. Since the mouseover
   * event fires quite often, we run these events outside of angular's zone to prevent 
   * excess change detection across the entire each time it fires.
   */
  private bindMouseOverListeners() {
    const children = Array.from(this.dropdownListBox.nativeElement.children);
    children.forEach((child: HTMLDataListElement, index: number) => {
      const listener = this.renderer.listen(child, 'mouseover', () => {
        if (this._focusedItem?.itemHtml === child) return;
        this.updateFocusedItem(index, child);
        this.cdr.detectChanges();
      });

      this._eventListeners.push(listener)
    });
  }

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
    const id = `${this.listId}-${index}`;

    this._focusedItem = {
      item,
      index,
      itemHtml
    };

    itemHtml.focus();
  }
}
