import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormlyInputModule, ROUTES as FORMLYINPUT_ROUTES } from './input/input.module'
import { FormlyMainComponent } from "./formly-main.component";
import { FormlyHomeBasicModule } from "./home/home-basic.module";
import { FormlyHomeBasicComponent } from "./home/home-basic.component";

const routes: Routes = [
    {
        path: '',
        component: FormlyMainComponent,
        children: [
            {
                path: '',
                component: FormlyHomeBasicComponent,
            },
            {
                path: 'input',
                children: FORMLYINPUT_ROUTES
            },
        ]
    },

];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormlyInputModule,
        FormlyHomeBasicModule,
    ],
    exports: [
        RouterModule,
    ]
})
export class FormlyRoutingModule { }
