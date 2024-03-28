import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UsaCheckboxComponent } from '@gsa-sam/ngx-uswds';
import { AbstractUswdsFormly } from '../uswds-formly';

@Component({
  template: `
  <usa-checkbox [formControl]="formControl">{{ to.label }}</usa-checkbox>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class USWDSFormlyCheckboxComponent extends AbstractUswdsFormly {
  //@ViewChild(UsaCheckboxComponent, { static: true })  template: UsaCheckboxComponent;
  constructor(_cdr: ChangeDetectorRef) {
    super();
    this.cdr = _cdr;
  }
}
