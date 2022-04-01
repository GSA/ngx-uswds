
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from "@ngx-formly/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormlyBasicDatepickerModule } from "./datepicker-basic/datepicker-basic.module";
import { UsaDatePickerInput, UsaSearchComponent } from "@gsa-sam/ngx-uswds";
import { generateConfig } from "src/sandbox/sandbox-utils";

export default {
  title: 'Formly/Datepicker',
  component: UsaDatePickerInput,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule, 
        UsaFormlyModule, 
        FormlyModule, 
        ReactiveFormsModule, 
        FormsModule, 
        FormlyBasicDatepickerModule,
      ],
    }),
  ],
  args: {
      label: 'Start Date',
      max: undefined,
      min: undefined,
  },
  argTypes: {
    max: {type: 'string'},
    min: {type: 'string'},
  }
} as Meta;

const template = require('!!raw-loader!./datepicker-basic/datepicker-basic.component.html');

const FormControlTemplate: Story<UsaSearchComponent> = (args: any) => {

  const form = new FormGroup({});
  const model: any = {};
  const options: FormlyFormOptions = {};

  const fields: FormlyFieldConfig[] = [
    {
      key: 'date',
      type: 'datepicker',
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
  preview: generateConfig('formly/datepicker/datepicker-basic', 'FormlyBasicDatepickerModule', 'formly-datepicker-basic')
}
