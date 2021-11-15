import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationExamplesPage } from '../../shared/examples-page/examples.component';
import {
  DocumentationComponentsSharedModule,
  DocumentationDemoList,
} from '../../shared/index';
import { FormlyBasicDatePickerComponent } from './demos/basic/datepicker-basic.component';
import { DemoWrapperComponent } from '../../shared/demo-wrapper.component';
import { FormlyBasicDatePickerModule } from './demos/basic/datepicker-basic.module';

declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Date Picker',
    type: FormlyBasicDatePickerComponent,
    code: require('!!raw-loader!./demos/basic/datepicker-basic.component'),
    markup: require('!!raw-loader!./demos/basic/datepicker-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/datepicker-basic.module'),
    path: 'src/app/formly/datepicker/demos/basic',
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
    FormlyBasicDatePickerModule,

  ],
})
export class FormlyDatePickerModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('datepicker', DEMOS);
  }
}
