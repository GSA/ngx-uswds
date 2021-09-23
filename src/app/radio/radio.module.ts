import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../shared';
import { DemoWrapperComponent } from '../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../shared/examples-page/examples.component';
import { RadioBasicComponent } from "./demos/basic/radio-basic.component";
import { RadioBasicModule } from "./demos/basic/radio-basic.module";
import { RadioFooterComponent } from "./demos/footer/radio-footer.component";
import { RadioFooterModule } from "./demos/footer/radio-footer.module";
import { RadioFormsComponent } from "./demos/radio-forms/radio-forms.component";
import { RadioFormsModule } from "./demos/radio-forms/radio-forms.module";

declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Radio',
    type: RadioBasicComponent,
    code: require('!!raw-loader!./demos/basic/radio-basic.component'),
    markup: require('!!raw-loader!./demos/basic/radio-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/radio-basic.module'),
    path: 'src/app/radio/demos/basic',
  },
  forms: {
    title: 'Radio with Angular Forms',
    type: RadioFormsComponent,
    code: require('!!raw-loader!./demos/radio-forms/radio-forms.component'),
    markup: require('!!raw-loader!./demos/radio-forms/radio-forms.component.html'),
    module: require('!!raw-loader!./demos/radio-forms/radio-forms.module'),
    path: 'src/app/radio/demos/radio-forms',
  },
  footer: {
    title: 'General Accessibility',
    type: RadioFooterComponent,
    code: require('!!raw-loader!./demos/footer/radio-footer.component'),
    markup: require('!!raw-loader!./demos/footer/radio-footer.component.html'),
    module: require('!!raw-loader!./demos/footer/radio-footer.module'),
    path: 'src/app/radio/demos/footer',
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
          name: 'UsaRadioModule',
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
    RadioBasicModule,
    RadioFormsModule,
    RadioFooterModule,
  ],
})
export class RadioModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('radio', DEMOS);
  }
}
