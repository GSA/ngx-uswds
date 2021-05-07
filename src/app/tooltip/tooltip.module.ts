import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UsaTooltipModule } from 'projects/uswds-components/src/lib/tooltip/tooltip.module';
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../shared';
import { DemoWrapperComponent } from '../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../shared/examples-page/examples.component';
import { TooltipComponent } from './tooltip.component';

declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Tooltip',
    type: TooltipComponent,
    code: require('!!raw-loader!./tooltip.component'),
    markup: require('!!raw-loader!./tooltip.component.html'),
    module: require('!!raw-loader!./tooltip.module'),
    path: 'src/app/tooltip',
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
          name: 'UsaTooltipModules',
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
    UsaTooltipModule,
  ],
  declarations: [
    TooltipComponent,
  ]
})
export class TooltipModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('tooltip', DEMOS);
  }
}
