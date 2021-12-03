import { Meta, moduleMetadata } from "@storybook/angular";
import { UsaDatePicker, UsaDatePickerButton, UsaDatePickerModule, UsaDatePickerWrapper } from '@gsa-sam/ngx-uswds';
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { action } from "@storybook/addon-actions";
import { FormsModule } from "@angular/forms";

declare var require: any;

const template = require('!!raw-loader!./datepicker-template.html')

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
      imports: [CommonModule, UsaDatePickerModule, BrowserAnimationsModule, FormsModule,],
    }),
  ],
  args: {},
} as Meta;


export const DatePickerBasic = (args) => ({
  template: template.default,
  props: {
    calendarOpen: actionsData.calendarOpen,
    calendarClosed: actionsData.calendarClosed,
  },
});
