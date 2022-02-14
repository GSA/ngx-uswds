import { componentWrapperDecorator, Meta, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaTooltipDirective, UsaTooltipModule } from "@gsa-sam/ngx-uswds";
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipBasicModule } from "./tooltip-basic/tooltip-basic.module";
import { generateConfig } from "src/sandbox/sandbox-utils";

export default {
  title: 'Components/Tooltip',
  component: UsaTooltipDirective,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, UsaTooltipModule, ReactiveFormsModule, TooltipBasicModule],
    }),
    componentWrapperDecorator((story) => `<div style="margin: 6rem">${story}</div>`)
  ],
  args: {
    position: 'top',
    title: 'Tooltip Text'
  },
  argTypes: {
    title: {type: 'string'}
  }
} as Meta;



const basicTemplate = (args) => ({
  template: `<tooltip-basic [position]="'${args.position}'" [title]="'${args.title}'">Tooltip</tooltip-basic>`,
});

export const Basic = basicTemplate.bind({});

Basic.parameters = {
  preview: generateConfig('components/tooltip/tooltip-basic', 'TooltipBasicModule', 'tooltip-basic')
}


