import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UsaDropdownComponent } from '@gsa-sam/ngx-uswds';
import { AbstractUswdsFormly } from '../uswds-formly';

@Component({
  template: `
  <usa-dropdown [formControl]="formControl" [options]="to.options">{{ to.label }}</usa-dropdown>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class USWDSFormlyDropdownComponent extends AbstractUswdsFormly {
  @ViewChild(UsaDropdownComponent, { static: true }) public template: UsaDropdownComponent;
  constructor(_cdr: ChangeDetectorRef) {
    super();
    this.cdr = _cdr;
  }
}
