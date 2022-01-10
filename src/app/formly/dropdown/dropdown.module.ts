import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationExamplesPage } from '../../shared/examples-page/examples.component';
import {
  DocumentationComponentsSharedModule,
  DocumentationDemoList,
} from '../../shared/index';
import { FormlyBasicDropdownComponent } from './demos/basic/dropdown-basic.component';
import { DemoWrapperComponent } from '../../shared/demo-wrapper.component';
import { FormlyBasicDropdownModule } from './demos/basic/dropdown-basic.module';

declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Dropdown',
    type: FormlyBasicDropdownComponent,
    code: require('!!raw-loader!./demos/basic/dropdown-basic.component'),
    markup: require('!!raw-loader!./demos/basic/dropdown-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/dropdown-basic.module'),
    path: 'src/app/formly/dropdown/demos/basic',
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
    FormlyBasicDropdownModule,

  ],
})
export class FormlyDropdownModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('dropdown', DEMOS);
  }
}
