import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Key, KeyCode, MicrosfotKeys } from '../util/key';

let listId = 0;

@Component({
  selector: 'usa-combobox',
  templateUrl: './combo-box.component.html',
  providers: [{       
    provide: NG_VALUE_ACCESSOR, 
    useExisting: forwardRef(() => UsaComboBoxComponent),
    multi: true     
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsaComboBoxComponent implements ControlValueAccessor{

  @ViewChild('comboBoxInput') comboBoxInput: ElementRef<HTMLInputElement>;

  @Input() items: any[];
  @Input() id = `usa-combo-box__list-${listId++}`;
  @Input() labelField: string;
  @Input() valueField: string;
  @Input() trackByFn: Function;
  @Input() value: string = '';


  @Output('change') changeEvent = new EventEmitter();

  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  _displayDropdown = false;
  _focusedItem: {item: any, index: number, id: string, itemHtml: HTMLDataListElement} = null;
  _selectedItem: any;
  _selectedItemHtml: HTMLDataListElement;
  _disabled: boolean;

  @HostListener('document:click', ['$event'])
  onDocumentClick($event) {
    if (this.el.nativeElement.contains($event.target)) {
      return;
    }

    this._displayDropdown = false;
  }

  constructor(
    private el: ElementRef,
  ) { }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  onValueChange($event: string) {
    this.updateValue($event);
  }

  selectItem(item: any) {
    this.value = item[this.labelField];
    this._selectedItem = item;
    this.comboBoxInput.nativeElement.focus();
    this._displayDropdown = false;
    this.updateValue(item[this.labelField]);
  }

  clearInput() {
    this.updateValue('');
    this.comboBoxInput?.nativeElement.focus();
  }

  onFocus() {
    this._displayDropdown = true;
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

  onKeyDown($event: KeyboardEvent) {
    const keyPressed = $event.key || $event.keyCode;

    switch(keyPressed) {
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
        if (this._focusedItem.index === 0) return;
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
        const firstElementId = `#${this.id}-0`;
        const firstItem = this.el.nativeElement.querySelector(firstElementId);
        this._focusedItem = {
          item: this.items[0],
          index: 0,
          id: firstElementId,
          itemHtml: firstItem
        };

        firstItem.focus();
        $event.preventDefault();
        break;

      case Key.End:
      case MicrosfotKeys.End:
      case KeyCode.End:
        const lastIndex = this.items.length - 1;
        const lastElementId = `#${this.id}-${lastIndex}`;
        const lastElement = this.el.nativeElement.querySelector(lastElementId);
        this._focusedItem = {
          item: this.items[lastIndex],
          index: lastIndex,
          id: lastElementId,
          itemHtml: lastElement
        };

        lastElement.focus();
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

  private updateValue(value: string) {
    this.value = value;
    this._onChange(value);
  }
}
