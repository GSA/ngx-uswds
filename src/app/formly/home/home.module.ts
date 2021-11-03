import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationExamplesPage } from '../../shared/examples-page/examples.component';
import {
  DocumentationComponentsSharedModule,
  DocumentationDemoList,
} from '../../shared/index';
import { FormlyHomeBasicComponent } from './demos/basic/home-basic.component';
import { DemoWrapperComponent } from '../../shared/demo-wrapper.component';
import { FormlyBasicHomeModule } from './demos/basic/home-basic.module';

declare var require: any;

const DEMOS = {
  basic: {
    title: 'Quick Start',
    type: FormlyHomeBasicComponent,
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
    FormlyBasicHomeModule,

  ],
})
export class FormlyHomeModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('home', DEMOS);
  }
}
