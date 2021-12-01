import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../../shared';
import { DemoWrapperComponent } from '../../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../../shared/examples-page/examples.component';
import { InputPrefixComponent } from './demos/prefix/input-prefix.component';
import { InputPrefixModule } from './demos/prefix/input-prefix.module';
declare var require: any;

const DEMOS = {
  basic: {
    title: 'Input with prefix',
    type: InputPrefixComponent,
    code: require('!!raw-loader!./demos/prefix/input-prefix.component'),
    markup: require('!!raw-loader!./demos/prefix/input-prefix.component.html'),
    module: require('!!raw-loader!./demos/prefix/input-prefix.module'),
    path: 'src/app/input/demos/prefix',
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
    InputPrefixModule
  ],
})
export class InputModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('input', DEMOS);
  }
}
