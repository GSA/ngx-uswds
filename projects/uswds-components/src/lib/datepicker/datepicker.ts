/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

 import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
 import {MatDatepickerBase, UsaDatepickerControl} from './datepicker-base';
 import {USA_SINGLE_DATE_SELECTION_MODEL_PROVIDER} from './date-selection-model';

 @Component({
   selector: `usa-datepicker-wrapper`,
   template: `
    <label class="usa-label" [attr.id]="id + 'label'" [attr.for]="id">{{label}}</label>
    <div class="usa-hint" [attr.id]="id + 'hint'">{{hint}}</div>
    <div class="usa-date-picker usa-date-picker--initialized">
      <div class="usa-date-picker__wrapper" [attr.id]="id + 'wrapper'">
        <input [usaDatepicker]="picker">
        <usa-datepicker-toggle [for]="picker"></usa-datepicker-toggle>
        <usa-datepicker #picker></usa-datepicker>
      </div>
    </div>
   `,
 })
 export class UsaDatepickerWrapper {
   @Input() label: string;
   @Input() hint: string;
   @Input() id: string;
 }
 
 // TODO(mmalerba): We use a component instead of a directive here so the user can use implicit
 // template reference variables (e.g. #d vs #d="matDatepicker"). We can change this to a directive
 // if angular adds support for `exportAs: '$implicit'` on directives.
 /** Component responsible for managing the datepicker popup/dialog. */
 @Component({
   selector: 'usa-datepicker',
   template: '',
   exportAs: 'usaDatepicker',
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [
    USA_SINGLE_DATE_SELECTION_MODEL_PROVIDER,
     {provide: MatDatepickerBase, useExisting: UsaDatepicker},
   ]
 })
 export class UsaDatepicker<D> extends MatDatepickerBase<UsaDatepickerControl<D>, D | null, D> {
 }