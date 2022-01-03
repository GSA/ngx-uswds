import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../../shared';
import { DemoWrapperComponent } from '../../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../../shared/examples-page/examples.component';
import { RangeSliderBasicComponent } from "./demos/basic/range-slider-basic.component";
import { RangeSliderBasicModule } from './demos/basic/range-slider-basic.module';

declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Range Slider',
    type: RangeSliderBasicComponent,
    code: require('!!raw-loader!./demos/basic/range-slider-basic.component'),
    markup: require('!!raw-loader!./demos/basic/range-slider-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/range-slider-basic.module'),
    path: 'src/app/range-slider/demos/basic',
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
          name: 'UsaRangeSliderModule',
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
    RangeSliderBasicModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class RangeSliderModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('range-slider', DEMOS);
  }
}
