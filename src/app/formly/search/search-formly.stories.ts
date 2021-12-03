import { Meta, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaFormlyModule } from "@gsa-sam/uswds-formly";
import { FormlyFieldConfig, FormlyModule } from "@ngx-formly/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsaSearchComponent, UsaSearchModule } from "@gsa-sam/ngx-uswds";

function getArgs(args) {
  return       { 
    model: args.model,
    fields: args.fields,
  }
}


const model: any = {search: ''};

const fields: FormlyFieldConfig[] = [
  {
    key: 'search',
    type: 'search',
    templateOptions: {
      placeholder: 'Search',
      label: 'Keyword Search',
      ariaLabel: 'Search Input',
      id: 'usa-search-demo',
      size: 'small',
      buttonText: 'Search',
      name: 'search'
    },
  }];


const template = `
  <formly-form [model]="model" [fields]="fields" [options]="options" [form]="form"></formly-form>
`
export default {
  title: 'Formly/Search',
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

export const SearchBasic = (args) => ({
  template: template,
  props: getArgs(args),
});
