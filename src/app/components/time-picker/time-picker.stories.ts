import { Meta, moduleMetadata } from "@storybook/angular";
import { UsaTimePicker, UsaTimePickerModule } from "@gsa-sam/ngx-uswds";
import { generateConfig } from "src/app/shared/sandbox/sandbox-utils";

export default {
  title: 'Components/TimePicker',
  component: UsaTimePicker,
  decorators: [
    moduleMetadata({
      imports: [UsaTimePickerModule],
    }),
  ],
  args: {
    minTime: '00:00',
    maxTime: '23:59',
    timeStep: 30,
  },
  argTypes: {
    minTime: {type: 'string'},
    maxTime: {type: 'string'},
  }
} as Meta;

const basicTemplate = require('!!raw-loader!./time-picker-basic/time-picker-basic.component.html');

export const Basic = (args) => ({
  template: basicTemplate.default,
  props: {
    minTime: args.minTime,
    maxTime: args.maxTime,
    timeStep: args.timeStep,
    filterBy: args.filterBy,
  }
});

Basic.parameters = {
  preview: generateConfig('components/time-picker/time-picker-basic', 'TimePickerBasicModule', 'time-picker-basic')
};
