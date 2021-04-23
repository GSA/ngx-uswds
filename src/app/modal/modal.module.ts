import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaModalModule, USWDSCardModule } from 'uswds-components';
import { DemoWrapperComponent } from '../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../shared/examples-page/examples.component';
import { ModalBasicModule } from './demos/basic/modal-basic.module';
import { ModalBasicComponent } from './demos/basic/modal-basic.component';
import { DocumentationDemoList } from '../shared';
import { ModalLargeModule } from './demos/modal-large/modal-large.module';
import { DisableAnimationModule } from './demos/disable-animation/disable-animation.module';
import { ModalForcedActionComponent } from './demos/modal-forced-action/modal-forced-action.component';
import { ModalForcedActionModule } from './demos/modal-forced-action/modal-forced-action.module';
import { ModalLargeComponent } from './demos/modal-large/modal-large.component';
import { ModalComponentWrapperModule } from './demos/modal-component-content/modal-component-wrapper.module';
import { ModalCustomFocusModule } from './demos/modal-custom-focus/modal-custom-focus.module';
import { ModalStackedModule } from './demos/modal-stacked/modal-stacked.module';
import { ModalStackedComponent } from './demos/modal-stacked/modal-stacked.component';
import { ModalScrollableContentComponent } from './demos/modal-scrollable-content/modal-scrollable-content.component';
import { ModalScrollableContentModule } from './demos/modal-scrollable-content/modal-scrollable-content.module';
import { ModalComponentWrapper } from './demos/modal-component-content/modal-component-wrapper.component';
import { ModalCustomFocusComponent } from './demos/modal-custom-focus/modal-custom-focus.component';
import { DisableAnimationComponent } from './demos/disable-animation/disable-animation.component';
import { FooterComponent } from './demos/footer/footer.component';
import { FooterModule } from './demos/footer/footer.module';


declare var require: any;

const DEMOS = {
  basic: {
    title: 'Modal Basic',
    type: ModalBasicComponent,
    code: require('!!raw-loader!./demos/basic/modal-basic.component'),
    markup: require('!!raw-loader!./demos/basic/modal-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/modal-basic.module'),
    path: 'src/app/modal/demos/basic',
  },
  modalLarge: {
    title: 'Modal Large',
    type: ModalLargeComponent,
    code: require('!!raw-loader!./demos/modal-large/modal-large.component'),
    markup: require('!!raw-loader!./demos/modal-large/modal-large.component.html'),
    module: require('!!raw-loader!./demos/modal-large/modal-large.module'),
    path: 'src/app/modal/demos/modal-large',
  },
  disableAnimation: {
    title: 'Modal Disable Animation',
    type: DisableAnimationComponent,
    code: require('!!raw-loader!./demos/disable-animation/disable-animation.component'),
    markup: require('!!raw-loader!./demos/disable-animation/disable-animation.component.html'),
    module: require('!!raw-loader!./demos/disable-animation/disable-animation.module'),
    path: 'src/app/modal/demos/disable-animation',
  },
  forcedAction: {
    title: 'Modal Force User Action',
    type: ModalForcedActionComponent,
    code: require('!!raw-loader!./demos/modal-forced-action/modal-forced-action.component'),
    markup: require('!!raw-loader!./demos/modal-forced-action/modal-forced-action.component.html'),
    module: require('!!raw-loader!./demos/modal-forced-action/modal-forced-action.module'),
    path: 'src/app/modal/demos/modal-forced-action',
  },
  componentContent: {
    title: 'Use Component Reference for Modal',
    type: ModalComponentWrapper,
    code: require('!!raw-loader!./demos/modal-component-content/modal-component-wrapper.component'),
    markup: require('!!raw-loader!./demos/modal-component-content/modal-component-wrapper.component.html'),
    module: require('!!raw-loader!./demos/modal-component-content/modal-component-wrapper.module'),
    path: 'src/app/modal/demos/modal-component-content',
  },
  customFocus: {
    title: 'Modal Set Initial Focus Element on Open',
    type: ModalCustomFocusComponent,
    code: require('!!raw-loader!./demos/modal-custom-focus/modal-custom-focus.component'),
    markup: require('!!raw-loader!./demos/modal-custom-focus/modal-custom-focus.component.html'),
    module: require('!!raw-loader!./demos/modal-custom-focus/modal-custom-focus.module'),
    path: 'src/app/modal/demos/modal-custom-focus',
  },
  modalStacked: {
    title: 'Modal Stacked',
    type: ModalStackedComponent,
    code: require('!!raw-loader!./demos/modal-stacked/modal-stacked.component'),
    markup: require('!!raw-loader!./demos/modal-stacked/modal-stacked.component.html'),
    module: require('!!raw-loader!./demos/modal-stacked/modal-stacked.module'),
    path: 'src/app/modal/demos/modal-stacked',
  },
  modalScrollable: {
    title: 'Modal Scrollable',
    type: ModalScrollableContentComponent,
    code: require('!!raw-loader!./demos/modal-scrollable-content/modal-scrollable-content.component'),
    markup: require('!!raw-loader!./demos/modal-scrollable-content/modal-scrollable-content.component.html'),
    module: require('!!raw-loader!./demos/modal-scrollable-content/modal-scrollable-content.module'),
    path: 'src/app/modal/demos/modal-scrollable-content',
  },
  modalFooter: {
    title: '',
    type: FooterComponent,
    code: require('!!raw-loader!./demos/footer/footer.component'),
    markup: require('!!raw-loader!./demos/footer/footer.component.html'),
    module: require('!!raw-loader!./demos/footer/footer.module'),
    path: 'src/app/modal/demos/footer',
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
          name: 'UsaModalModule',
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
    UsaModalModule,
    USWDSCardModule,
    ModalBasicModule,
    ModalLargeModule,
    DisableAnimationModule,
    ModalForcedActionModule,
    ModalComponentWrapperModule,
    ModalCustomFocusModule,
    ModalStackedModule,
    ModalScrollableContentModule,
    FooterModule,
  ]
})
export class ModalModule { 
  constructor(demoList: DocumentationDemoList) {
    demoList.register('modal', DEMOS);
  }
}
