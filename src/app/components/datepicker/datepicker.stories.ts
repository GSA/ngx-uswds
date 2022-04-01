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
import { generateConfig } from "src/sandbox/sandbox-utils";

declare var require: any;

const template = require('!!raw-loader!./datepicker-basic/datepicker-basic.component.html');

const footer = require('!!raw-loader!./datepicker-overview.html');


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
} as Meta;

export const Overview = () => ({
  template: footer.default,
});
Overview.parameters = {options: {showPanel: false}};


export const DatePickerBasic = () => ({
  template: template.default,
  props: {
    calendarOpen: actionsData.calendarOpen,
    calendarClosed: actionsData.calendarClosed,
  },
});

DatePickerBasic.parameters = {
  preview: generateConfig('components/datepicker/datepicker-basic', 'DatepickerBasicModule', 'datepicker-basic')
}


export const DatepickerFilter = () => ({
  template: `<datepicker-filter></datepicker-filter>`
});

DatepickerFilter.parameters = {
  preview: generateConfig('components/datepicker/datepicker-filter', 'DatepickerFilterModule', 'datepicker-filter')
}


export const DatepickerFormat = () => ({
  template: `<datepicker-format></datepicker-format>`
});

DatepickerFormat.parameters = {
  preview: generateConfig('components/datepicker/datepicker-format', 'DatepickerFormatModule', 'datepicker-format')
}


export const DatepickerValidation = () => ({
  template: `<datepicker-validation></datepicker-validation>`
});

DatepickerValidation.parameters = {
  preview: generateConfig('components/datepicker/datepicker-validation', 'DatepickerValidationModule', 'datepicker-validation')
}


export const DatepickerDisabled = () => ({
  template: `<datepicker-disabled></datepicker-disabled>`
});

DatepickerDisabled.parameters = {
  preview: generateConfig('components/datepicker/datepicker-disabled', 'DatepickerDisabledModule', 'datepicker-disabled')
}
