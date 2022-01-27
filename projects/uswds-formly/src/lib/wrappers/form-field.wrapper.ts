import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

/**
 * @param string [to.label] Text to be shown for the label
 * @param string [to.required] Makes the field required
 * @param string [to.description] Add a description below the label
 */

@Component({
  template: `
    <div class="usa-form-group" [class.usa-form-group--error]="showError">
      <label
        class="usa-label"
        *ngIf="to.label && !to.hideLabel"
        [attr.for]="id"
      >
        {{ to.label }}
      </label>
      <div
        *ngIf="to.description"
        class="usa-hint"
        [innerHTML]="to.description"
      ></div>
      <div
        *ngIf="showError"
        class="usa-error-message"
        [style.display]="'block'"
      >
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
      <ng-template #fieldComponent></ng-template>
    </div>
  `,
})
export class FormlyWrapperFormFieldComponent extends FieldWrapper {
  @ViewChild('fieldComponent', { read: ViewContainerRef })
  fieldComponent!: ViewContainerRef;
}
