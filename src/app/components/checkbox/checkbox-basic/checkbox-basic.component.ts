import { Component } from '@angular/core';

@Component({
  selector: 'checkbox-basic',
  templateUrl: './checkbox-basic.component.html',
})
export class CheckboxBasicComponent {
  tile: boolean = false;

  disabled: boolean = false;

  checked: boolean = false;
}
