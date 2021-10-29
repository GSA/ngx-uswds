import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'uswds-formly-field-input',
  template: `
    <input
      [ngClass]="{
        'usa-input--disabled': to.disabled,
        'usa-input--error': showError
      }"
      class="usa-input"
      [placeholder]="to.placeholder"
      [name]="name"
      [formlyAttributes]="field"
      [type]="to.inputType ? to.inputType : 'text'"
      [formControl]="formControl"
    />

  `,
})
export class USWDSFormlyInputComponent extends FieldType {
  get name() {
    return this.to.name || 'input';
  }
}
