import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
import { FormlyFieldConfig, FormlyForm, FormlyFormOptions, FormlyModule } from "@ngx-formly/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormlyBasicCheckboxModule } from "./checkbox-basic/checkbox-basic.module";
import { FormlyMultiCheckboxModule } from "./multi-checkbox/multi-checkbox.module";
import { generateConfig } from "src/sandbox/sandbox-utils";

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



const template = require('!!raw-loader!./checkbox-basic/checkbox-basic.component.html');

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
  preview: generateConfig('formly/checkbox/checkbox-basic', 'FormlyBasicCheckboxModule', 'formly-checkbox-basic')
}


/** ------------ MultiCheckbox ------------------- */
export const MultiCheckbox = () => ({
  template: `<formly-multi-checkbox></formly-multi-checkbox>`
})

MultiCheckbox.parameters = {
  preview: generateConfig('formly/checkbox/multi-checkbox', 'FormlyMultiCheckboxModule', 'formly-multi-checkbox')
}
