

import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from "@ngx-formly/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsaDatePickerInput, UsaDropdownComponent } from "@gsa-sam/ngx-uswds";
import { generateConfig } from "src/sandbox/sandbox-utils";

export default {
  title: 'Formly/Dropdown',
  component: UsaDatePickerInput,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule, 
        UsaFormlyModule, 
        FormlyModule, 
        ReactiveFormsModule, 
        FormsModule, 
      ],
    }),
  ],
  args: {
    label: 'Formly Dropdown',
    description: 'Select a value from dropdown',
    disabled: false,
    options: [
      {
        label: 'Option A',
        value: 'A',
        disabled: false
      },
      {
        label: 'Option B',
        value: 'B',
        disabled: false
      },
      {
        label: 'Option C',
        value: 'C',
        disabled: false
      },
      {
        label: 'Option D',
        value: 'D',
        disabled: false
      },
      {
        label: 'Option E',
        value: 'E',
        disabled: false
      }
    ]
      
  },
  argTypes: {
    max: {type: 'string'},
    min: {type: 'string'},
  }
} as Meta;

const template = require('!!raw-loader!./dropdown-basic/dropdown-basic.component.html');

const FormControlTemplate: Story<UsaDropdownComponent> = (args: any) => {

  const form = new FormGroup({});
  const model: any = {};
  const options: FormlyFormOptions = {};

  const fields: FormlyFieldConfig[] = [
    {
      key: 'date',
      type: 'dropdown',
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

declare var require;

Basic.parameters = {
  preview: generateConfig('formly/dropdown/dropdown-basic', 'FormlyBasicDropdownModule', 'formly-dropdown-basic')
}
