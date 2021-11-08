import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormlyInputModule, ROUTES as FORMLYINPUT_ROUTES } from './input/input.module'
import { FormlyMainComponent } from "./formly-main.component";
import { FormlyHomeBasicModule } from "./home/home-basic.module";
import { FormlyHomeBasicComponent } from "./home/home-basic.component";

import { FormlySearchModule, ROUTES as FORMLYSEARCH_ROUTES } from './search/search.module'
import { FormlyRadioModule, ROUTES as FORMLYRADIO_ROUTES } from './radio/radio.module';

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
            {
                path: 'radio',
                children: FORMLYRADIO_ROUTES
            },
            {
                path: 'search',
                children: FORMLYSEARCH_ROUTES
            },
        ]
    },

];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormlyInputModule,
        FormlyRadioModule,
        FormlySearchModule,
        FormlyHomeBasicModule,
    ],
    exports: [
        RouterModule,
    ]
})
export class FormlyRoutingModule { }
