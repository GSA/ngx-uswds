import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { USWDSFormlyInputComponent } from './input';
import { FormlyWrapperFormFieldComponent } from '../wrapper/form-field-wrapper';


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
                    wrappers: ['form-field'],
                },
            ],
        }),
    ],
})
export class USWDSFormlyInputModule { }