import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

import { USWDSFormlySearchComponent } from './types/search';
import { USWDSFormlyInputComponent } from './types/input';
import { FormlyWrapperFormFieldComponent } from './wrappers/form-field.wrapper';
import { UsaRadioModule, UsaSearchModule } from '@gsa-sam/ngx-uswds';
import { USWDSFormlyRadioComponent } from './types/radio';


@NgModule({
    declarations: [
        USWDSFormlyInputComponent,
        USWDSFormlySearchComponent,
        FormlyWrapperFormFieldComponent,
        USWDSFormlyRadioComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsaSearchModule,
        UsaRadioModule,
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
            ],
            wrappers: [{ name: 'form-field', component: FormlyWrapperFormFieldComponent }]
        }),
    ],

})
export class UsaFormlyModule { }