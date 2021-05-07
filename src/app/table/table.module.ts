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
import { MultiHeaderComponent } from './demos/multi-header/multi-header.component';
import { MultiHeaderModule } from './demos/multi-header/multi-header.module';
import { SortableTableModule } from './demos/sortable-table/sortable-table.module';
import { SortableTableComponent } from './demos/sortable-table/sortable-table.component';
import { DynamicTableComponent } from './demos/dynamic-table/dynamic-table.component';
import { DynamicTableModule } from './demos/dynamic-table/dynamic-table.module';
import { TableFooterComponent } from './demos/table-footer/table-footer.component';
import { TableFooterModule } from './demos/table-footer/table-footer.module';


declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Table',
    type: TableBasicComponent,
    code: require('!!raw-loader!./demos/basic/table-basic.component'),
    markup: require('!!raw-loader!./demos/basic/table-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/table-basic.module'),
    path: 'src/app/table/demos/basic',
  },
  multiHeader: {
    title: 'Multiple Headers Table',
    type: MultiHeaderComponent,
    code: require('!!raw-loader!./demos/multi-header/multi-header.component'),
    markup: require('!!raw-loader!./demos/multi-header/multi-header.component.html'),
    module: require('!!raw-loader!./demos/multi-header/multi-header.module'),
    path: 'src/app/table/demos/multi-header',
  },
  sortableTable: {
    title: 'Sortable Table',
    type: SortableTableComponent,
    code: require('!!raw-loader!./demos/sortable-table/sortable-table.component'),
    markup: require('!!raw-loader!./demos/sortable-table/sortable-table.component.html'),
    module: require('!!raw-loader!./demos/sortable-table/sortable-table.module'),
    path: 'src/app/table/demos/sortable-table',
  },
  dynamicTble: {
    title: 'Dynamic Table',
    type: DynamicTableComponent,
    code: require('!!raw-loader!./demos/dynamic-table/dynamic-table.component'),
    markup: require('!!raw-loader!./demos/dynamic-table/dynamic-table.component.html'),
    module: require('!!raw-loader!./demos/dynamic-table/dynamic-table.module'),
    path: 'src/app/table/demos/dynamic-table',
  },
  footer: {
    title: '',
    type: TableFooterComponent,
    code: require('!!raw-loader!./demos/table-footer/table-footer.component'),
    markup: require('!!raw-loader!./demos/table-footer/table-footer.component.html'),
    module: require('!!raw-loader!./demos/table-footer/table-footer.module'),
    path: 'src/app/table/demos/table-footer',
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
    MultiHeaderModule,
    SortableTableModule,
    DynamicTableModule,
    TableFooterModule,
  ]
})
export class TableModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('table', DEMOS);
  }
}
