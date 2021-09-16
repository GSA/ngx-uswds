import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerBasicComponent } from './demos/datePicker-basic/datePicker-basic.component';
import { DatePickerBasicModule } from './demos/datePicker-basic/datePicker-basic.module';
import { DemoWrapperComponent } from '../shared/demo-wrapper.component';
import { DocumentationExamplesPage } from '../shared/examples-page/examples.component';
import { DocumentationComponentsSharedModule, DocumentationDemoList } from '../shared';
import { DatePickerValidationComponent } from './demos/datePicker-validation/datePicker-validation.component';
import { DatePickerValidationModule } from './demos/datePicker-validation/datePicker-validation.module';
import { DatepickerFilterComponent } from './demos/datepicker-filter/datepicker-filter.component';
import { DatepickerFilterModule } from './demos/datepicker-filter/datepicker-filter.module';
import { DatepickerDisabledComponent } from './demos/datepicker-disabled/datepicker-disabled.component';
import { DatepickerDisabledModule } from './demos/datepicker-disabled/datepicker-disabled.module';
import { DatepickerFormatComponent } from './demos/datepicker-format/datepicker-format.component';
import { DatepickerFormatModule } from './demos/datepicker-format/datepicker-format.module';
import { DatepickerFooterComponent } from './demos/datepicker-footer/datepicker-footer.component';
import { DatepickerFooterModule } from './demos/datepicker-footer/datepicker-footer.module';

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
    path: 'src/app/datepicker/demos/datepicker-validation',
  },
  filter: {
    title: 'Date Picker Filter - Weekdays Only',
    type: DatepickerFilterComponent,
    code: require('!!raw-loader!./demos/datepicker-filter/datepicker-filter.component'),
    markup: require('!!raw-loader!./demos/datepicker-filter/datepicker-filter.component.html'),
    module: require('!!raw-loader!./demos/datepicker-filter/datepicker-filter.module'),
    path: 'src/app/datepicker/demos/datepicker-filter',
  },
  disabled: {
    title: 'Date Picker Disabled',
    type: DatepickerDisabledComponent,
    code: require('!!raw-loader!./demos/datepicker-disabled/datepicker-disabled.component'),
    markup: require('!!raw-loader!./demos/datepicker-disabled/datepicker-disabled.component.html'),
    module: require('!!raw-loader!./demos/datepicker-disabled/datepicker-disabled.module'),
    path: 'src/app/datepicker/demos/datepicker-disabled',
  },
  format: {
    title: 'Date Picker Custom Format',
    type: DatepickerFormatComponent,
    code: require('!!raw-loader!./demos/datepicker-format/datepicker-format.component'),
    markup: require('!!raw-loader!./demos/datepicker-format/datepicker-format.component.html'),
    module: require('!!raw-loader!./demos/datepicker-format/datepicker-format.module'),
    path: 'src/app/datepicker/demos/datepicker-format',
  },
  footer: {
    title: 'General Accessibility',
    type: DatepickerFooterComponent,
    code: require('!!raw-loader!./demos/datepicker-footer/datepicker-footer.component'),
    markup: require('!!raw-loader!./demos/datepicker-footer/datepicker-footer.component.html'),
    module: require('!!raw-loader!./demos/datepicker-footer/datepicker-footer.module'),
    path: 'src/app/datepicker/demos/datepicker-footer',
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
    DatepickerFilterModule,
    DatepickerDisabledModule,
    DatepickerFormatModule,
    DatepickerFooterModule,
  ]
})
export class DatePickerModule {
  constructor(demoList: DocumentationDemoList) {
    demoList.register('datepicker', DEMOS);
  }
 }
