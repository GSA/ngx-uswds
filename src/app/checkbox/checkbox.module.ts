import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../shared';
import { DemoWrapperComponent } from '../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../shared/examples-page/examples.component';
import { CheckboxBasicComponent } from "./demos/basic/checkbox-basic.component";
import { CheckboxBasicModule } from "./demos/basic/checkbox-basic.module";
import { CheckboxFormsComponent } from "./demos/checkbox-forms/checkbox-forms.component";
import { CheckboxFormsModule } from "./demos/checkbox-forms/checkbox-forms.module";
import { CheckboxIndeterminateComponent } from "./demos/checkbox-indeterminate/checkbox-indeterminate.component";
import { CheckboxIndeterminateModule } from "./demos/checkbox-indeterminate/checkbox-indeterminate.module";
import { CheckboxFooterComponent } from "./demos/footer/checkbox-footer.component";
import { CheckboxFooterModule } from "./demos/footer/checkbox-footer.module";

declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Checkbox',
    type: CheckboxBasicComponent,
    code: require('!!raw-loader!./demos/basic/checkbox-basic.component'),
    markup: require('!!raw-loader!./demos/basic/checkbox-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/checkbox-basic.module'),
    path: 'src/app/checkbox/demos/basic',
  },
  forms: {
    title: 'Checkbox Forms',
    type: CheckboxFormsComponent,
    code: require('!!raw-loader!./demos/checkbox-forms/checkbox-forms.component'),
    markup: require('!!raw-loader!./demos/checkbox-forms/checkbox-forms.component.html'),
    module: require('!!raw-loader!./demos/checkbox-forms/checkbox-forms.module'),
    path: 'src/app/checkbox/demos/checkbox-forms',
  },
  indeterminate: {
    title: 'Indeterminate Checkbox',
    type: CheckboxIndeterminateComponent,
    code: require('!!raw-loader!./demos/checkbox-indeterminate/checkbox-indeterminate.component'),
    markup: require('!!raw-loader!./demos/checkbox-indeterminate/checkbox-indeterminate.component.html'),
    module: require('!!raw-loader!./demos/checkbox-indeterminate/checkbox-indeterminate.module'),
    path: 'src/app/checkbox/demos/checkbox-indeterminate',
  },
  footer: {
    title: 'General Accessibility',
    type: CheckboxFooterComponent,
    code: require('!!raw-loader!./demos/footer/checkbox-footer.component'),
    markup: require('!!raw-loader!./demos/footer/checkbox-footer.component.html'),
    module: require('!!raw-loader!./demos/footer/checkbox-footer.module'),
    path: 'src/app/checkbox/demos/footer',
  }
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
    CheckboxBasicModule,
    CheckboxIndeterminateModule,
    CheckboxFormsModule,
    CheckboxFooterModule,
  ],
})
export class CheckboxModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('checkbox', DEMOS);
  }
}
