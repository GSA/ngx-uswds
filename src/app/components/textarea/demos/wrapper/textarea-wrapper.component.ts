import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormFieldComponent } from '@gsa-sam/ngx-uswds';

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
  @ViewChild(FormFieldComponent, { static: true })
  wrappeRref: FormFieldComponent;
  ngOnInit(): void {}

  updateValue(event) {
    this.value = event;
  }
}
