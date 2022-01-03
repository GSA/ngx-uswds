import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationExamplesPage } from '../../shared/examples-page/examples.component';
import {
    DocumentationComponentsSharedModule,
    DocumentationDemoList,
} from '../../shared/index';
import { DemoWrapperComponent } from '../../shared/demo-wrapper.component';
import {FormlyBasicRangeSliderComponent } from './demos/basic/range-slider-basic.component'
import {FormlyBasicRangeSliderModule } from './demos/basic/range-slider-basic.module'

declare var require: any;

const DEMOS = {
    basic: {
        title: 'Basic Range Slider',
        type: FormlyBasicRangeSliderComponent,
        code: require('!!raw-loader!./demos/basic/range-slider-basic.component'),
        markup: require('!!raw-loader!./demos/basic/range-slider-basic.component.html'),
        module: require('!!raw-loader!./demos/basic/range-slider-basic.module'),
        path: 'src/app/formly/range-slider/demos/basic',
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
        FormlyBasicRangeSliderModule,

    ],
})
export class FormlyRangeSliderModule {
    constructor(demoList: DocumentationDemoList) {
        demoList.register('range-slider', DEMOS);
    }
}
