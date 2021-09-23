import { Component } from '@angular/core';

@Component({
  selector: 'usa-radio-basic',
  templateUrl: './radio-basic.component.html',
})
export class RadioBasicComponent {

  selectedValue: string = 'sojourner-truth';
  selectedValueTile: string = 'sojourner-truth';

  onRadioChange($event: {target: HTMLInputElement, value: string}) {
    this.selectedValue = $event.value;
  }

  onRadioChangeTile($event: {target: HTMLInputElement, value: string}) {
    this.selectedValueTile = $event.value;
  }

}
