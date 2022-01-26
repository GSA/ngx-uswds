import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UsaComboboxList, UsaComboBoxItemTemplate } from '../combo-box-list/combo-box-list.component';
import { Key, KeyCode, MicrosfotKeys } from '../util/key';

let comboBoxId = 0;
let listBoxId = 0;
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
export class UsaComboBoxComponent implements ControlValueAccessor {

  @ViewChild('comboBoxInput') comboBoxInput: ElementRef<HTMLInputElement>;
  @ViewChild(UsaComboboxList) comboBoxDropdown: UsaComboboxList;

  /** List of items to display in dropdown */
  @Input() items: any[];

  /** ID to use for html input. One will be auto generated if not provided */
  @Input() id = `usa-combo-box-${comboBoxId++}`;

  /** Id to use for html list box. One will be auto generated if not provided */
  @Input() listId = `usa-combo-box__list-${listBoxId++}`;

  /** Defines which property of each item to display to the user */
  @Input() labelField: string;

  /** Defines which property to consider as internal value for each item */
  @Input() valueField: string;

  /** Currently present value in the combo box's input field */
  @Input() value: string = '';

  /** Whether the input field can be written to or not */
  @Input() readonly: boolean = undefined;

  /** 
   * Toggles whether or not to emit scrollEnd event when a user scrolls to the
   * bottom of the current item list
   */
  @Input() virtualScroll = true;

  /** Additional class to apply on wrapper div */
  @Input() wrapperClass: string;

  @Input() disabled: boolean = false;

  @Output('change') changeEvent = new EventEmitter();

  /** 
   * Emitted when a user scrolls to the bottom of the current item list.
   * This event signals clients to fetch additional data to append to current items
   * list if additional data exists.
   */
  @Output() scrollEnd = new EventEmitter();

  /** Custom template to use for rendering each item in items list */
  @ContentChild(UsaComboBoxItemTemplate) itemTemplate: UsaComboBoxItemTemplate;

  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  _displayDropdown = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick($event) {
    if (this.el.nativeElement.contains($event.target)) {
      return;
    }

    this._displayDropdown = false;
  }

  constructor(
    public el: ElementRef,
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
    this.disabled = isDisabled;
  }

  onValueChange($event: string) {
    this.updateValue($event);
  }

  selectItem(item: any) {
    this.comboBoxInput.nativeElement.focus();
    this._displayDropdown = false;
    this.updateValue(item);
  }

  clearInput() {
    this.updateValue('');
    this.comboBoxInput?.nativeElement.focus();
  }

  onFocus() {
    this._displayDropdown = true;
    this._onTouched();
  }

  onScrollEnd() {
    this.scrollEnd.emit();
  }

  /**
   * Move focus to combo box input and close dropdown
   */
  focusInput() {
    this.comboBoxInput.nativeElement.focus();
    this._displayDropdown = false;
  }

  /**
   * Handles keypress on combobox input field
   * @param $event 
   * @returns 
   */
  onInputKeyDown($event: KeyboardEvent) {
    const keyPressed = $event.key || $event.keyCode;

    switch(keyPressed) {
      case Key.ArrowDown:
      case MicrosfotKeys.ArrowDown:
      case KeyCode.ArrowDown:
        if (!this._displayDropdown) {
          this._displayDropdown = true;
          return;
        }

        if (this.comboBoxDropdown) {
          this.comboBoxDropdown.focusFirstElement();
        }

        $event.preventDefault();
        break;

      case Key.ArrowUp:
      case MicrosfotKeys.ArrowUp:
      case KeyCode.ArrowUp:
        this._displayDropdown = false;
        $event.preventDefault();
        break;
    }
  }

  private updateValue(value: any) {
    if (typeof value === 'object') {
      this.value = value[this.labelField];
    } else {
      this.value = value;
    }

    this._onChange(value);
  }
}
