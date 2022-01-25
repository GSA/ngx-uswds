import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../../shared';
import { DemoWrapperComponent } from '../../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../../shared/examples-page/examples.component';
import { ComboBoxMockService } from "./combo-box-dummy-service";
import { ComboBoxBasicComponent } from "./demos/combo-box-basic/combo-box-basic.component";
import { ComboBoxBasicModule } from "./demos/combo-box-basic/combo-box-basic.module";

declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Combo Box',
    type: ComboBoxBasicComponent,
    code: require('!!raw-loader!./demos/combo-box-basic/combo-box-basic.component'),
    markup: require('!!raw-loader!./demos/combo-box-basic/combo-box-basic.component.html'),
    module: require('!!raw-loader!./demos/combo-box-basic/combo-box-basic.module'),
    path: 'src/app/components/combo-box/combo-box-basic',
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
          name: 'UsaComboBoxModule',
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
    ComboBoxBasicModule,
  ],
  providers: [
    ComboBoxMockService
  ]
})
export class ComboboxModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('combo-box', DEMOS);
  }
}
