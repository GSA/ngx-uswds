import { Meta, moduleMetadata } from "@storybook/angular";
import { UsaDatePicker, UsaDatePickerButton, UsaDatePickerModule, UsaDatePickerWrapper } from '@gsa-sam/ngx-uswds';
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { action } from "@storybook/addon-actions";
import { FormsModule } from "@angular/forms";
import { DatepickerBasicComponent } from "./datepicker-basic/datepicker-basic.component";
import { DatepickerDisabledModule } from "./datepicker-disabled/datepicker-disabled.module";
import { DatepickerFilterModule } from "./datepicker-filter/datepicker-filter.module";
import { DatepickerFormatModule } from "./datepicker-format/datepicker-format.module";
import { DatepickerValidationModule } from "./datepicker-validation/datepicker-validation.module";
import { ANGULAR_CODESANDBOX } from "src/app/shared/sandbox/angular-dependencies";

declare var require: any;

const componentTs = require('!!raw-loader!./datepicker-basic/datepicker-basic.component.ts');
const template = require('!!raw-loader!./datepicker-basic/datepicker-basic.component.html');
const moduleTs = require('!!raw-loader!./datepicker-basic/datepicker-basic.module.ts');

const footer = require('!!raw-loader!./datepicker-footer.component.html');

const sandboxConfig = {
  files: {
    'datepicker-basic.component.ts': componentTs.default,
    'datepicker-basic.component.html': template.default,
    'datepicker-basic.module.ts': moduleTs.default,
  },
  moduleName: 'DatepickerBasicModule',
  selector: 'datepicker-basic'
};

const actionsData = {
  calendarOpen: action('Calendar Open'),
  calendarClosed: action('Calendar Closed'),
}

export default {
  title: 'Components/DatePicker',
  component: UsaDatePicker,
  subcomponents: 
  {
    UsaDatePickerWrapper, 
    UsaDatePickerButton
  },
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule, 
        UsaDatePickerModule, 
        BrowserAnimationsModule, 
        FormsModule,
        DatepickerDisabledModule,
        DatepickerFilterModule,
        DatepickerFormatModule,
        DatepickerValidationModule
      ],
      declarations: [ DatepickerBasicComponent ],
    }),
  ],
  parameters: {
    preview: [
      {
        tab: "datepicker-basic.component.ts",
        template: componentTs.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
          tab: "datepicker-template.html",
          template: template.default,
          language: "html",
          copy: true,
          codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
        tab: "datepicker-basic.module.ts",
        template: moduleTs.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
    ],
  }
} as Meta;


export const DatePickerBasic = () => ({
  template: template.default,
  props: {
    calendarOpen: actionsData.calendarOpen,
    calendarClosed: actionsData.calendarClosed,
  },
});

export const DatepickerFilter = () => ({
  template: `<datepicker-filter></datepicker-filter>`
});

export const DatepickerFormat = () => ({
  template: `<datepicker-format></datepicker-format>`
});

export const DatepickerValidate = () => ({
  template: `<datepicker-validation></datepicker-validation>`
});

export const DatepickerDisabled = () => ({
  template: `<datepicker-disabled></datepicker-disabled>`
});

export const Footer = () => ({
  template: footer.default,
});
