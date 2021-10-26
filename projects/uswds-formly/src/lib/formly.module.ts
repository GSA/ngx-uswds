import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { USWDSFormlyInputComponent } from './types/input';
import { FormlyWrapperFormFieldComponent } from './wrappers/form-field.wrapper';


@NgModule({
    declarations: [USWDSFormlyInputComponent, FormlyWrapperFormFieldComponent],
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
            ],
            wrappers: [{ name: 'form-field', component: FormlyWrapperFormFieldComponent }]
        }),
    ],

})
export class USWDSFormlyModule { }