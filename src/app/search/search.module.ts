import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DocumentationComponentsSharedModule, DocumentationDemoList } from "../shared";
import { DemoWrapperComponent } from "../shared/demo-wrapper.component";
import { DocumentationExamplesPage } from "../shared/examples-page/examples.component";
import { SearchBasicComponent } from "../search/demos/basic/search-basic.component"
import { SearchBasicModule } from '../search/demos/basic/search-basic.module';
declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Character Counter',
    type: SearchBasicComponent,
    code: require('!!raw-loader!./demos/basic/search-basic.component'),
    markup: require('!!raw-loader!./demos/basic/search-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/search-basic.module'),
    path: 'src/app/search/demos/basic',
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
          name: 'UsaSearchModule',
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
    SearchBasicModule,
  ],
})
export class SearchModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('search', DEMOS);
  }
}
