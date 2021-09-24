import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
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
  _onChange = (_: any) => { };
  _onTouched = () => { };

  @Input() searchSettings: SearchSettings = new SearchSettings();

  constructor(public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  writeValue(value: any) {
    this.model = value;
    this.cdr.markForCheck();
  }

  registerOnTouched(fn: any) {
    this._onTouched = fn;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
}
