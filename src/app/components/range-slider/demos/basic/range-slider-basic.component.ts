import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'usa-range-slider-basic',
  templateUrl: './range-slider-basic.component.html',
})
export class RangeSliderBasicComponent {

  sliderStartingValue = 20;
  rangeSliderValue: FormControl = new FormControl(this.sliderStartingValue);
}
