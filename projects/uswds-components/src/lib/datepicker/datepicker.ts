/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

 import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
 import {UsaDatepickerBase, UsaDatepickerControl} from './datepicker-base';
 import {USA_SINGLE_DATE_SELECTION_MODEL_PROVIDER} from './date-selection-model';

 @Component({
   selector: `usa-datepicker-wrapper`,
   template: `
    <label class="usa-label" [attr.id]="id + 'label'" [attr.for]="id">{{label}}</label>
    <div class="usa-hint" [attr.id]="id + 'hint'">{{hint}}</div>
    <div class="usa-date-picker usa-date-picker--initialized">
      <div class="usa-date-picker__wrapper" [attr.id]="id + 'wrapper'">
        <ng-content></ng-content>
      </div>
    </div>
   `,
 })
 export class UsaDatepickerWrapper {
   @Input() label: string;
   @Input() hint: string;
   @Input() id: string;
 }
 
 /** Component responsible for managing the datepicker popup/dialog. */
 @Component({
   selector: 'usa-datepicker',
   template: '',
   exportAs: 'usaDatepicker',
   changeDetection: ChangeDetectionStrategy.OnPush,
   providers: [
    USA_SINGLE_DATE_SELECTION_MODEL_PROVIDER,
     {provide: UsaDatepickerBase, useExisting: UsaDatepicker},
   ]
 })
 export class UsaDatepicker<D> extends UsaDatepickerBase<UsaDatepickerControl<D>, D | null, D> {
 }