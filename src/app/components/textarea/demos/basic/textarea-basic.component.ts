import { Component } from '@angular/core';

	@Component({
	standalone: false,
  selector: 'usa-textarea-basic',
  templateUrl: './textarea-basic.component.html',
})
export class TextareaBasicComponent {
  constructor() {}
  value: string;
  textareaModel = '';
  description = `description test with link <a href="./">Goto Home</a>`;

  ngOnInit(): void {}

  updateValue(event) {
    this.value = event;
  }
}
