import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// Search Settings class
export class SearchSettings {
  public ariaLabel: string;
  public id: string;
  public size: string;
  public buttonText: string;
  public placeholder: string
}

@Component({
  selector: 'usa-search',
  templateUrl: './search.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {

  model: string = '';

  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  @Input() searchSettings: SearchSettings = new SearchSettings();

  @Output() onBlurChange: EventEmitter<string> = new EventEmitter(null);

  @Output() onSearchTextChange: EventEmitter<string> = new EventEmitter(null);

  constructor(public cdr: ChangeDetectorRef) { }

  focusChange(event) {
    this.onBlurChange.emit(event.target.value)
  }

  onKeydown(event): void {
    if (event.code == 'Enter') {
      this.model = event.target.value;
      this.updateModel();
      event.preventDefault();
    }
  }

  onValueChange(event) {
    this.onSearchTextChange.emit(event);
  }

  // Helper method to programatically update the search value to the model
  onSubmit(val, ev) {
    this.model = val;
    this.updateModel();
    ev.preventDefault();
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

  getClass() {
    const cls =
      this.searchSettings && this.searchSettings.size === 'big'
        ? 'usa-search--big'
        : (this.searchSettings && this.searchSettings.size == 'small') ?
          'usa-search--small' : '';
    return cls;
  }
}

