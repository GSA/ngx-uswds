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
    <usa-checkbox *ngIf="props.selectAllLable" [checked]="allChecked" [indeterminate]="checkIndeterminate()" 
  (change)="checkAll($event)">{{props.selectAllLable}}</usa-checkbox>

<ul class="usa-list usa-list--unstyled">
  <li class="margin-left-3">
    <usa-checkbox *ngFor="let item of props.options" [tile]="props.tile" (change)="onChange(item.key, item.checked)" [(ngModel)]="item.checked" >{{item.value}}</usa-checkbox>
  </li>
</ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class USWDSFormlyMultiCheckboxComponent
  extends AbstractUswdsFormly {

  @ViewChild(UsaCheckboxComponent, { static: true })
  //public template: UsaCheckboxComponent;
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
    if (Array.isArray(this.field.props.options)) {
      this.allChecked =
        value === this.field.props.options.length ? true : false;
    }

  }

  onChange(value: any, checked: boolean) {
    if (this.props.type === 'array') {
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

    this.allChecked = !this.allChecked;
    if (Array.isArray(this.field.props.options)) {
      this.formControl.setValue([]);
      this.field.props.options.forEach(value => value.checked = ev);
      this.field.props.options.map((option) => {
        this.onChange(option.key, ev);
      });
    }
  }


}
