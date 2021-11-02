import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormlyInputModule, ROUTES as FORMLYINPUT_ROUTES } from './input/input.module'
import { FormlyHomeModule, ROUTES as FORMLYHOME_ROUTES } from './home/home.module'

const routes: Routes = [

    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        children: FORMLYHOME_ROUTES
    },
    {
        path: 'input',
        children: FORMLYINPUT_ROUTES
    },


];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormlyInputModule,
        FormlyHomeModule
    ],
    exports: [
        RouterModule,
    ]
})
export class FormlyRoutingModule { }
