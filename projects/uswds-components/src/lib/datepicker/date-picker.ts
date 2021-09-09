import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UsaDatePickerBase, UsaDatePickerControl } from './date-picker-base';
import { USA_SINGLE_DATE_SELECTION_MODEL_PROVIDER } from './date-selection-model';

@Component({
  selector: `usa-date-picker-wrapper`,
  template: `
    <div class="usa-date-picker usa-date-picker--initialized">
      <div class="usa-date-picker__wrapper">
        <ng-content></ng-content>
      </div>
    </div>
   `,
})
export class UsaDatePickerWrapper { }

/** Component responsible for managing the datePicker popup/dialog. */
@Component({
  selector: 'usa-date-picker',
  template: ``,
  exportAs: 'usaDatePicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    USA_SINGLE_DATE_SELECTION_MODEL_PROVIDER,
    { provide: UsaDatePickerBase, useExisting: UsaDatePicker },
  ]
})
export class UsaDatePicker<D> extends UsaDatePickerBase<UsaDatePickerControl<D>, D | null, D> {
}