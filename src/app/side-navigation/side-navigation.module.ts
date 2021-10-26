import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsaSidenavModule } from 'uswds-components';
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../shared';
import { DemoWrapperComponent } from '../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../shared/examples-page/examples.component';
import { SideNavigationToggleSingleComponent } from './demos/toggle-single/side-navigation-toggle-single.component';
import { SideNavigationToggleSingleModule } from './demos/toggle-single/side-navigation-toggle-single.module';
import { SideNavigationToggleMultiModule } from './demos/toggle-multi/side-navigation-toggle-multi.module';
import { SideNavigationToggleMultiComponent } from './demos/toggle-multi/side-navigation-toggle-multi.component';
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
  toggleSingle: {
    title: 'Toggleable Side Nav - Single',
    type: SideNavigationToggleSingleComponent,
    code: require('!!raw-loader!./demos/toggle-multi/side-navigation-toggle-multi.component'),
    markup: require('!!raw-loader!./demos/toggle-multi/side-navigation-toggle-multi.component.html'),
    module: require('!!raw-loader!./demos/toggle-multi/side-navigation-toggle-multi.module'),
    path: 'src/app/side-navigation/demos/toggle-multi',
  },
  toggleMulti: {
    title: 'Toggleable Side Nav - Multiple',
    type: SideNavigationToggleMultiComponent,
    code: require('!!raw-loader!./demos/toggle-multi/side-navigation-toggle-multi.component'),
    markup: require('!!raw-loader!./demos/toggle-multi/side-navigation-toggle-multi.component.html'),
    module: require('!!raw-loader!./demos/toggle-multi/side-navigation-toggle-multi.module'),
    path: 'src/app/side-navigation/demos/toggle-multi',
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
    SideNavigationToggleMultiModule,
    SideNavigationStaticModule,
    SideNavigationToggleSingleModule
  ]
})
export class SideNavigationModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('side-navigation', DEMOS);
  }
}
