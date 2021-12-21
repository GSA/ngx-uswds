import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../../shared';
import { DemoWrapperComponent } from '../../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../../shared/examples-page/examples.component';
import { InputBasicComponent } from './demos/basic/input-basic.component';
import { InputBasicModule } from './demos/basic/input-basic.module';
import { InputPrefixAndSuffixComponent } from './demos/prefix-and-suffix/input-prefix-and-suffix.component';
import { InputPrefixAndSuffixModule } from './demos/prefix-and-suffix/input-prefix-and-suffix.module';
import { InputPrefixComponent } from './demos/prefix/input-prefix.component';
import { InputPrefixModule } from './demos/prefix/input-prefix.module';
import { InputSuffixComponent } from './demos/suffix/input-suffix.component';
import { InputSuffixModule } from './demos/suffix/input-suffix.module';
declare var require: any;

const DEMOS = {
  basic: {
    title: 'Basic Input',
    type: InputBasicComponent,
    code: require('!!raw-loader!./demos/basic/input-basic.component'),
    markup: require('!!raw-loader!./demos/basic/input-basic.component.html'),
    module: require('!!raw-loader!./demos/basic/input-basic.module'),
    path: 'src/app/input/demos/basic',
  },
  prefix: {
    title: 'Input with prefix',
    type: InputPrefixComponent,
    code: require('!!raw-loader!./demos/prefix/input-prefix.component'),
    markup: require('!!raw-loader!./demos/prefix/input-prefix.component.html'),
    module: require('!!raw-loader!./demos/prefix/input-prefix.module'),
    path: 'src/app/input/demos/prefix',
  },
  suffix: {
    title: 'Input with suffix',
    type: InputSuffixComponent,
    code: require('!!raw-loader!./demos/suffix/input-suffix.component'),
    markup: require('!!raw-loader!./demos/suffix/input-suffix.component.html'),
    module: require('!!raw-loader!./demos/suffix/input-suffix.module'),
    path: 'src/app/input/demos/suffix',
  },
  prefixAndSuffix: {
    title: 'Input with prefix and suffix',
    type: InputPrefixAndSuffixComponent,
    code: require('!!raw-loader!./demos/prefix-and-suffix/input-prefix-and-suffix.component'),
    markup: require('!!raw-loader!./demos/prefix-and-suffix/input-prefix-and-suffix.component.html'),
    module: require('!!raw-loader!./demos/prefix-and-suffix/input-prefix-and-suffix.module'),
    path: 'src/app/input/demos/prefix-and-suffix',
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
          name: 'UsaAffixModule',
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
    InputPrefixModule,
    InputSuffixModule,
    InputPrefixAndSuffixModule,
    InputBasicModule
  ],
})
export class InputModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('input', DEMOS);
  }
}
