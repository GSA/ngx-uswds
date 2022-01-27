import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-basic',
  templateUrl: './input-basic.component.html',
})
export class InputBasicComponent {
  @Input() prefix = '$';
  @Input() suffix = 'lbs.';
}
