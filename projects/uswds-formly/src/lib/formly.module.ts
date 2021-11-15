import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { USWDSFormlySearchComponent } from './types/search';
import { USWDSFormlyInputComponent } from './types/input';
import { USWDSFormlyCheckboxComponent } from './types/checkbox';
import { USWDSFormlyDatePickerComponent } from './types/datepicker';

import { FormlyWrapperFormFieldComponent } from './wrappers/form-field.wrapper';
import { UsaRadioModule, UsaSearchModule, UsaCheckboxModule, UsaDatePickerModule } from '@gsa-sam/ngx-uswds';
import { USWDSFormlyMultiCheckboxComponent } from './types/multicheckbox';

import { USWDSFormlyRadioComponent } from './types/radio';


@NgModule({
    declarations: [
        USWDSFormlyInputComponent,
        USWDSFormlySearchComponent,
        USWDSFormlyRadioComponent,
        USWDSFormlyCheckboxComponent,
        USWDSFormlyMultiCheckboxComponent,
        FormlyWrapperFormFieldComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsaSearchModule,
        UsaRadioModule,
        UsaCheckboxModule,
        UsaDatePickerModule,
        FormlyModule.forChild({
            validationMessages: [
                { name: 'required', message: 'This field is required' },],
            types: [
                {
                    name: 'input',
                    component: USWDSFormlyInputComponent,
                    wrappers: ['form-field']
                },
                {
                    name: 'radio',
                    component: USWDSFormlyRadioComponent,
                    wrappers: ['form-field']
                },
                {
                    name: 'search',
                    component: USWDSFormlySearchComponent,
                    wrappers: ['form-field']
                },
                {
                    name: 'checkbox',
                    component: USWDSFormlyCheckboxComponent,
                    wrappers: ['form-field']
                },
                {
                    name: 'multicheckbox',
                    component: USWDSFormlyMultiCheckboxComponent,
                    wrappers: ['form-field']
                },
                {
                    name: 'datepicker',
                    component: USWDSFormlyDatePickerComponent,
                    wrappers: ['form-field']
                },
            ],
            wrappers: [{ name: 'form-field', component: FormlyWrapperFormFieldComponent }]
        }),
    ],

})
export class UsaFormlyModule { }