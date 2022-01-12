import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Key } from '../util/key';

let nextId = 0;

@Component({
  selector: 'usa-textarea',
  templateUrl: './textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsaTextareaComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsaTextareaComponent implements ControlValueAccessor {
  model: string = '';

  private _onChange = (_: any) => {};
  private _onTouched = () => {};
  /**
   * Sets the ariaLabel attribute
   */
  @Input() ariaLabel = 'Textarea component';
  /**
   * Sets the rowHeight
   */
  @Input() rowHeight: number;
  /**
   * Sets the maxLength attribute
   */
  @Input() maxLength: number;
  /**
   * Sets the id attribute
   */
  @Input() id = `usa-textarea-${nextId++}`;
  /**
   * Sets the placeholder attribute
   */
  @Input() placeholder = '';
  /**
   * Sets the name attribute
   */
  @Input() name = 'textarea';
  /**
   * Sets the characterCount attribute
   */
  @Input() characterCount: number;
  /**
   * Optional assistance text to be set when placeholder attribute is used
   */
  @Input() title: string;

  /**
   * Sets the disabled attribute
   */
  @Input() disabled: boolean;

  /**
   * Emits focus event
   */
  @Output() onBlur: EventEmitter<string> = new EventEmitter(null);

  /**
  * Sets the required attribute

  */
  @Input() required: boolean; // deprecated
  /**
   * Sets the required attribute
   */
  @Input() requiredFlag: boolean;

  /**
   * Sets the label text
   */
  @Input() label: string;

  /**
   * Sets the helpful description text
   */
  @Input() description: string;
  /**
   * Sets the general error message
   */
  @Input() errorMessage: string;

  constructor(public cdr: ChangeDetectorRef) {}

  focusChange(event) {
    this.onBlur.emit(event.target.value);
  }

  onValueChange(event) {
    this.model = event.target.value;
    this.updateModel();
  }

  onKeydown(event): void {
    if (event.code == Key.Enter) {
      this.model = event.target.value;
      this.updateModel();
      event.preventDefault();
    }
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
