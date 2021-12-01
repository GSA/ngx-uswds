import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../../shared';
import { DemoWrapperComponent } from '../../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../../shared/examples-page/examples.component';
import { InputBasicComponent } from './demos/basic/input-basic.component';
import { InputBasicModule } from './demos/basic/input-basic.module';
declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Input',
    type: InputBasicComponent,
    code: require('!!raw-loader!./demos/basic/input-basic.component'),
    markup: require('!!raw-loader!./demos/basic/input-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/input-basic.module'),
    path: 'src/app/input/demos/basic',
  },
}

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
          name: 'UsaCheckboxModule',
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
    InputBasicModule
  ],
})
export class InputModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('input', DEMOS);
  }
}
