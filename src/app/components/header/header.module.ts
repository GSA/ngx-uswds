
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../../shared';
import { DemoWrapperComponent } from '../../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../../shared/examples-page/examples.component';
import { HeaderPrimaryComponent } from "./demos/header-primary/header-primary.component";
import { HeaderPrimaryModule } from "./demos/header-primary/header-primary.module";
import { HeaderExtendedTemplateComponent } from "./demos/header-extended-template/header-extended-template.component";
import { HeaderExtendedTemplateModule } from "./demos/header-extended-template/header-extended-template.module";
import { HeaderExtendedComponent } from "./demos/header-extended/header-extended.component";
import { HeaderExtendedModule } from "./demos/header-extended/header-extended.module";
import { HeaderPrimaryTemplateComponent } from "./demos/header-primary-template/header-primary-template.component";
import { HeaderPrimaryTemplateModule } from "./demos/header-primary-template/header-primary-template.module";
import { HeaderFooterComponent } from "./demos/header-footer/header-footer.component";
import { HeaderFooterModule } from "./demos/header-footer/header-footer.module";


declare var require: any;

const DEMOS = {
  basic: {
    title: 'Header Primary Navigation',
    type: HeaderPrimaryComponent,
    code: require('!!raw-loader!./demos/header-primary/header-primary.component'),
    markup: require('!!raw-loader!./demos/header-primary/header-primary.component.html'),
    module: require('!!raw-loader!./demos/header-primary/header-primary.module'),
    path: 'src/app/components/header/demos/header-primary',
  },
  megamenu: {
    title: 'Primary Navigation Template Header',
    type: HeaderPrimaryTemplateComponent,
    code: require('!!raw-loader!./demos/header-primary-template/header-primary-template.component'),
    markup: require('!!raw-loader!./demos/header-primary-template/header-primary-template.component.html'),
    module: require('!!raw-loader!./demos/header-primary-template/header-primary-template.module'),
    path: 'src/app/components/header/demos/header-primary-template',
  },
  extended: {
    title: 'Extended Header',
    type: HeaderExtendedComponent,
    code: require('!!raw-loader!./demos/header-extended/header-extended.component'),
    markup: require('!!raw-loader!./demos/header-extended/header-extended.component.html'),
    module: require('!!raw-loader!./demos/header-extended/header-extended.module'),
    path: 'src/app/components/header/demos/header-extended',
  },
  extendedTemplate: {
    title: 'Extended Template Header',
    type: HeaderExtendedTemplateComponent,
    code: require('!!raw-loader!./demos/header-extended-template/header-extended-template.component'),
    markup: require('!!raw-loader!./demos/header-extended-template/header-extended-template.component.html'),
    module: require('!!raw-loader!./demos/header-extended-template/header-extended-template.module'),
    path: 'src/app/components/header/demos/header-extended-template',
  },
  footer: {
    title: 'General Accessibility',
    type: HeaderFooterComponent,
    code: require('!!raw-loader!./demos/header-footer/header-footer.component'),
    markup: require('!!raw-loader!./demos/header-footer/header-footer.component.html'),
    module: require('!!raw-loader!./demos/header-footer/header-footer.module'),
    path: 'src/app/components/header/demos/header-footer',
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
    HeaderPrimaryModule,
    HeaderExtendedModule,
    HeaderPrimaryTemplateModule,
    HeaderExtendedTemplateModule,
    HeaderFooterModule,
  ],
})
export class HeaderModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('header', DEMOS);
  }
}
