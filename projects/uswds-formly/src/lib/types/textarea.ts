import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UsaTextareaComponent } from '@gsa-sam/ngx-uswds';
import { AbstractUswdsFormly } from '../uswds-formly';

@Component({
    template: `
  <usa-textarea [formControl]="formControl" [placeholder]="to.placeholder">{{ to.label }}</usa-textarea>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class USWDSFormlyTextAreaComponent extends AbstractUswdsFormly {
    @ViewChild(UsaTextareaComponent, { static: true }) public template: UsaTextareaComponent;
    constructor(_cdr: ChangeDetectorRef) {
        super();
        this.cdr = _cdr;
    }
}
