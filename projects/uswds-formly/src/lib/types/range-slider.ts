import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  template: `
  <usa-range-slider
    [formControl]="formControl"
    [min]="to.min ? to.min :  0"
    [max]="to.max ? to.max : 100"
    [step]="to.step ? to.step : 10"
    [startingValue]="to.startingValue ? to.startingValue : 0"
    [formlyAttributes]="field"
    [id]="to.id ? to.id : 'usa-range'"

  ></usa-range-slider>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class USWDSFormlyRangeSliderComponent extends FieldType {

}
