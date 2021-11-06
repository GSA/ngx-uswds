import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { SearchComponent } from '@gsa-sam/ngx-uswds';
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
  @ViewChild(SearchComponent, { static: true }) public template: SearchComponent;
  constructor(_cdr: ChangeDetectorRef) {
    super();
    this.cdr = _cdr;
  }
}
