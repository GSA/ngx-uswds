import { Component } from '@angular/core';

	@Component({
	standalone: false,
  selector: 'checkbox-basic',
  templateUrl: './checkbox-basic.component.html',
})
export class CheckboxBasicComponent {
  tile: boolean = false;

  disabled: boolean = false;

  checked: boolean = false;
}
