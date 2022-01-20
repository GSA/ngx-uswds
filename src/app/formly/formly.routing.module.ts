import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormlyInputModule, ROUTES as FORMLYINPUT_ROUTES } from './input/input.module'
import { FormlyMainComponent } from "./formly-main.component";
import { FormlyHomeBasicModule } from "./home/home-basic.module";
import { FormlyHomeBasicComponent } from "./home/home-basic.component";

import { FormlySearchModule, ROUTES as FORMLYSEARCH_ROUTES } from './search/search.module';
import { FormlyCheckboxModule, ROUTES as FORMLYCHECKBOX_ROUTES } from './checkbox/checkbox.module';
import { FormlyRadioModule, ROUTES as FORMLYRADIO_ROUTES } from './radio/radio.module';
import { FormlyDatePickerModule, ROUTES as FORMLYDATEPICKER_ROUTES } from "./datepicker/datepicker.module";
import { FormlyDropdownModule, ROUTES as FORMLYDROPDOWN_ROUTES } from "./dropdown/dropdown.module";

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
            {
                path: 'checkbox',
                children: FORMLYCHECKBOX_ROUTES
            },
            {
                path: 'datepicker',
                children: FORMLYDATEPICKER_ROUTES
            },
            {
                path: 'dropdown',
                children: FORMLYDROPDOWN_ROUTES
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
        FormlyCheckboxModule,
        FormlyDatePickerModule,
        FormlyDropdownModule,
        FormlyHomeBasicModule,
    ],
    exports: [
        RouterModule,
    ]
})
export class FormlyRoutingModule { }
