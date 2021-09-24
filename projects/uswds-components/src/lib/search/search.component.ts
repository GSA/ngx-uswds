import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// Search Settings class
export class SearchSettings {
  public ariaLabel: string;
  public formClass: string;
  public id: string;
  public size: string;
  public language: string;
}

// Search component class
@Component({
  selector: 'usa-search',
  templateUrl: './search.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi: true,
    },
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {

  model: string = '';


  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  @Input() searchSettings: SearchSettings = new SearchSettings();

  constructor(public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }




  // Helper method to programatically add a value to the existing items array
  addItem(val) {
    this.model = val;
    this.updateModel();
  }

  // Method that is fired when the child component event notifies us that the items array has been modified within the child component
  updateItems($event) {
    this.updateModel();
  }

  // Helper method that gets a new instance of the model and notifies ControlValueAccessor that we have a new model for this FormControl (our custom component)
  updateModel() {
    const model = this.getModel();
    this._onChange(model);
  }

  // Helper method to return a new instance of an array that contains our items
  getModel() {
    return this.model;
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

