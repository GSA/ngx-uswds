import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerBasicComponent } from './demos/datepicker-basic/datepicker-basic.component';
import { DatepickerBasicModule } from './demos/datepicker-basic/datepicker-basic.module';
import { DemoWrapperComponent } from '../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../shared/examples-page/examples.component';
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../shared';

declare var require;

const DEMOS = {
  basic: {
    title: 'Basic Datepicker',
    type: DatepickerBasicComponent,
    code: require('!!raw-loader!./demos/datepicker-basic/datepicker-basic.component'),
    markup: require('!!raw-loader!./demos/datepicker-basic/datepicker-basic.component.html'),
    module: require('!!raw-loader!./demos/datepicker-basic/datepicker-basic.module'),
    path: 'src/app/datepicker/demos/datepicker-basic',
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
          name: 'UsaDatepickerModules',
        },
      ],
    },
    children: [
      { path: 'examples', component: DocumentationExamplesPage },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DocumentationComponentsSharedModule,
    DatepickerBasicModule,
  ]
})
export class DatepickerModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('datepicker', DEMOS);
  }
 }
