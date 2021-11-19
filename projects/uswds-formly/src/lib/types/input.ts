import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  template: `
  <ng-container *ngIf="to.characterCount">
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
    />
    </ng-container>
    <ng-container *ngIf="!to.characterCount">
    <input
      [ngClass]="{
        'usa-input--disabled': to.disabled,
        'usa-input--error': showError,
        'usa-input--success': formControl.dirty  && !formControl.invalid
      }"
      class="usa-input"
      [placeholder]="to.placeholder"
      [name]="to.name ? to.name : 'input'"
      [formlyAttributes]="field"
      [type]="to.inputType ? to.inputType : 'text'"
      [formControl]="formControl"
    />
    </ng-container>
  `,
})
export class USWDSFormlyInputComponent extends FieldType {
}
