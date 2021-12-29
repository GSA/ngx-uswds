import { Component, ElementRef, EventEmitter, Input, Output } from "@angular/core";
import { UsaComboBoxItemTemplate } from "./combo-box-selectors";
import { Key, KeyCode, MicrosfotKeys } from "../util/key";

@Component({
  selector: `usa-combo-box-dropdown`,
  templateUrl: './combo-box-dropdown.component.html'
})
export class UsaComboboxDropdown {
  @Input() items: any[];
  @Input() customItemTemplate: UsaComboBoxItemTemplate;
  @Input() listId: string;
  @Input() trackByFn: Function;

  @Output() selected = new EventEmitter<any>();
  @Output() focusInput = new EventEmitter();

  _focusedItem: any;

  constructor(
    private el: ElementRef
  ) { }

  selectItem(item) {
    this.selected.emit(item);
  }

  onOptionHover(item: any, index: number, id: string, itemHtml: HTMLDataListElement) {
    this._focusedItem = {
      item,
      index,
      id,
      itemHtml
    };

    itemHtml.focus();
  }

  trackByOption = (_: number, item: any) => {
    if (this.trackByFn) {
        return this.trackByFn(item.value);
    }

    return item;
  };

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

        this._focusedItem = {
          item: this.items[this._focusedItem.index + 1],
          index: this._focusedItem.index + 1,
          id: nextSibling.id,
          itemHtml: nextSibling
        };

        nextSibling.focus();
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
        this._focusedItem = {
          item: this.items[this._focusedItem.index - 1],
          index: this._focusedItem.index - 1,
          id: previousSibling.id,
          itemHtml: previousSibling
        };

        previousSibling.focus();
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
    const firstElementId = `#${this.listId}-0`;
    const firstItem = this.el.nativeElement.querySelector(firstElementId);
    this._focusedItem = {
      item: this.items[0],
      index: 0,
      id: firstElementId,
      itemHtml: firstItem
    };

    firstItem.focus();
  }

  focusLastElement() {
    const lastIndex = this.items.length - 1;
    const lastElementId = `#${this.listId}-${lastIndex}`;
    const lastElement = this.el.nativeElement.querySelector(lastElementId);
    this._focusedItem = {
      item: this.items[lastIndex],
      index: lastIndex,
      id: lastElementId,
      itemHtml: lastElement
    };

    lastElement.focus();
  }
}
