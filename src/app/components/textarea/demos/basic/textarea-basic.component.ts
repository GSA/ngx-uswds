import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'usa-textarea-basic',
  templateUrl: './textarea-basic.component.html',
})
export class TextareaBasicComponent {
  constructor() {}
  value: string;
  textareaModel = 'Hello';
  formControl = new FormControl('test');
  ngOnInit(): void {}

  updateValue(event) {
    this.value = event;
  }
}
