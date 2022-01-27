import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  template: `

    <input
      [ngClass]="{
        'usa-input--disabled': to.disabled,
        'usa-input--error': showError,
        'usa-input--success': formControl.dirty  && !formControl.invalid
      }"
      class="usa-input"
      [placeholder]="to.placeholder"
      [usaCharacterCount]="to.characterCount"
      [name]="to.name ? to.name : 'input'"
      [formlyAttributes]="field"
      [type]="to.inputType ? to.inputType : 'text'"
      [formControl]="formControl"
      [prefix]=to.prefix
      [suffix]=to.suffix
    />

  `,
})
export class USWDSFormlyInputComponent extends FieldType {}
