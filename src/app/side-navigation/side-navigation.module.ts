import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { USWDSSidenavModule } from 'uswds-components';
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../shared';
import { DemoWrapperComponent } from '../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../shared/examples-page/examples.component';
import { SideNavigationToggleModule } from './demos/toggle/side-navigation-toggle.module';
import { SideNavigationToggleComponent } from './demos/toggle/side-navigation-toggle.component';
import { SideNavigationStaticComponent } from './demos/static/side-navigation-static.component';
import { SideNavigationStaticModule } from './demos/static/side-navigation-static.module';


declare var require;

const DEMOS = {
  static: {
    title: 'Static Side Nav',
    type: SideNavigationStaticComponent,
    code: require('!!raw-loader!./demos/static/side-navigation-static.component'),
    markup: require('!!raw-loader!./demos/static/side-navigation-static.component.html'),
    module: require('!!raw-loader!./demos/static/side-navigation-static.module'),
    path: 'src/app/side-navigation/demos/static',
  },
  toggle: {
    title: 'Toggleable Side Nav',
    type: SideNavigationToggleComponent,
    code: require('!!raw-loader!./demos/toggle/side-navigation-toggle.component'),
    markup: require('!!raw-loader!./demos/toggle/side-navigation-toggle.component.html'),
    module: require('!!raw-loader!./demos/toggle/side-navigation-toggle.module'),
    path: 'src/app/side-navigation/demos/toggle',
  }
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
          name: 'UsaAccordionModules',
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
    // USWDSSidenavModule,
    SideNavigationToggleModule,
    SideNavigationStaticModule
  ]
})
export class SideNavigationModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('side-navigation', DEMOS);
  }
}
