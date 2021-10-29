import { NgModule } from '@angular/core';
import { FormlyInputModule } from './input/input.module';
import { RouterModule, Routes } from '@angular/router';
import { FormlyInputComponent } from './input/input.component';
const routes: Routes = [
    {
        path: '',
        component: FormlyInputComponent
    },
    {
        path: 'input',
        component: FormlyInputComponent
    },
]

@NgModule({
    imports: [
        FormlyInputModule,
        RouterModule.forChild(routes),
    ],

    bootstrap: []
})
export class FormlyRoutingModule { }
