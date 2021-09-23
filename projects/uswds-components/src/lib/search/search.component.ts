import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ViewportRuler } from '@angular/cdk/overlay';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
export class SearchSettings {
  public placeholder = 'Search';
  public ariaLabel?= 'Search';
  public size?: string;
  public inputClass?: string;
  public parentSelector?: string;
  public id?: string;
  public dropdown?: any = {
    id: 'searchOptions',
    placeholder: '-Select-',
    options: [],
    inverse: false,
  };
  public isSuffixSearchIcon?: boolean = false;
}
@Component({
  selector: 'uswds-search',
  templateUrl: 'search.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SdsSearchComponent),
      multi: true,
    },
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class USWDSSearchComponent implements AfterViewInit, ControlValueAccessor {
  @ViewChild('inputEl', { read: ElementRef, static: false })
  inputEl: ElementRef;

  @Input() searchSettings: SearchSettings = new SearchSettings();
  @Output() submit: EventEmitter<{ searchText: string }> = new EventEmitter(
    null
  );

  model: any = '';

  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  constructor(
    private cd: ChangeDetectorRef,
  ) { }

  writeValueToModel() {
    this.model = this.inputEl
      ? this.inputEl.nativeElement.value
      : '';
    this._onChange(Object.assign({}, this.model));
  }

  writeValue(value: any) {
    if (value && this.model !== value) {
      this.model = value;
      this.cd.markForCheck();
    } else {
      this.model = {};
      this.cd.markForCheck();
    }
  }
  registerOnTouched(fn: any) {
    this._onTouched = fn;
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  clearInput(ev) {
    this.inputEl.nativeElement.value = '';
    this.writeValueToModel();
  }
}
