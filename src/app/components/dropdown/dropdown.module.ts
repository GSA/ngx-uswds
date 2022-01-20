import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DocumentationExamplesPage } from "../../shared/examples-page/examples.component";
import { DemoWrapperComponent } from "../../shared/demo-wrapper.component";
import { DropdownBasicComponent } from "./demos/basic/dropdown-basic.component";
import { DropdownBasicModule } from "./demos/basic/dropdown-basic.module";
import { DocumentationComponentsSharedModule, DocumentationDemoList } from "../../shared";
import { DropdownFormsModule } from "./demos/dropdown-forms/dropdown-forms.module";
import { DropdownFormsComponent } from './demos/dropdown-forms/dropdown-forms.component'


declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Dropdown',
    type: DropdownBasicComponent,
    code: require('!!raw-loader!./demos/basic/dropdown-basic.component'),
    markup: require('!!raw-loader!./demos/basic/dropdown-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/dropdown-basic.module'),
    path: 'src/app/components/dropdown/demos/basic',
  },
  forms: {
    title: 'Dropdown with Angular Forms',
    type: DropdownFormsComponent,
    code: require('!!raw-loader!./demos/dropdown-forms/dropdown-forms.component'),
    markup: require('!!raw-loader!./demos/dropdown-forms/dropdown-forms.component.html'),
    module: require('!!raw-loader!./demos/dropdown-forms/dropdown-forms.module'),
    path: 'src/app/components/dropdown/demos/dropdown-forms',
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
          name: 'UsaDropdownModule',
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
    DropdownBasicModule,
    DropdownFormsModule

  ],
})
export class DropdownModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('dropdown', DEMOS);
  }
}
