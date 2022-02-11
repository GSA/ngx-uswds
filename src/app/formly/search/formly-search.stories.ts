import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from "@ngx-formly/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormlyBasicSearchModule } from "./search-basic/search-basic.module";
import { UsaSearchComponent } from "@gsa-sam/ngx-uswds";
import { generateConfig } from "src/sandbox/sandbox-utils";

export default {
  title: 'Formly/Search',
  component: UsaSearchComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule, 
        UsaFormlyModule, 
        FormlyModule, 
        ReactiveFormsModule, 
        FormsModule, 
        FormlyBasicSearchModule,
      ],
    }),
  ],
  args: {
      placeholder: 'Search',
      label: 'Keyword Search',
      ariaLabel: 'Search Input',
      id: 'usa-search-demo',
      size: 'small',
      buttonText: 'Search',
      name: 'search'
  },
} as Meta;

declare var require;

const template = require('!!raw-loader!./search-basic/search-basic.component.html');

const FormControlTemplate: Story<UsaSearchComponent> = (args: any) => {

  const form = new FormGroup({});
  const model: any = {};
  const options: FormlyFormOptions = {};

  const fields: FormlyFieldConfig[] = [
    {
      key: 'search',
      type: 'search',
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
  preview: generateConfig('formly/search/search-basic', 'FormlyBasicSearchModule', 'formly-search-basic')
}
