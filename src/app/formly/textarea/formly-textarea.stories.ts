import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { UsaFormlyModule } from '@gsa-sam/uswds-formly';
import {
  FormlyFieldConfig,
  FormlyFormOptions,
  FormlyModule,
} from '@ngx-formly/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { generateConfig } from 'src/sandbox/sandbox-utils';
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
    label: 'Basic Formly Textarea',
  },
} as Meta;

declare var require;

const template = require('!!raw-loader!./textarea-basic/textarea-basic.component.html');

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

Basic.parameters = {
  preview: generateConfig(
    'formly/textarea/textarea-basic',
    'FormlyBasicTextareaModule',
    'formly-textarea-basic'
  ),
};
