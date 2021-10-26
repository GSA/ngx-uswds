import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { USWDSFormlyInputComponent } from './input';


@NgModule({
    declarations: [USWDSFormlyInputComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'input',
                    component: USWDSFormlyInputComponent,
                },
            ],
        }),
    ],
})
export class USWDSFormlyInputModule { }