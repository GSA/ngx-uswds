import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DocumentationComponentsSharedModule, DocumentationDemoList } from "../shared";
import { DemoWrapperComponent } from "../shared/demo-wrapper.component";
import { DocumentationExamplesPage } from "../shared/examples-page/examples.component";
import { CharacterCountBasicComponent } from "./demos/basic/character-count-basic.component";
import { CharacterCountBasicModule } from "./demos/basic/character-count-basic.module";


declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Character Counter',
    type: CharacterCountBasicComponent,
    code: require('!!raw-loader!./demos/basic/character-count-basic.component'),
    markup: require('!!raw-loader!./demos/basic/character-count-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/character-count-basic.module'),
    path: 'src/app/accordion/demos/basic',
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
          name: 'UsaCharacterCountModule',
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
    CharacterCountBasicModule,
  ],
})
export class CharacterCountModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('character-count', DEMOS);
  }
}