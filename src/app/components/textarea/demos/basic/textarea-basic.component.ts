import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'usa-textarea-basic',
  templateUrl: './textarea-basic.component.html',
})
export class TextareaBasicComponent {
  constructor() {}
  value: string;
  textareaModel = '';
  description = `description test with link <a href="./">Goto Home</a>`;
  formControl = new FormControl('test');
  ngOnInit(): void {}

  updateValue(event) {
    this.value = event;
  }
}
