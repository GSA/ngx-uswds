import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationExamplesPage } from '../../shared/examples-page/examples.component';
import {
  DocumentationComponentsSharedModule,
  DocumentationDemoList,
} from '../../shared/index';
import { FormlyBasicCheckboxComponent } from './demos/basic/checkbox-basic.component';
import { DemoWrapperComponent } from '../../shared/demo-wrapper.component';
import { FormlyBasicCheckboxModule } from './demos/basic/checkbox-basic.module';
import { FormlyMultiCheckboxModule } from './demos/multi-checkbox/multi-checkbox.module';
import { FormlyMultiCheckboxComponent } from './demos/multi-checkbox/multi-checkbox.component';

declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Checkbox',
    type: FormlyBasicCheckboxComponent,
    code: require('!!raw-loader!./demos/basic/checkbox-basic.component'),
    markup: require('!!raw-loader!./demos/basic/checkbox-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/checkbox-basic.module'),
    path: 'src/app/formly/checkbox/demos/basic',
  },
  // multi: {
  //   title: 'Multiple Checkbox',
  //   type: FormlyMultiCheckboxComponent,
  //   code: require('!!raw-loader!./demos/multi-checkbox/multi-checkbox.component'),
  //   markup: require('!!raw-loader!./demos/multi-checkbox/multi-checkbox.component.html'),
  //   module: require('!!raw-loader!./demos/multi-checkbox/multi-checkbox.module'),
  //   path: 'src/app/formly/checkbox/demos/multi-checkbox',
  // },

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
    FormlyBasicCheckboxModule,
    FormlyMultiCheckboxModule
  ],
})
export class FormlyCheckboxModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('checkbox', DEMOS);
  }
}
