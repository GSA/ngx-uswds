import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'uswds-date-input',
  templateUrl: './date-input.component.html',
})
export class USWDSDateInputComponent {

  @Input() unit: 'day' | 'month' | 'year';
  @Input() id: string
  @Input() name: string
  @Input() label: string
  @Input() maxLength: number
  @Input() minLength: number

  @Output() change = new EventEmitter();
  @Output() keydown = new EventEmitter();
  @Output() keyup = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() blur = new EventEmitter();

  onChange($event) {
    this.change.emit($event);
  }

  onKeyDown($event) {
    this.keydown.emit($event);
  }

  onKeyUp($event) {
    this.keyup.emit($event);
  }

  onFocus($event) {
    this.focus.emit($event)
  }

  onBlur($event) {
    this.blur.emit($event);
  }

}
