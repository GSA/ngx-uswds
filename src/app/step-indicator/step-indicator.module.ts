import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndicatorComponent } from './step-indicator.component';
import { UsaStepIndicatorModule, USWDSCardModule } from 'uswds-components';
import { DocumentationExamplesPage } from '../shared/examples-page/examples.component';
import { DemoWrapperComponent } from '../shared/demo-wrapper.component';
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../shared';
import { StepIndicatorBasicComponent } from './demos/basic/step-indicator-basic.component';
import { StepIndicatorBasicModule } from './demos/basic/step-indicator-basic.module';
import { StepIndicatorHideLabelsComponent } from './demos/step-indicator-hide-labels/step-indicator-hide-labels.component';
import { StepIndicatorHideLabelsModule } from './demos/step-indicator-hide-labels/step-indicator-hide-labels.module';
import { StepIndicatorCenterLabelsModule } from './demos/step-indicator-center-labels/step-indicator-center-labels.module';
import { StepIndicatorCenterLabelsComponent } from './demos/step-indicator-center-labels/step-indicator-center-labels.component';
import { StepIndicatorDisplayCountersComponent } from './demos/step-indicator-display-counters/step-indicator-display-counters.component';
import { StepIndicatorDisplayCountersModule } from './demos/step-indicator-display-counters/step-indicator-display-counters.module';
import { StepIndicatorDisplayCountersSmallComponent } from './demos/step-indicator-display-counters-small/step-indicator-display-counters-small.component';
import { StepIndicatorDisplayCountersSmallModule } from './demos/step-indicator-display-counters-small/step-indicator-display-counters-small.module';
import { StepIndicatorCenterCountersModule } from './demos/step-indicator-center-counters/step-indicator-center-counters.module';
import { StepIndicatorCenterCountersComponent } from './demos/step-indicator-center-counters/step-indicator-center-counters.component';
import { StepIndicatorHeaderTopComponent } from './demos/step-indicator-header-top/step-indicator-header-top.component';
import { StepIndicatorHeaderTopModule } from './demos/step-indicator-header-top/step-indicator-header-top.module';
import { StepIndicatorDisableStepComponent } from './demos/step-indicator-disable-step/step-indicator-disable-step.component';
import { StepIndicatorDisableStepModule } from './demos/step-indicator-disable-step/step-indicator-disable-step.module';
import { StepIndicatorCustomHeaderComponent } from './demos/step-indicator-custom-header/step-indicator-custom-header.component';
import { StepIndicatorCustomHeaderModule } from './demos/step-indicator-custom-header/step-indicator-custom-header.module';
import { StepIndicatorDisableAllStepsComponent } from './demos/step-indicator-disable-all-steps/step-indicator-disable-all-steps.component';
import { StepIndicatorDisableAllStepsModule } from './demos/step-indicator-disable-all-steps/step-indicator-disable-all-steps.module';
import { StepIndicatorFooterComponent } from './demos/step-indicator-footer/step-indicator-footer.component';
import { StepIndicatorFooterModule } from './demos/step-indicator-footer/step-indicator-footer.module';

declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Step Indicator',
    type: StepIndicatorBasicComponent,
    code: require('!!raw-loader!./demos/basic/step-indicator-basic.component'),
    markup: require('!!raw-loader!./demos/basic/step-indicator-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/step-indicator-basic.module'),
    path: 'src/app/step-indicator/demos/basic',
  },
  hideLabels: {
    title: 'Step Indicator - Hide Labels',
    type: StepIndicatorHideLabelsComponent,
    code: require('!!raw-loader!./demos/step-indicator-hide-labels/step-indicator-hide-labels.component'),
    markup: require('!!raw-loader!./demos/step-indicator-hide-labels/step-indicator-hide-labels.component.html'),
    module: require('!!raw-loader!./demos/step-indicator-hide-labels/step-indicator-hide-labels.module'),
    path: 'src/app/step-indicator/demos/step-indicator-hide-labels',
  },
  centerLabels: {
    title: 'Step Indicator - Center Labels',
    type: StepIndicatorCenterLabelsComponent,
    code: require('!!raw-loader!./demos/step-indicator-center-labels/step-indicator-center-labels.component'),
    markup: require('!!raw-loader!./demos/step-indicator-center-labels/step-indicator-center-labels.component.html'),
    module: require('!!raw-loader!./demos/step-indicator-center-labels/step-indicator-center-labels.module'),
    path: 'src/app/step-indicator/demos/step-indicator-center-labels',
  },
  displayCounters: {
    title: 'Step Indicator - Display Counters',
    type: StepIndicatorDisplayCountersComponent,
    code: require('!!raw-loader!./demos/step-indicator-display-counters/step-indicator-display-counters.component'),
    markup: require('!!raw-loader!./demos/step-indicator-display-counters/step-indicator-display-counters.component.html'),
    module: require('!!raw-loader!./demos/step-indicator-display-counters/step-indicator-display-counters.module'),
    path: 'src/app/step-indicator/demos/step-indicator-display-counters',
  },
  displayCountersSmall: {
    title: 'Step Indicator - Display Small Counters',
    type: StepIndicatorDisplayCountersSmallComponent,
    code: require('!!raw-loader!./demos/step-indicator-display-counters-small/step-indicator-display-counters-small.component'),
    markup: require('!!raw-loader!./demos/step-indicator-display-counters-small/step-indicator-display-counters-small.component.html'),
    module: require('!!raw-loader!./demos/step-indicator-display-counters-small/step-indicator-display-counters-small.module'),
    path: 'src/app/step-indicator/demos/step-indicator-display-counters-small',
  },
  centerCounters: {
    title: 'Step Indicator - Center Counters',
    type: StepIndicatorCenterCountersComponent,
    code: require('!!raw-loader!./demos/step-indicator-center-counters/step-indicator-center-counters.component'),
    markup: require('!!raw-loader!./demos/step-indicator-center-counters/step-indicator-center-counters.component.html'),
    module: require('!!raw-loader!./demos/step-indicator-center-counters/step-indicator-center-counters.module'),
    path: 'src/app/step-indicator/demos/step-indicator-center-counters',
  },
  headerTop: {
    title: 'Step Indicator - Top Header',
    type: StepIndicatorHeaderTopComponent,
    code: require('!!raw-loader!./demos/step-indicator-header-top/step-indicator-header-top.component'),
    markup: require('!!raw-loader!./demos/step-indicator-header-top/step-indicator-header-top.component.html'),
    module: require('!!raw-loader!./demos/step-indicator-header-top/step-indicator-header-top.module'),
    path: 'src/app/step-indicator/demos/step-indicator-header-top',
  },
  disableStep: {
    title: 'Step Indicator - Disable Single Step',
    type: StepIndicatorDisableStepComponent,
    code: require('!!raw-loader!./demos/step-indicator-disable-step/step-indicator-disable-step.component'),
    markup: require('!!raw-loader!./demos/step-indicator-disable-step/step-indicator-disable-step.component.html'),
    module: require('!!raw-loader!./demos/step-indicator-disable-step/step-indicator-disable-step.module'),
    path: 'src/app/step-indicator/demos/step-indicator-disable-step',
  },
  customHeader: {
    title: 'Step Indicator - Custom Template Header',
    type: StepIndicatorCustomHeaderComponent,
    code: require('!!raw-loader!./demos/step-indicator-custom-header/step-indicator-custom-header.component'),
    markup: require('!!raw-loader!./demos/step-indicator-custom-header/step-indicator-custom-header.component.html'),
    module: require('!!raw-loader!./demos/step-indicator-custom-header/step-indicator-custom-header.module'),
    path: 'src/app/step-indicator/demos/step-indicator-custom-header',
  },
  disableStepSelection: {
    title: 'Step Indicator - Disable Step Selection',
    type: StepIndicatorDisableAllStepsComponent,
    code: require('!!raw-loader!./demos/step-indicator-disable-all-steps/step-indicator-disable-all-steps.component'),
    markup: require('!!raw-loader!./demos/step-indicator-disable-all-steps/step-indicator-disable-all-steps.component.html'),
    module: require('!!raw-loader!./demos/step-indicator-disable-all-steps/step-indicator-disable-all-steps.module'),
    path: 'src/app/step-indicator/demos/step-indicator-disable-all-steps',
  },
  footer: {
    title: 'General Accessibility',
    type: StepIndicatorFooterComponent,
    code: require('!!raw-loader!./demos/step-indicator-footer/step-indicator-footer.component'),
    markup: require('!!raw-loader!./demos/step-indicator-footer/step-indicator-footer.component.html'),
    module: require('!!raw-loader!./demos/step-indicator-footer/step-indicator-footer.module'),
    path: 'src/app/step-indicator/demos/step-indicator-footer',
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
          name: 'UsaStepIndicatorModule',
        },
      ],
    },
    children: [
      { path: 'examples', component: DocumentationExamplesPage },
    ],
  },
];

@NgModule({
  declarations: [StepIndicatorComponent],
  imports: [
    CommonModule,
    DocumentationComponentsSharedModule,
    UsaStepIndicatorModule,
    USWDSCardModule,
    StepIndicatorBasicModule,
    StepIndicatorHideLabelsModule,
    StepIndicatorCenterLabelsModule,
    StepIndicatorDisplayCountersModule,
    StepIndicatorDisplayCountersSmallModule,
    StepIndicatorCenterCountersModule,
    StepIndicatorHeaderTopModule,
    StepIndicatorDisableStepModule,
    StepIndicatorCustomHeaderModule,
    StepIndicatorDisableAllStepsModule,
    StepIndicatorFooterModule,
  ],
  exports: [
    StepIndicatorComponent,
  ]
})
export class StepIndicatorModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('step-indicator', DEMOS);
  }
 }
