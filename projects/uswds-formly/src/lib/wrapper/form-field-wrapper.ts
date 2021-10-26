import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

/**
 * @param string [to.tagClass] Class to be added to the tag (default: sds-tag--info-white)
 * @param string [to.tagText] Text to be shown inside the tag
 * @param string [to.labelClass] Class to be applied to the label
 * @param string [to.label] Text to be shown for the label
 * @param string [to.required] Makes the field required
 * @param string [to.description] Add a description below the label
 * @param string [to.hideOptional] Remove the optional text
 * @param string [to.hideLabel] Hide the label
 *
 */

@Component({
  selector: 'sds-formly-wrapper-form-field',
  template: `
  <div class="usa-form-group" [class.usa-form-group--error]="showError">
      <label [attr.for]="id"  class="usa-label" *ngIf="to.label">
        {{ to.label }}
        <ng-container *ngIf="to.required && to.hideRequiredMarker !== true">*</ng-container>
      </label>
     
        <ng-template #fieldComponent></ng-template>
      

      <div *ngIf="showError" >
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
    </div>
  `,
})
export class FormlyWrapperFormFieldComponent extends FieldWrapper {
  @ViewChild('fieldComponent', { read: ViewContainerRef })
  fieldComponent!: ViewContainerRef;
}
