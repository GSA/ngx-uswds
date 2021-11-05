import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

import { USWDSFormlyCheckboxComponent } from './types/checkbox';
import { USWDSFormlyInputComponent } from './types/input';
import { FormlyWrapperFormFieldComponent } from './wrappers/form-field.wrapper';


@NgModule({
    declarations: [USWDSFormlyInputComponent, USWDSFormlyCheckboxComponent, FormlyWrapperFormFieldComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
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
                    name: 'checkbox',
                    component: USWDSFormlyCheckboxComponent,
                    wrappers: ['form-field']
                },
            ],
            wrappers: [{ name: 'form-field', component: FormlyWrapperFormFieldComponent }]
        }),
    ],

})
export class UsaFormlyModule { }