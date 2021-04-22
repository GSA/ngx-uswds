import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { UsaModalModule, USWDSCardModule } from 'uswds-components';
import { ModalDefaultComponent } from './modal-default.component';
import { ModalForcedComponent } from './modal-forced.component';
import { ModalComponentContent, ModalComponentWrapper } from './modal-component-content';
import { ModalCustomFocusComponent } from './modal-custom-focus';
import { ModalScrollableComponent } from './modal-scrollable-content';
import { ModalStackedAComponent, ModalStackedBComponent } from './modal-stacked.component';
import { ModalDisableAnimationComponent } from './modal-disable-animation';
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
    type: ModalDisableAnimationComponent,
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
  declarations: [
    ModalComponent,
    ModalDefaultComponent,
    ModalForcedComponent,
    ModalComponentWrapper,
    ModalComponentContent,
    ModalCustomFocusComponent,
    ModalScrollableComponent,
    ModalStackedAComponent,
    ModalStackedBComponent,
    ModalDisableAnimationComponent,
  ],
  imports: [
    CommonModule,
    UsaModalModule,
    USWDSCardModule,
    ModalBasicModule,
    ModalLargeModule,
    DisableAnimationModule,
    ModalForcedActionModule,
  ],
  entryComponents: [
    ModalComponentContent,
    ModalStackedBComponent,
  ]
})
export class ModalModule { 
  constructor(demoList: DocumentationDemoList) {
    demoList.register('modal', DEMOS);
  }
}
