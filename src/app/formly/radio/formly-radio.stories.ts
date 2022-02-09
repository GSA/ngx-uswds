import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
import { FormlyFieldConfig, FormlyForm, FormlyFormOptions, FormlyModule } from "@ngx-formly/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormlyBasicRadioModule } from "./radio-basic/radio-basic.module";
import { generateConfig } from "src/sandbox/sandbox-utils";

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


declare var require;

const template = require('!!raw-loader!./radio-basic/radio-basic.component.html');

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
  preview: generateConfig('formly/radio/radio-basic', 'FormlyBasicRadioModule', 'formly-radio-basic')
}
