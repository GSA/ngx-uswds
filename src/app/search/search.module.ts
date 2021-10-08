import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../shared';
import { DemoWrapperComponent } from '../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../shared/examples-page/examples.component';
import { SearchBasicComponent } from "./demos/basic/search-basic.component";
import { SearchBasicModule } from "./demos/basic/search-basic.module";
import { SearchCustomButtonTextComponent } from "./demos/custom-button-text/search-custom-button-text.component";
import { SearchCustomButtonTextModule } from "./demos/custom-button-text/search-custom-button-text.module";
import { SearchOnChangeComponent } from "./demos/onchange/search-onchange.component";
import { SearchOnChangeModule } from "./demos/onchange/search-onchange.module";
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
  customButtonText: {
    title: 'Custom Button Text ',
    type: SearchCustomButtonTextComponent,
    code: require('!!raw-loader!./demos/custom-button-text/search-custom-button-text.component'),
    markup: require('!!raw-loader!./demos/custom-button-text/search-custom-button-text.component.html'),
    module: require('!!raw-loader!./demos/custom-button-text/search-custom-button-text.module'),
    path: 'src/app/search/demos/custom-button-text',
  },
  onchange: {
    title: 'Search text change event and OnBlur ',
    type: SearchOnChangeComponent,
    code: require('!!raw-loader!./demos/onchange/search-onchange.component'),
    markup: require('!!raw-loader!./demos/onchange/search-onchange.component.html'),
    module: require('!!raw-loader!./demos/onchange/search-onchange.module'),
    path: 'src/app/search/demos/onchange',
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
    SearchOnChangeModule,
    SearchCustomButtonTextModule

  ],
})
export class SearchModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('search', DEMOS);
  }
}
