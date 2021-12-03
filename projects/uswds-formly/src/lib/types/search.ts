import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UsaSearchComponent } from '@gsa-sam/ngx-uswds';
import { AbstractUswdsFormly } from '../uswds-formly';

@Component({
  template: `
  <usa-search
      [formControl]="formControl"
    ></usa-search>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class USWDSFormlySearchComponent extends AbstractUswdsFormly {
  @ViewChild(UsaSearchComponent, { static: true }) public template: UsaSearchComponent;
  constructor(_cdr: ChangeDetectorRef) {
    super();
    this.cdr = _cdr;
  }
}
