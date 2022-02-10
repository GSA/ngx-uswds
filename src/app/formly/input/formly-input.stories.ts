import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
import { FormlyFieldConfig, FormlyForm, FormlyFormOptions, FormlyModule } from "@ngx-formly/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormlyBasicInputModule } from "./input-basic/input-basic.module";
import { generateConfig } from "src/sandbox/sandbox-utils";

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

declare var require;

const template = require('!!raw-loader!./input-basic/input-basic.component.html');

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
    template: template.default,
    props: {
      form,
      model,
      options,
      fields
    },
  }
};

export const Basic = FormControlTemplate.bind({});

Basic.parameters = {
  preview: generateConfig('formly/input/input-basic', 'FormlyBasicInputModule', 'formly-input-basic')
}
