import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  DocumentationComponentsSharedModule,
  DocumentationDemoList,
} from '../../shared';
import { DemoWrapperComponent } from '../../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../../shared/examples-page/examples.component';
import { TextareaBasicComponent } from './demos/basic/textarea-basic.component';
import { TextareaBasicModule } from './demos/basic/textarea-basic.module';
import { TextareaWrapperComponent } from './demos/wrapper/textarea-wrapper.component';
import { TextareaWrapperModule } from './demos/wrapper/textarea-wrapper.module';

declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Textarea',
    type: TextareaBasicComponent,
    code: require('!!raw-loader!./demos/basic/textarea-basic.component'),
    markup: require('!!raw-loader!./demos/basic/textarea-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/textarea-basic.module'),
    path: 'src/app/components/textarea/demos/basic',
  },
  wrapper: {
    title: 'Textarea with wrapper',
    type: TextareaWrapperComponent,
    code: require('!!raw-loader!./demos/wrapper/textarea-wrapper.component'),
    markup: require('!!raw-loader!./demos/wrapper/textarea-wrapper.component.html'),
    module: require('!!raw-loader!./demos/wrapper/textarea-wrapper.module'),
    path: 'src/app/components/textarea/demos/wrapper',
  },
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
          name: 'UsaTextareaModule',
        },
      ],
    },
    children: [{ path: 'examples', component: DocumentationExamplesPage }],
  },
];

@NgModule({
  imports: [
    CommonModule,
    DocumentationComponentsSharedModule,
    TextareaBasicModule,
    TextareaWrapperModule,
  ],
})
export class TextareaModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('textarea', DEMOS);
  }
}
