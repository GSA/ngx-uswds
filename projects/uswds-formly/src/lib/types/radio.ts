import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FieldType } from '@ngx-formly/core';

@Component({
  template: `
    <usa-radio-group [tile]="to.tile" [formControl]="formControl" [name]="to.name ? to.name : 'radio-group'"  [ariaLabelledBy]="to.ariaLabelledBy">
     <ng-container *ngFor="let option of to.options;let i = index">
      <usa-radio [id]="id + '_' + i" [disabled]="option.disabled" [value]="option.value" [checked]="option.checked">{{option.label}}</usa-radio>
     </ng-container>
  </usa-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class USWDSFormlyRadioComponent extends FieldType {

}
