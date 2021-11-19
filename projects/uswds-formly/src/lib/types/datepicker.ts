import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UsaDatePickerWrapper } from '@gsa-sam/ngx-uswds';
import { AbstractUswdsFormly } from '../uswds-formly';

@Component({
  template: `
  <usa-date-picker-wrapper>
  <input [formControl]="formControl" [usaDatePicker]="picker" [id]="to.id+ '_datePicker'">
  <usa-date-picker-button [for]="picker"></usa-date-picker-button>
  <usa-date-picker #picker></usa-date-picker>
</usa-date-picker-wrapper>
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
