import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { USWDSFormlyInputComponent } from './input/input';
import { FormlyWrapperFormFieldComponent } from './wrappers/form-field.wrapper';


@NgModule({
    declarations: [USWDSFormlyInputComponent, FormlyWrapperFormFieldComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule.forChild({
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