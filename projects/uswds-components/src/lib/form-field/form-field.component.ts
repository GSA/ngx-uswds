import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'usa-form-field',
  templateUrl: 'form-field.component.html',
})
export class FormFieldComponent {
  /**
   * sets the label text
   */
  @Input() public label: string;
  /**
   * sets the id attribute value
   */
  @Input() public id: string;
  /**
   * sets the description text
   */
  @Input() public description: string;
  /**
   * deprecated, toggles the required text
   */
  @Input() public required: boolean = false;
  /**
   * toggles the required text
   */
  @Input() public requiredFlag: boolean = false;

  /**
   * set the error message
   */
  @Input() public set errorMessage(message: string) {
    this._errorMessage = message;
  }

  public get errorMessage(): string {
    return this._errorMessage;
  }

  public input: HTMLElement;

  public errorElId: string;
  public descriptionElId: string;

  private _errorMessage = '';

  constructor(private cdr: ChangeDetectorRef) {}

  public formatErrors(control: NgControl) {
    if (!control) {
      return;
    }

    if (control.pristine || !control.errors) {
      this.errorMessage = '';
      return;
    }

    if (control.invalid && control.errors) {
      for (const k in control.errors) {
        const errorObject = control.errors[k];

        // to check if it's not null & is object
        if (
          errorObject.message !== null &&
          typeof errorObject.message === 'object'
        ) {
          this.errorMessage = errorObject.message;
          return;
        }
        this.setInvalidErrors(k, errorObject);
      }
    }
  }

  public clearError() {
    this.errorMessage = '';
  }

  private setInvalidErrors(error, errorObject) {
    const actualLength = errorObject.actualLength;
    const requiredLength = errorObject.requiredLength;

    switch (error) {
      case 'minlength':
        this.errorMessage = `The number of characters should not be less than ${requiredLength}`;
        return;
      case 'maxlength':
        this.errorMessage =
          actualLength +
          ' characters input but max length is ' +
          requiredLength;
        return;
      case 'required':
        this.errorMessage = 'This field is required';
        return;
      case 'isNotBeforeToday':
        this.errorMessage = 'Date must not be before today';
        return;
      default:
        return (this.errorMessage = 'Invalid');
    }
  }
}
