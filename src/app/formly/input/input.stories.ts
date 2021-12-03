import { Meta, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
import { FormlyFieldConfig, FormlyModule } from "@ngx-formly/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsaSearchModule } from "@gsa-sam/ngx-uswds";


function getArgs(args) {
  return       { 
    model: args.model,
    fields: args.fields,
    form: args.form,
    options: args.options,
  }
}


const model: any = {input: ''};

const fields: FormlyFieldConfig[] = [
  {
    key: 'input',
    type: 'input',
    templateOptions: {
      label: 'Formly Input',
      description: 'Input field defined through formly',
      required: true
    },
  }
];

const template = `
  <formly-form [model]="model" [fields]="fields" [options]="options" [form]="form"></formly-form>
`

export default {
  title: 'Formly/Input',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, UsaFormlyModule, FormlyModule.forRoot(), ReactiveFormsModule, UsaSearchModule, FormsModule],
    }),
  ],
  args: {
    model,
    fields,
  },
} as Meta;

export const InputBasic = (args) => ({
  template: template,
  props: getArgs(args),
});
