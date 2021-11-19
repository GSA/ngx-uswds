import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsaCheckboxComponent } from '@gsa-sam/ngx-uswds';
import { AbstractUswdsFormly } from '../uswds-formly';

@Component({

  template: `
<usa-checkbox *ngIf="to.selectAll" [checked]="allChecked" [indeterminate]="checkIndeterminate()" 
  (change)="checkAll($event)">{{to.selectAllLable}}</usa-checkbox>

<ul class="usa-list usa-list--unstyled">
  <li class="margin-left-3">
    <usa-checkbox *ngFor="let item of to.options" [formControl]="item.control" >{{item.name}}</usa-checkbox>
  </li>
</ul>
 `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class USWDSFormlyMultiCheckboxComponent extends AbstractUswdsFormly {
  allChecked;
  @ViewChild(UsaCheckboxComponent, { static: true }) public template: UsaCheckboxComponent;
  constructor(_cdr: ChangeDetectorRef) {
    super();
    this.cdr = _cdr;
  }
  get checkOptions() {
    const options = this.to.options;
    options.forEach((option: any) => {
      option.control = new FormControl(option.checked)
    })
    return options;
  }
  checkIndeterminate() { }
  checkAll(ev) { }

}



