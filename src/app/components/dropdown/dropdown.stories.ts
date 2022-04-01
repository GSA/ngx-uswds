import { Meta, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaDropdownComponent, UsaDropdownModule } from "@gsa-sam/ngx-uswds";
import {  ReactiveFormsModule } from '@angular/forms';
import { generateConfig } from "src/sandbox/sandbox-utils";
import { DropdownFormsModule } from "./dropdown-forms/dropdown-forms.module";

declare var require;

const basicTemplate = require('!!raw-loader!./dropdown-basic/dropdown-basic.component.html');

export default {
  title: 'Components/Dropdown',
  component: UsaDropdownComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, UsaDropdownModule, DropdownFormsModule, ReactiveFormsModule],
    }),
  ],
  args: {
    disabled: false,
    name: 'basicDropdown',
    options: [
      {
        label: '--Select--',
        value: null,
      },
      {
        label: 'Option A',
        value: 'value1'
      },
      {
        label: 'Option B',
        value: 'value2'
      },
      {
        label: 'Option C',
        value: 'value3'
      },
      {
        label: 'Option D',
        value: 'value4'
      },
      {
        label: 'Option E',
        value: 'value5'
      }
    ]
  }
} as Meta;


export const Basic = (args) => ({
  template: basicTemplate.default,
  props: args,
});
Basic.parameters = {
  preview: generateConfig('components/dropdown/dropdown-basic', 'DropdownBasicModule', 'dropdown-basic')
};


export const DropdownForms = () => ({
  template: `<dropdown-forms></dropdown-forms>`
});
DropdownForms.parameters = {
  preview: generateConfig('components/dropdown/dropdown-forms', 'DropdownFormsModule', 'dropdown-forms')
};
