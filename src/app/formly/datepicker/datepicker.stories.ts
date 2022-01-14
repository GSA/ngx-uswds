// import { Meta, moduleMetadata } from "@storybook/angular";
// import { CommonModule } from "@angular/common";
// import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
// import { FormlyFieldConfig, FormlyModule } from "@ngx-formly/core";
// import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { UsaSearchModule } from "@gsa-sam/ngx-uswds";

// function getArgs(args) {
//   return       { 
//     model: args.model,
//     fields: args.fields,
//   }
// }


// const model: any = {search: ''};

// const fields: FormlyFieldConfig[] = [
//   {
//     key: 'search',
//     type: 'search',
//     templateOptions: {
//       placeholder: 'Search',
//       label: 'Keyword Search',
//       ariaLabel: 'Search Input',
//       id: 'usa-search-demo',
//       size: 'small',
//       buttonText: 'Search',
//       name: 'search'
//     },
//   }];


// const template = `
//   <formly-form [model]="model" [fields]="fields" [options]="options" [form]="form"></formly-form>
// `
// export default {
//   title: 'Formly/Search',
//   decorators: [
//     moduleMetadata({
//       imports: [CommonModule, UsaFormlyModule, FormlyModule.forRoot(), ReactiveFormsModule, UsaSearchModule, FormsModule],
//     }),
//   ],
//   args: {
//     model,
//     fields,
//   },
// } as Meta;

// export const SearchBasic = (args) => ({
//   template: template,
//   props: getArgs(args),
// });


import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from "@ngx-formly/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormlyBasicDatepickerModule } from "./datepicker-basic/datepicker-basic.module";
import { ANGULAR_CODESANDBOX } from "src/app/shared/sandbox/angular-dependencies";
import { UsaDatePickerInput, UsaSearchComponent } from "@gsa-sam/ngx-uswds";

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

const componentTs = require('!!raw-loader!./datepicker-basic/datepicker-basic.component.ts');
const template = require('!!raw-loader!./datepicker-basic/datepicker-basic.component.html');
const moduleTs = require('!!raw-loader!./datepicker-basic/datepicker-basic.module.ts');

const sandboxConfig = {
  files: {
    'datepicker-basic.component.ts': componentTs.default,
    'datepicker-basic.component.html': template.default,
    'datepicker-basic.module.ts': moduleTs.default,
  },
  moduleName: 'FormlyBasicDatepickerModule',
  selector: 'formly-datepicker-basic'
};


Basic.parameters = {
  preview: [
    {
      tab: "datepicker-basic.component.ts",
      template: componentTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
    {
        tab: "datepicker-basic.component.html",
        template: template.default,
        language: "html",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
    {
      tab: "datepicker-basic.module.ts",
      template: moduleTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
    },
  ],
}
