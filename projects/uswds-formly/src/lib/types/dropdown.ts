import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { USWDSDropdownComponent } from '@gsa-sam/ngx-uswds';
import { AbstractUswdsFormly } from '../uswds-formly';

@Component({
  template: `
  <uswds-dropdown [formControl]="formControl" [options]="to.options">{{ to.label }}</uswds-dropdown>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class USWDSFormlyDropdownComponent extends AbstractUswdsFormly {
  @ViewChild(USWDSDropdownComponent, { static: true }) public template: USWDSDropdownComponent;
  constructor(_cdr: ChangeDetectorRef) {
    super();
    this.cdr = _cdr;
  }
}
