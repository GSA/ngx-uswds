import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationExamplesPage } from '../shared/examples-page/examples.component';
import {
  DocumentationComponentsSharedModule,
  DocumentationDemoList,
} from '../shared/index';
import { TableBasicComponent } from './demos/basic/table-basic.component';
import { TableBasicModule } from './demos/basic/table-basic.module';

import { DemoWrapperComponent } from '../shared/demo-wrapper.component';


declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Table',
    type: TableBasicComponent,
    code: require('!!raw-loader!./demos/basic/table-basic.component'),
    markup: require('!!raw-loader!./demos/basic/table-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/table-basic.module'),
    path: 'src/app/table/demos/basic',
  }
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
          type: 'components',
          name: 'UsaTableModule',
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
    TableBasicModule,
  ],
})
export class TableModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('table', DEMOS);
  }
}
