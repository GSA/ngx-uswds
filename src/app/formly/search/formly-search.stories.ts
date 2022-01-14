import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from "@ngx-formly/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormlyBasicSearchModule } from "./search-basic/search-basic.module";
import { ANGULAR_CODESANDBOX } from "src/app/shared/sandbox/angular-dependencies";
import { UsaSearchComponent } from "@gsa-sam/ngx-uswds";

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

const componentTs = require('!!raw-loader!./search-basic/search-basic.component.ts');
const template = require('!!raw-loader!./search-basic/search-basic.component.html');
const moduleTs = require('!!raw-loader!./search-basic/search-basic.module.ts');

const sandboxConfig = {
  files: {
    'search-basic.component.ts': componentTs.default,
    'search-basic.component.html': template.default,
    'search-basic.module.ts': moduleTs.default,
  },
  moduleName: 'FormlyBasicSearchModule',
  selector: 'formly-search-basic'
};


Basic.parameters = {
  preview: [
    {
      tab: "search-basic.component.ts",
      template: componentTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
    {
        tab: "search-basic.component.html",
        template: template.default,
        language: "html",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
    {
      tab: "search-basic.module.ts",
      template: moduleTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
  ],
}
