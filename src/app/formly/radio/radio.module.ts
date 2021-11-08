import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationExamplesPage } from '../../shared/examples-page/examples.component';
import {
    DocumentationComponentsSharedModule,
    DocumentationDemoList,
} from '../../shared/index';
import { DemoWrapperComponent } from '../../shared/demo-wrapper.component';
import { FormlyBasicRadioComponent } from './demos/basic/radio-basic.component';
import { FormlyBasicRadioModule } from './demos/basic/radio-basic.module';

declare var require: any;

const DEMOS = {
    basic: {
        title: 'Basic Radio',
        type: FormlyBasicRadioComponent,
        code: require('!!raw-loader!./demos/basic/radio-basic.component'),
        markup: require('!!raw-loader!./demos/basic/radio-basic.component.html'),
        module: require('!!raw-loader!./demos/basic/radio-basic.module'),
        path: 'src/app/formly/radio/demos/basic',
    },

};

export const ROUTES = [
    { path: '', pathMatch: 'full', redirectTo: 'examples' },
    {
        path: '',
        component: DemoWrapperComponent,
        data: {
            items: [
                {
                    pkg: 'usa',
                    type: 'formly',
                    name: 'UsaFormlyModule',
                },
            ],
        },
        children: [
            { path: 'examples', component: DocumentationExamplesPage },
        ],
    },
];

@NgModule({
    imports: [
        CommonModule,
        DocumentationComponentsSharedModule,
        FormlyBasicRadioModule,

    ],
})
export class FormlyRadioModule {
    constructor(demoList: DocumentationDemoList) {
        demoList.register('radio', DEMOS);
    }
}
