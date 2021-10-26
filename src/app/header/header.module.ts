
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../shared';
import { DemoWrapperComponent } from '../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../shared/examples-page/examples.component';
import { HeaderBasicComponent } from "./demos/header-basic/header-basic.component";
import { HeaderBasicModule } from "./demos/header-basic/header-basic.module";


declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Header',
    type: HeaderBasicComponent,
    code: require('!!raw-loader!./demos/header-basic/header-basic.component'),
    markup: require('!!raw-loader!./demos/header-basic/header-basic.component.html'),
    module: require('!!raw-loader!./demos/header-basic/header-basic.module'),
    path: 'src/app/nav/demos/header-basic',
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
          name: 'UsaHeaderModule',
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
    HeaderBasicModule,
  ],
})
export class HeaderModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('header', DEMOS);
  }
}
