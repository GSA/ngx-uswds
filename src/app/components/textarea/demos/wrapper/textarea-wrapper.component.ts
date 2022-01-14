import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LabelWrapper } from '@gsa-sam/ngx-uswds';

@Component({
  selector: 'usa-textarea-wrapper',
  templateUrl: './textarea-wrapper.component.html',
})
export class TextareaWrapperComponent {
  constructor() {}
  value: string;
  textareaModel = '';
  description = `description test with link <a href="./">Goto Home</a>`;
  formControl = new FormControl('test');
  @ViewChild(LabelWrapper, { static: true }) wrapperRef: LabelWrapper;
  ngOnInit(): void {}

  updateValue(event) {
    this.value = event;
  }
}
