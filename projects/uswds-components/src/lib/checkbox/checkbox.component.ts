import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'uswds-checkbox',
  templateUrl: './checkbox.component.html',
})
export class USWDSCheckboxComponent {

  @Input() id: string;
  @Input() name: string;
  @Input() value: string;
  @Input() label: string;
  @Input() disabled = false;
  @Input() checked = false;
  @Input() tileFormat: boolean = false;

  @Output() change = new EventEmitter<boolean>();

  onClick() {
    this.checked = !this.checked;
    this.change.emit(this.checked);
  }
}
