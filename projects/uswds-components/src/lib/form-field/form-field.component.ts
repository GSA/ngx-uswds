import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'uswds-form-field',
  templateUrl: 'form-field.component.html',
})
export class LabelWrapper {
  /**
   * sets the label text
   */
  @Input() public label: string;
  /**
   * sets the name attribute value
   */
  @Input() public name: string;
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

    if (control.pristine) {
      this.errorMessage = '';
      return;
    }

    if (control.invalid && control.errors) {
      for (const k in control.errors) {
        const errorObject = control.errors[k];

        if (errorObject.message) {
          if (
            Object.prototype.toString.call(errorObject.message) ===
            '[object String]'
          ) {
            this.errorMessage = errorObject.message;
            return;
          }
        }
      }

      for (const k in control.errors) {
        const errorObject = control.errors[k];
        this.setInvalidErrors(k, errorObject);
      }
    } else if (!control.errors) {
      this.errorMessage = '';
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
