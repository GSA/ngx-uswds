import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationExamplesPage } from '../shared/examples-page/examples.component';
import {
  DocumentationComponentsSharedModule,
  DocumentationDemoList,
} from '../shared/index';
import { AccordionComponent } from './demos/basic/accordion-basic.component';
import { DemoWrapperComponent } from '../shared/demo-wrapper.component';
import { AccordionBasicModule } from './demos/basic/accordion-basic.module';
import { AccordionMultiSelectComponent } from './demos/multi-select/accordion-multi-select.component';
import { AccordionMultiSelectModule } from './demos/multi-select/accordion-multi-select.module';
import { AccordionDisableAnimation } from './demos/disable-animation/disable-animation.component';
import { AccordionDisableAnimationModule } from './demos/disable-animation/disable-animation.module';
import { AccordionToggleModule } from './demos/accordion-toggle/accordion-toggle.module';
import { AccordionToggleComponent } from './demos/accordion-toggle/accordion-toggle.component';
import { PreventToggleModule } from './demos/prevent-toggle/prevent-toggle.module';
import { PreventToggleComponent } from './demos/prevent-toggle/prevent-toggle.component';
import { AccordionFooterComponent } from './demos/accordion-footer/accordion-footer.component';
import { AccordionFooterModule } from './demos/accordion-footer/accordion-footer.module';

declare var require: any;

const DEMOS = {
  basic: {
    title: 'Accordion Single Select',
    type: AccordionComponent,
    code: require('!!raw-loader!./demos/basic/accordion-basic.component'),
    markup: require('!!raw-loader!./demos/basic/accordion-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/accordion-basic.module'),
    path: 'src/app/accordion/demos/basic',
  },
  multiSelect: {
    title: 'Accordion Multi Select & Bordered',
    type: AccordionMultiSelectComponent,
    code: require('!!raw-loader!./demos/multi-select/accordion-multi-select.component'),
    markup: require('!!raw-loader!./demos/multi-select/accordion-multi-select.component.html'),
    module: require('!!raw-loader!./demos/multi-select/accordion-multi-select.module'),
    path: 'src/app/accordion/demos/multi-select',
  },
  disableAnimation: {
    title: 'Accordion Disable Animation',
    type: AccordionDisableAnimation,
    code: require('!!raw-loader!./demos/disable-animation/disable-animation.component'),
    markup: require('!!raw-loader!./demos/disable-animation/disable-animation.component.html'),
    module: require('!!raw-loader!./demos/disable-animation/disable-animation.module'),
    path: 'src/app/accordion/demos/disable-animation',
  },
  toggleExternally: {
    title: 'Accordion External Toggle',
    type: AccordionToggleComponent,
    code: require('!!raw-loader!./demos/accordion-toggle/accordion-toggle.component'),
    markup: require('!!raw-loader!./demos/accordion-toggle/accordion-toggle.component.html'),
    module: require('!!raw-loader!./demos/accordion-toggle/accordion-toggle.module'),
    path: 'src/app/accordion/demos/accordion-toggle',
  },
  preventToggle: {
    title: 'Accordion Prevent Panel Toggle',
    type: PreventToggleComponent,
    code: require('!!raw-loader!./demos/prevent-toggle/prevent-toggle.component'),
    markup: require('!!raw-loader!./demos/prevent-toggle/prevent-toggle.component.html'),
    module: require('!!raw-loader!./demos/prevent-toggle/prevent-toggle.module'),
    path: 'src/app/accordion/demos/prevent-toggle',
  },
  footer: {
    title: '',
    type: AccordionFooterComponent,
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
    AccordionBasicModule,
    AccordionMultiSelectModule,
    AccordionDisableAnimationModule,
    AccordionToggleModule,
    PreventToggleModule,
    AccordionFooterModule,
  ],
})
export class AccordionModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('accordion', DEMOS);
  }
}
