import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileInputBasicComponent } from './demos/file-input-basic/file-input-basic.component';
import { FileInputMultipleComponent } from './demos/file-input-multiple/file-input-multiple.component';
import { FileInputTypeComponent } from './demos/file-input-type/file-input-type.component';
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../shared';
import { DemoWrapperComponent } from '../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../shared/examples-page/examples.component';
import { FileInputBasicModule } from './demos/file-input-basic/file-input-basic.module';
import { FileInputMultipleModule } from './demos/file-input-multiple/file-input-multiple.module';
import { FileInputTypeModule } from './demos/file-input-type/file-input-type.module';
import { FileInputRemoveComponent } from './demos/file-input-remove/file-input-remove.component';
import { FileInputRemoveModule } from './demos/file-input-remove/file-input-remove.module';
import { FileInputUploadComponent } from './demos/file-input-upload/file-input-upload.component';
import { FileInputUploadModule } from './demos/file-input-upload/file-input-upload.module';

declare var require;

const DEMOS = {
  basic: {
    title: 'Single File Input',
    type: FileInputBasicComponent,
    code: require('!!raw-loader!./demos/file-input-basic/file-input-basic.component'),
    markup: require('!!raw-loader!./demos/file-input-basic/file-input-basic.component.html'),
    module: require('!!raw-loader!./demos/file-input-basic/file-input-basic.module'),
    path: 'src/app/file-input/demos/file-input-basic',
  },
  multiple: {
    title: 'Multiple File Input',
    type: FileInputMultipleComponent,
    code: require('!!raw-loader!./demos/file-input-multiple/file-input-multiple.component'),
    markup: require('!!raw-loader!./demos/file-input-multiple/file-input-multiple.component.html'),
    module: require('!!raw-loader!./demos/file-input-multiple/file-input-multiple.module'),
    path: 'src/app/file-input/demos/file-input-multiple',
  },
  serverLoad: {
    title: 'Upload to Server',
    type: FileInputUploadComponent,
    code: require('!!raw-loader!./demos/file-input-upload/file-input-upload.component'),
    markup: require('!!raw-loader!./demos/file-input-upload/file-input-upload.component.html'),
    module: require('!!raw-loader!./demos/file-input-upload/file-input-upload.module'),
    path: 'src/app/file-input/demos/file-input-upload',
  },
  acceptType: {
    title: 'Accept PDF and CSV Only',
    type: FileInputTypeComponent,
    code: require('!!raw-loader!./demos/file-input-type/file-input-type.component'),
    markup: require('!!raw-loader!./demos/file-input-type/file-input-type.component.html'),
    module: require('!!raw-loader!./demos/file-input-type/file-input-type.module'),
    path: 'src/app/file-input/demos/file-input-type',
  },
  removeFile: {
    title: 'Remove Files',
    type: FileInputRemoveComponent,
    code: require('!!raw-loader!./demos/file-input-remove/file-input-remove.component'),
    markup: require('!!raw-loader!./demos/file-input-remove/file-input-remove.component.html'),
    module: require('!!raw-loader!./demos/file-input-remove/file-input-remove.module'),
    path: 'src/app/file-input/demos/file-input-remove',
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
    FileInputBasicModule,
    FileInputMultipleModule,
    FileInputTypeModule,
    FileInputRemoveModule,
    FileInputUploadModule,
  ],
})
export class FileInputModule { 
  constructor(demoList: DocumentationDemoList) {
    demoList.register('file-input', DEMOS);
  }
}
