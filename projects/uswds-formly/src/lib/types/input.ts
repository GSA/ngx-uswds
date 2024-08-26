import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  template: `

    <input
      [ngClass]="{
        'usa-input--disabled': props.disabled,
        'usa-input--error': showError,
        'usa-input--success': formControl.dirty  && !formControl.invalid
      }"
      class="usa-input"
      [placeholder]="props.placeholder"
      [usaCharacterCount]="props.characterCount"
      [name]="props.name ? props.name : 'input'"
      [formlyAttributes]="field"
      [type]="props.inputType ? props.inputType : 'text'"
      [formControl]="formControl"
      [prefix]=props.prefix
      [suffix]=props.suffix
    />

  `,
})
export class USWDSFormlyInputComponent extends FieldType {}
