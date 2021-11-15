import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UsaCheckboxComponent } from '@gsa-sam/ngx-uswds';
import { AbstractUswdsFormly } from '../uswds-formly';

@Component({
  template: `
    <usa-checkbox [formControl]="formControl" *ngFor="let option of to.options" [checked]="option.checked">{{option.value}}</usa-checkbox>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class USWDSFormlyMultiCheckboxComponent extends AbstractUswdsFormly {
  @ViewChild(UsaCheckboxComponent, { static: true }) public template: UsaCheckboxComponent;
  constructor(_cdr: ChangeDetectorRef) {
    super();
    this.cdr = _cdr;
  }
}
