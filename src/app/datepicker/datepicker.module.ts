import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerBasicComponent } from './demos/datePicker-basic/datePicker-basic.component';
import { DatePickerBasicModule } from './demos/datePicker-basic/datePicker-basic.module';
import { DemoWrapperComponent } from '../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../shared/examples-page/examples.component';
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../shared';
import { DatePickerValidationComponent } from './demos/datePicker-validation/datePicker-validation.component';
import { DatePickerValidationModule } from './demos/datePicker-validation/datePicker-validation.module';

declare var require;

const DEMOS = {
  basic: {
    title: 'Basic Date Picker',
    type: DatePickerBasicComponent,
    code: require('!!raw-loader!./demos/datePicker-basic/datepicker-basic.component'),
    markup: require('!!raw-loader!./demos/datepicker-basic/datepicker-basic.component.html'),
    module: require('!!raw-loader!./demos/datepicker-basic/datepicker-basic.module'),
    path: 'src/app/datepicker/demos/datepicker-basic',
  },
  validations: {
    title: 'Date Picker Min/Max Validation',
    type: DatePickerValidationComponent,
    code: require('!!raw-loader!./demos/datepicker-validation/datepicker-validation.component'),
    markup: require('!!raw-loader!./demos/datepicker-validation/datepicker-validation.component.html'),
    module: require('!!raw-loader!./demos/datepicker-validation/datepicker-validation.module'),
    path: 'src/app/datePicker/demos/datepicker-validation',
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
          name: 'UsaDatePickerModule',
        },
      ],
    },
    children: [
      { path: 'examples', component: DocumentationExamplesPage },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DocumentationComponentsSharedModule,
    DatePickerBasicModule,
    DatePickerValidationModule,
  ]
})
export class DatePickerModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('datepicker', DEMOS);
  }
 }
