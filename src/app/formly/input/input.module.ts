import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationExamplesPage } from '../../shared/examples-page/examples.component';
import {
  DocumentationComponentsSharedModule,
  DocumentationDemoList,
} from '../../shared/index';
import { FormlyBasicInputComponent } from './demos/basic/input-basic.component';
import { DemoWrapperComponent } from '../../shared/demo-wrapper.component';
import { FormlyBasicInputModule } from './demos/basic/input-basic.module';

declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Input',
    type: FormlyBasicInputComponent,
    code: require('!!raw-loader!./demos/basic/input-basic.component'),
    markup: require('!!raw-loader!./demos/basic/input-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/input-basic.module'),
    path: 'src/app/formly/input/demos/basic',
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
    FormlyBasicInputModule,

  ],
})
export class FormlyInputModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('input', DEMOS);
  }
}
