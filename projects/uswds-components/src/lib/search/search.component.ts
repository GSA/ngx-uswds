import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Key } from '../util/key';

let nextId = 0;

@Component({
  selector: 'usa-search',
  templateUrl: './search.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsaSearchComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsaSearchComponent {

  model: string = '';

  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  @Input() ariaLabel = 'search component'
  @Input() id = `usa-search-${nextId++}`;
  @Input() size: 'big' | 'small' | null;
  @Input() buttonText = 'Search';
  @Input() placeholder = '';
  @Input() name = "search";

  @Output() onBlur: EventEmitter<string> = new EventEmitter(null);

  @Output() searchTextChange: EventEmitter<string> = new EventEmitter(null);

  @Output() onTextSubmit: EventEmitter<string> = new EventEmitter(null);

  constructor(public cdr: ChangeDetectorRef) { }

  focusChange(event) {
    this.onBlur.emit(event.target.value)
  }

  onKeydown(event): void {
    if (event.code == Key.Enter) {
      this.model = event.target.value;
      this.updateModel();
      event.preventDefault();
    }
  }

  onValueChange(event) {
    this.searchTextChange.emit(event);
  }

  // Helper method to programatically update the search value to the model
  onSubmit(val, ev) {
    this.model = val;
    this.updateModel();
    ev.preventDefault();
    this.onTextSubmit.emit(val);
  }

  // Helper method that gets a new instance of the model and notifies ControlValueAccessor that we have a new model for this FormControl (our custom component)
  updateModel() {
    this._onChange(this.model);
  }

  // ControlValueAccessor (and Formly) is trying to update the value of the FormControl (our custom component) programatically
  // If there is a value we will just overwrite items
  // If there is no value we reset the items array to be empty
  writeValue(value: any) {
    if (value) {
      this.model = value;

      this.cdr.markForCheck();
    } else {
      this.model = '';
      this.cdr.markForCheck();
    }
  }

  // ControlValueAccessor hook that lets us call this._onChange(var) to let the form know our variable has changed (in this case model)
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  // ControlValueAccessor hook (not used)
  registerOnTouched(fn: any) {
    this._onTouched = fn;
  }
}

