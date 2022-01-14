import { componentWrapperDecorator, Meta, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaTooltipDirective, UsaTooltipModule } from "@gsa-sam/ngx-uswds";
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipBasicModule } from "./tooltip-basic/tooltip-basic.module";
import { ANGULAR_CODESANDBOX } from "src/app/shared/sandbox/angular-dependencies";

declare var require;

const template = require('!!raw-loader!./tooltip-basic/tooltip-basic.component.html');
const basicTs = require('!!raw-loader!./tooltip-basic/tooltip-basic.component.ts');
const basicModule = require('!!raw-loader!./tooltip-basic/tooltip-basic.module.ts')

const sandboxConfig = {
  files: {
    'tooltip-basic.component.ts': basicTs.default,
    'tooltip-basic.module.ts': basicModule.default,
    'tooltip-basic.component.html': template.default
  },
  moduleName: 'TooltipBasicModule',
  selector: 'tooltip-basic'
};


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
  parameters: {
    preview: [
      {
        tab: "tooltip-basic.component.ts",
        template: basicTs.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
          tab: "tooltip-template.html",
          template: template.default,
          language: "html",
          copy: true,
          codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
        tab: "tooltip-basic.module.ts",
        template: basicModule.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
    ],
  }
} as Meta;



const basicTemplate = (args) => ({
  template: `<tooltip-basic [position]="'${args.position}'" [title]="'${args.title}'">Tooltip</tooltip-basic>`,
});

export const Basic = basicTemplate.bind({});

