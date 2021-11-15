import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UsaDatePickerWrapper, UsaDatePicker, UsaDatePickerButton  } from '@gsa-sam/ngx-uswds';
import { AbstractUswdsFormly } from '../uswds-formly';

@Component({
  template: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class USWDSFormlyDatePickerComponent extends AbstractUswdsFormly {
  @ViewChild(UsaDatePickerWrapper, { static: true }) public template: UsaDatePickerWrapper;
  constructor(_cdr: ChangeDetectorRef) {
    super();
    this.cdr = _cdr;
  }
}
