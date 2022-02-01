import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let rangeSliderId = 0;

@Component({
  selector: 'usa-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>UsaRangeSliderComponent),
      multi: true
    }
  ]
})
export class UsaRangeSliderComponent implements OnInit, ControlValueAccessor {

  @Input() min: number;
  @Input() max: number;
  @Input() step: number;
  @Input() startingValue: number;
  @Input() id: string = `usa-range-${rangeSliderId++}`

  /**
   * Changes how slider outputs current value
   * change - outputs when user releases mouse drag
   * input - output as user drags
   */
  @Input() updateOn: 'change' | 'input' = 'change';

  sliderValue: number;


  onChange: any = () => { };
  onTouched: any = () => { };


  constructor() { }

  ngOnInit(): void {
    this.sliderValue = this.startingValue;
  }

  writeValue(value: number): void {
    this.sliderValue = value ?? this.sliderValue;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
     this.onTouched = fn;
  }

  sliderChange($event){
    if(this.updateOn === 'change'){
      this.writeValue($event.target.value)
      this.onChange($event.target.value)
    }
  }

  sliderInput($event){
    if(this.updateOn === 'input'){
      this.writeValue($event.target.value)
      this.onChange($event.target.value)
    }
  }
}
