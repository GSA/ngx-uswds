import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { UsaFormlyModule } from '@gsa-sam/uswds-formly';
import {
  FormlyFieldConfig,
  FormlyFormOptions,
  FormlyModule,
} from '@ngx-formly/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { generateConfig } from 'src/app/shared/sandbox/sandbox-utils';
import { FormlyBasicTextareaModule } from './textarea-basic/textarea-basic.module';
import { UsaTextareaComponent } from '@gsa-sam/ngx-uswds';

export default {
  title: 'Formly/Textarea',
  component: UsaTextareaComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        UsaFormlyModule,
        FormlyModule,
        ReactiveFormsModule,
        FormsModule,
        FormlyBasicTextareaModule,
      ],
    }),
  ],
  args: {
    // placeholder: 'Search',
    // label: 'Keyword Search',
    // ariaLabel: 'Search Input',
    // id: 'usa-search-demo',
    // size: 'small',
    // buttonText: 'Search',
    // name: 'search',
  },
} as Meta;

declare var require;

const componentTs = require('!!raw-loader!./textarea-basic/textarea-basic.component.ts');
const template = require('!!raw-loader!./textarea-basic/textarea-basic.component.html');
const moduleTs = require('!!raw-loader!./textarea-basic/textarea-basic.module.ts');

const FormControlTemplate: Story<UsaTextareaComponent> = (args: any) => {
  const form = new FormGroup({});
  const model: any = {};
  const options: FormlyFormOptions = {};

  const fields: FormlyFieldConfig[] = [
    {
      key: 'textarea',
      type: 'textarea',
      templateOptions: args,
    },
  ];

  return {
    template: template.default,
    props: {
      form,
      model,
      options,
      fields,
    },
  };
};

export const Basic = FormControlTemplate.bind({});

const sandboxConfig = {
  files: {
    'textarea-basic.component.ts': componentTs.default,
    'textarea-basic.component.html': template.default,
    'textarea-basic.module.ts': moduleTs.default,
  },
  moduleName: 'FormlyBasicTextareaModule',
  selector: 'formly-textarea-basic',
};

Basic.parameters = {
  preview: generateConfig(
    'formly/textarea/textarea-basic',
    'FormlyBasicTextareaModule',
    'formly-textarea-basic'
  ),
};
