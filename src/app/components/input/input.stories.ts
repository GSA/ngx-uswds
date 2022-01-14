import { Meta, moduleMetadata } from "@storybook/angular";
import { UsaInputAffixDirective } from "@gsa-sam/ngx-uswds";
import { InputBasicModule } from "./input-basic/input-basic.module";
import { ANGULAR_CODESANDBOX } from "src/app/shared/sandbox/angular-dependencies";


const basicTemplate = require('!!raw-loader!./input-basic/input-basic.component.html');
const basicTs = require('!!raw-loader!./input-basic/input-basic.component.ts');
const basicModule = require('!!raw-loader!./input-basic/input-basic.module.ts')

const sandboxConfig = {
  files: {
    'input-basic.component.ts': basicTs.default,
    'input-basic.module.ts': basicModule.default,
    'input-basic.component.html': basicTemplate.default
  },
  moduleName: 'InputBasicModule',
  selector: 'input-basic'
};

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
  },
  parameters: {
    preview: [
      {
        tab: "input-basic.component.ts",
        template: basicTs.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
          tab: "input-template.html",
          template: basicTemplate.default,
          language: "html",
          copy: true,
          codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
        tab: "input-basic.module.ts",
        template: basicModule.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
    ],
  }
} as Meta;


export const Basic = (args) => ({
  template: `<input-basic [prefix]="'${args.prefix}'" [suffix]="'${args.suffix}'"></input-basic>`,
})
