import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
import { FormlyFieldConfig, FormlyForm, FormlyFormOptions, FormlyModule } from "@ngx-formly/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormlyBasicInputModule } from "./input-basic/input-basic.module";
import { ANGULAR_CODESANDBOX } from "src/app/shared/sandbox/angular-dependencies";

export default {
  title: 'Formly/Input',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, UsaFormlyModule, FormlyModule, ReactiveFormsModule, FormsModule, FormlyBasicInputModule],
    }),
  ],
  args: {
    characterCount: undefined,
    prefix: undefined,
    suffix: undefined,
    placeholder: 'Type Here...',
    label: 'Keyword Search',
    description: `For more information on how to use our keyword search, visit our <a href="#"> help guide </a>`,
    required: false,
  },
  argTypes: {
    characterCount: {type: 'number'},
    prefix: {type: 'string'},
    suffix: {type: 'string'},
  }
} as Meta;

const FormControlTemplate: Story<FormlyForm> = (args: any) => {

  const form = new FormGroup({});
  const model: any = {};
  const options: FormlyFormOptions = {};

  const fields: FormlyFieldConfig[] = [
    {
      key: 'search',
      type: 'input',
      templateOptions: args,
    }
  ];

  return {
    template: `
      <formly-form [model]="model" [fields]="fields" [options]="options" [form]="form"></formly-form>
      {{model |json}}
    `,
    props: {
      form,
      model,
      options,
      fields
    },
  }
};

export const Basic = FormControlTemplate.bind({});

declare var require;

const componentTs = require('!!raw-loader!./input-basic/input-basic.component.ts');
const template = require('!!raw-loader!./input-basic/input-basic.component.html');
const moduleTs = require('!!raw-loader!./input-basic/input-basic.module.ts');

const sandboxConfig = {
  files: {
    'input-basic.component.ts': componentTs.default,
    'input-basic.component.html': template.default,
    'input-basic.module.ts': moduleTs.default,
  },
  moduleName: 'FormlyBasicInputModule',
  selector: 'formly-input-basic'
};


Basic.parameters = {
  preview: [
    {
      tab: "input-basic.component.ts",
      template: componentTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
    {
        tab: "input-basic.component.html",
        template: template.default,
        language: "html",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
    {
      tab: "input-basic.module.ts",
      template: moduleTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
  ],
}
