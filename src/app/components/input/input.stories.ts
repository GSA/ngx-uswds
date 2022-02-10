import { Meta, moduleMetadata } from "@storybook/angular";
import { UsaInputAffixDirective } from "@gsa-sam/ngx-uswds";
import { InputBasicModule } from "./input-basic/input-basic.module";
import { generateConfig } from "src/sandbox/sandbox-utils";

export default {
  title: 'Components/Input',
  component: UsaInputAffixDirective,
  decorators: [
    moduleMetadata({
      imports: [InputBasicModule],
    }),
  ],
  args: {
    prefix: '$',
    suffix: 'lbs.'
  },
  argTypes: {
    prefix: {type: 'string'},
    suffix: {type: 'string'},
  }
} as Meta;


export const Basic = (args) => ({
  template: `<input-basic [prefix]="'${args.prefix}'" [suffix]="'${args.suffix}'"></input-basic>`,
});

Basic.parameters = {
  preview: generateConfig('components/input/input-basic', 'InputBasicModule', 'input-basic')
};
