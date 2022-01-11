import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationExamplesPage } from '../../shared/examples-page/examples.component';
import {
  DocumentationComponentsSharedModule,
  DocumentationDemoList,
} from '../../shared/index';
import { FormlyTextareaBasicComponent } from './demos/basic/textarea-basic.component';
import { DemoWrapperComponent } from '../../shared/demo-wrapper.component';
import { FormlyBasicTextareaModule } from './demos/basic/textarea-basic.module';

declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic TextArea',
    type: FormlyTextareaBasicComponent,
    code: require('!!raw-loader!./demos/basic/textarea-basic.component'),
    markup: require('!!raw-loader!./demos/basic/textarea-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/textarea-basic.module'),
    path: 'src/app/formly/textarea/demos/basic',
  },

};

export const ROUTES = [
  { path: '', pathMatch: 'full', redirectTo: 'examples' },
  {
    path: '',
    component: DemoWrapperComponent,
    children: [
      { path: 'examples', component: DocumentationExamplesPage },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    DocumentationComponentsSharedModule,
    FormlyBasicTextareaModule,
  ],
})
export class FormlyTextareaModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('textarea', DEMOS);
  }
}
