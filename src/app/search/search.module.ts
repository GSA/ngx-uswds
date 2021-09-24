import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../shared';
import { DemoWrapperComponent } from '../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../shared/examples-page/examples.component';
import { SearchBasicComponent } from "./demos/basic/search-basic.component";
import { SearchBasicModule } from "./demos/basic/search-basic.module";
import { SearchOptionalComponent } from "./demos/optional/search-optional.component";
import { SearchOptionalModule } from "./demos/optional/search-optional.module";

declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic search',
    type: SearchBasicComponent,
    code: require('!!raw-loader!./demos/basic/search-basic.component'),
    markup: require('!!raw-loader!./demos/basic/search-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/search-basic.module'),
    path: 'src/app/search/demos/basic',
  },
  optional: {
    title: 'Search Optional ',
    type: SearchOptionalComponent,
    code: require('!!raw-loader!./demos/optional/search-optional.component'),
    markup: require('!!raw-loader!./demos/optional/search-optional.component.html'),
    module: require('!!raw-loader!./demos/optional/search-optional.module'),
    path: 'src/app/search/demos/optional',
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
    SearchOptionalModule,

  ],
})
export class SearchModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('search', DEMOS);
  }
}
