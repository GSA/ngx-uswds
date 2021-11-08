import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationExamplesPage } from '../../shared/examples-page/examples.component';
import {
  DocumentationComponentsSharedModule,
  DocumentationDemoList,
} from '../../shared/index';
import { FormlyBasicSearchComponent } from './demos/basic/search-basic.component';
import { DemoWrapperComponent } from '../../shared/demo-wrapper.component';
import { FormlyBasicSearchModule } from './demos/basic/search-basic.module';

declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Search',
    type: FormlyBasicSearchComponent,
    code: require('!!raw-loader!./demos/basic/search-basic.component'),
    markup: require('!!raw-loader!./demos/basic/search-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/search-basic.module'),
    path: 'src/app/formly/search/demos/basic',
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
    FormlyBasicSearchModule,

  ],
})
export class FormlySearchModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('search', DEMOS);
  }
}
