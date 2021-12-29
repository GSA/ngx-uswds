import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Key, KeyCode, MicrosfotKeys } from '../util/key';
import { UsaComboboxDropdown } from './combo-box-dropdown.component';
import { UsaComboBoxItemTemplate } from './combo-box-selectors';

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
export class UsaComboBoxComponent implements ControlValueAccessor{

  @ViewChild('comboBoxInput') comboBoxInput: ElementRef<HTMLInputElement>;
  @ViewChild(UsaComboboxDropdown) comboBoxDropdown: UsaComboboxDropdown;

  @Input() items: any[];
  @Input() id = `usa-combo-box-${comboBoxId++}`;
  @Input() listId = `usa-combo-box__list-${listBoxId++}`;
  @Input() labelField: string;
  @Input() valueField: string;
  @Input() trackByFn: Function;
  @Input() value: string = '';
  @Input() readonly: boolean = undefined;


  @Output('change') changeEvent = new EventEmitter();

  @ContentChild(UsaComboBoxItemTemplate) itemTemplate: UsaComboBoxItemTemplate;

  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  _displayDropdown = false;
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
    this._onTouched();
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

  private updateValue(value: string) {
    this.value = value;
    this._onChange(value);
  }
}
