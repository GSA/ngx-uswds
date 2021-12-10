import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationExamplesPage } from '../../shared/examples-page/examples.component';
import {
  DocumentationComponentsSharedModule,
  DocumentationDemoList,
} from '../../shared/index';
import { FormlyBasicInputComponent } from './demos/basic/input-basic.component';
import { DemoWrapperComponent } from '../../shared/demo-wrapper.component';
import { FormlyBasicInputModule } from './demos/basic/input-basic.module';
import { FormlyCharacterCountInputModule } from './demos/character-count/input-character-count.module';
import { FormlyCharacterCountInputComponent } from './demos/character-count/input-character-count.component';
import { FormlySuffixInputComponent } from './demos/suffix/input-suffix.component';
import { FormlySuffixInputModule } from './demos/suffix/input-suffix.module';
import { FormlyPrefixInputComponent } from './demos/prefix/input-prefix.component';
import { FormlyPrefixInputModule } from './demos/prefix/input-prefix.module';

declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Input',
    type: FormlyBasicInputComponent,
    code: require('!!raw-loader!./demos/basic/input-basic.component'),
    markup: require('!!raw-loader!./demos/basic/input-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/input-basic.module'),
    path: 'src/app/formly/input/demos/basic',
  },
  characterCount: {
    title: 'Character Count Input',
    type: FormlyCharacterCountInputComponent,
    code: require('!!raw-loader!./demos/character-count/input-character-count.component'),
    markup: require('!!raw-loader!./demos/character-count/input-character-count.component.html'),
    module: require('!!raw-loader!./demos/character-count/input-character-count.module'),
    path: 'src/app/formly/input/demos/character-count',
  },
  prefix: {
    title: 'Input with Prefix',
    type: FormlyPrefixInputComponent,
    code: require('!!raw-loader!./demos/prefix/input-prefix.component'),
    markup: require('!!raw-loader!./demos/prefix/input-prefix.component.html'),
    module: require('!!raw-loader!./demos/prefix/input-prefix.module'),
    path: 'src/app/formly/input/demos/prefix',
  },
  suffix: {
    title: 'Input with Suffix',
    type: FormlySuffixInputComponent,
    code: require('!!raw-loader!./demos/suffix/input-suffix.component'),
    markup: require('!!raw-loader!./demos/suffix/input-suffix.component.html'),
    module: require('!!raw-loader!./demos/suffix/input-suffix.module'),
    path: 'src/app/formly/input/demos/suffix',
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
          type: 'formly',
          name: 'UsaFormlyModule',
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
    FormlyBasicInputModule,
    FormlyCharacterCountInputModule,
    FormlySuffixInputModule,
    FormlyPrefixInputModule

  ],
})
export class FormlyInputModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('input', DEMOS);
  }
}
