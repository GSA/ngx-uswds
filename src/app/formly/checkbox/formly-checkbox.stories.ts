import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
import { FormlyFieldConfig, FormlyForm, FormlyFormOptions, FormlyModule } from "@ngx-formly/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormlyBasicCheckboxModule } from "./checkbox-basic/checkbox-basic.module";
import { ANGULAR_CODESANDBOX } from "src/app/shared/sandbox/angular-dependencies";
import { FormlyMultiCheckboxModule } from "./multi-checkbox/multi-checkbox.module";

declare var require;

export default {
  title: 'Formly/Checkbox',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule, 
        UsaFormlyModule, 
        FormlyModule, 
        ReactiveFormsModule, 
        FormsModule, 
        FormlyBasicCheckboxModule,
        FormlyMultiCheckboxModule
      ],
    }),
  ],
  args: {
    label: 'Label for Checkbox',
    description: 'Description for Checkbox',
  },
} as Meta;

const FormControlTemplate: Story<FormlyForm> = (args: any) => {

  const form = new FormGroup({});
  const model: any = {};
  const options: FormlyFormOptions = {};

  const fields: FormlyFieldConfig[] = [
    {
      key: 'checkboxDemo',
      type: 'checkbox',
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

const componentTs = require('!!raw-loader!./checkbox-basic/checkbox-basic.component.ts');
const template = require('!!raw-loader!./checkbox-basic/checkbox-basic.component.html');
const moduleTs = require('!!raw-loader!./checkbox-basic/checkbox-basic.module.ts');

const sandboxConfig = {
  files: {
    'checkbox-basic.component.ts': componentTs.default,
    'checkbox-basic.component.html': template.default,
    'checkbox-basic.module.ts': moduleTs.default,
  },
  moduleName: 'FormlyBasicRadioModule',
  selector: 'formly-checkbox-basic'
};


Basic.parameters = {
  preview: [
    {
      tab: "checkbox-basic.component.ts",
      template: componentTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
    {
        tab: "checkbox-basic.component.html",
        template: template.default,
        language: "html",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
    {
      tab: "checkbox-basic.module.ts",
      template: moduleTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
  ],
}


/** ------------ MultiCheckbox ------------------- */
export const MultiCheckbox = () => ({
  template: `<formly-multi-checkbox></formly-multi-checkbox>`
})

const multiComponentTs = require('!!raw-loader!./multi-checkbox/multi-checkbox.component.ts');
const multiTemplate = require('!!raw-loader!./multi-checkbox/multi-checkbox.component.html');
const multiModuleTs = require('!!raw-loader!./multi-checkbox/multi-checkbox.module.ts');

const multiSandboxConfig = {
  files: {
    'multi-checkbox.component.ts': componentTs.default,
    'multi-checkbox.component.html': template.default,
    'multi-checkbox.module.ts': moduleTs.default,
  },
  moduleName: 'FormlyMultiCheckboxModule',
  selector: 'formly-multi-checkbox'
};


MultiCheckbox.parameters = {
  preview: [
    {
      tab: "multi-checkbox.component.ts",
      template: multiComponentTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(multiSandboxConfig.files, multiSandboxConfig.moduleName, multiSandboxConfig.selector),
    },
    {
        tab: "multi-checkbox.component.html",
        template: multiTemplate.default,
        language: "html",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(multiSandboxConfig.files, multiSandboxConfig.moduleName, multiSandboxConfig.selector),
    },
    {
      tab: "multi-checkbox.module.ts",
      template: multiModuleTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(multiSandboxConfig.files, multiSandboxConfig.moduleName, multiSandboxConfig.selector),
    },
  ],
}
