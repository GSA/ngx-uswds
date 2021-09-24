import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../shared';
import { DemoWrapperComponent } from '../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../shared/examples-page/examples.component';
import { SearchBasicComponent } from "./demos/basic/search-basic.component";
import { SearchBasicModule } from "./demos/basic/search-basic.module";

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
  // forms: {
  //   title: 'Radio with Angular Forms',
  //   type: RadioFormsComponent,
  //   code: require('!!raw-loader!./demos/radio-forms/radio-forms.component'),
  //   markup: require('!!raw-loader!./demos/radio-forms/radio-forms.component.html'),
  //   module: require('!!raw-loader!./demos/radio-forms/radio-forms.module'),
  //   path: 'src/app/radio/demos/radio-forms',
  // },

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

  ],
})
export class SearchModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('search', DEMOS);
  }
}
