import { Component, Input } from '@angular/core';

@Component({
  selector: 'radio-basic',
  templateUrl: './radio-basic.component.html',
})
export class RadioBasicComponent {

  @Input() tile: boolean = false;
  @Input() disabled: boolean = false;
  @Input() ariaLabelledBy: string = 'historicalFigures1Label';
  @Input() name: string = 'historical-figures';
  @Input() checked: boolean = false;

  onRadioChange($event: {target: HTMLInputElement, value: string}) {
    console.log($event);
  }
}
