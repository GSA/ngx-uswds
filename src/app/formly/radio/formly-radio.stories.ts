import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
import { FormlyFieldConfig, FormlyForm, FormlyFormOptions, FormlyModule } from "@ngx-formly/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormlyBasicRadioModule } from "./radio-basic/radio-basic.module";
import { ANGULAR_CODESANDBOX } from "src/app/shared/sandbox/angular-dependencies";

export default {
  title: 'Formly/Radio',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, UsaFormlyModule, FormlyModule, ReactiveFormsModule, FormsModule, FormlyBasicRadioModule],
    }),
  ],
  args: {
    label: 'Historical Figures',
    options: [
      {
        value: 'sojourner-truth',
        label: 'Sojourner Truth',
      },
      {
        value: 'frederick-douglass',
        label: 'Frederick Douglass',
      },
      {
        value: 'booker-t-washington',
        label: 'Booker T.Washington',
      },
      {
        value: 'george-washington-carver',
        label: 'George Washington Carver',
      },
      {
        value: 'other',
        label: 'Other',
      },
    ]
  },
} as Meta;

const FormControlTemplate: Story<FormlyForm> = (args: any) => {

  const form = new FormGroup({});
  const model: any = {};
  const options: FormlyFormOptions = {};

  const fields: FormlyFieldConfig[] = [
    {
      key: 'historical-figures',
      type: 'radio',
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

const componentTs = require('!!raw-loader!./radio-basic/radio-basic.component.ts');
const template = require('!!raw-loader!./radio-basic/radio-basic.component.html');
const moduleTs = require('!!raw-loader!./radio-basic/radio-basic.module.ts');

const sandboxConfig = {
  files: {
    'radio-basic.component.ts': componentTs.default,
    'radio-basic.component.html': template.default,
    'radio-basic.module.ts': moduleTs.default,
  },
  moduleName: 'FormlyBasicRadioModule',
  selector: 'formly-radio-basic'
};


Basic.parameters = {
  preview: [
    {
      tab: "radio-basic.component.ts",
      template: componentTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
    {
        tab: "radio-basic.component.html",
        template: template.default,
        language: "html",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
    {
      tab: "radio-basic.module.ts",
      template: moduleTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
  ],
}
