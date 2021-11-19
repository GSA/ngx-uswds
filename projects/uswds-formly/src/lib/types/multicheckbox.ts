import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';

import { UsaCheckboxComponent } from '@gsa-sam/ngx-uswds';

import { AbstractUswdsFormly } from '../uswds-formly';

@Component({
  template: `
    <usa-checkbox *ngIf="to.selectAllLable" [checked]="allChecked" [indeterminate]="checkIndeterminate()" 
  (change)="checkAll($event)">{{to.selectAllLable}}</usa-checkbox>

<ul class="usa-list usa-list--unstyled">
  <li class="margin-left-3">
    <usa-checkbox *ngFor="let item of to.options" (change)="onChange(item.key, item.checked)" [(ngModel)]="item.checked" >{{item.value}}</usa-checkbox>
  </li>
</ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class USWDSFormlyMultiCheckboxComponent
  extends AbstractUswdsFormly {

  @ViewChild(UsaCheckboxComponent, { static: true })
  public template: UsaCheckboxComponent;
  allChecked: boolean;
  constructor(_cdr: ChangeDetectorRef) {
    super();
    this.cdr = _cdr;
  }
  checkIndeterminate() {
    let value;
    if (this.formControl && this.formControl.value) {
      if (!Array.isArray(this.formControl.value)) {
        let values = Object.keys(this.formControl.value).map(
          (item) => this.formControl.value[item]
        );
        value = values.filter((x) => x === true).length;
      } else {
        value = this.formControl.value.length;
      }
    }
    if (Array.isArray(this.field.templateOptions.options)) {
      this.allChecked =
        value === this.field.templateOptions.options.length ? true : false;
    }

  }

  onChange(value: any, checked: boolean) {
    if (this.to.type === 'array') {
      this.formControl.patchValue(
        checked
          ? [...(this.formControl.value || []), value]
          : [...(this.formControl.value || [])].filter((o) => o !== value)
      );
    } else {
      this.formControl.patchValue({
        ...this.formControl.value,
        [value]: checked,
      });
    }
    this.checkIndeterminate();
    this.formControl.markAsTouched();
  }

  checkAll(ev: boolean) {
    this.allChecked = true;

    if (Array.isArray(this.field.templateOptions.options)) {
      this.formControl.setValue([]);
      this.field.templateOptions.options.map((option) => {
        this.onChange(option.key, ev);
      });
    }
  }


}
