import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Key } from '../util/key';

let nextId = 0;

@Component({
  selector: 'usa-textarea',
  templateUrl: './textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent implements ControlValueAccessor {

  model: string = '';

  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  @Input() ariaLabel = 'Textarea component'
  @Input() rowHeight: number;
  @Input() maxLength: number;
  @Input() id = `usa-textarea-${nextId++}`;
  @Input() placeholder = '';
  @Input() name = "textarea";

  @Output() onBlur: EventEmitter<string> = new EventEmitter(null);

  constructor(public cdr: ChangeDetectorRef) { }

  focusChange(event) {
    this.onBlur.emit(event.target.value)
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

