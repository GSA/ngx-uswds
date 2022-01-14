import { Meta, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaRadioComponent, UsaRadioGroupComponent, UsaRadioGroupLabel, UsaRadioLabelDescription, UsaRadioModule, UsaTableModule } from "@gsa-sam/ngx-uswds";
import {  ReactiveFormsModule } from '@angular/forms';
import { action } from "@storybook/addon-actions";
import { RadioFormsModule } from "./radio-forms/radio-forms.module";
import { ANGULAR_CODESANDBOX } from "src/app/shared/sandbox/angular-dependencies";

declare var require;

const basicTemplate = require('!!raw-loader!./radio-basic/radio-basic.component.html');
const basicTs = require('!!raw-loader!./radio-basic/radio-basic.component.ts');
const basicModule = require('!!raw-loader!./radio-basic/radio-basic.module.ts')
const footer = require('!!raw-loader!./radio-footer.component.html');

const sandboxConfig = {
  files: {
    'radio-basic.component.ts': basicTs.default,
    'radio-basic.module.ts': basicModule.default,
    'radio-basic.component.html': basicTemplate.default
  },
  moduleName: 'RadioBasicModule',
  selector: 'radio-basic'
};

const actionsData = {
  radioChange: action('Radio Change'),
};

export default {
  title: 'Components/Radio',
  component: UsaRadioGroupComponent,
  subcomponents: {
      'UsaRadioComponent': UsaRadioComponent,
      'UsaRadioGroupLabel': UsaRadioGroupLabel,
      'UsaRadioLabelDescription': UsaRadioLabelDescription
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, UsaRadioModule, ReactiveFormsModule, RadioFormsModule, UsaTableModule],
    }),
  ],
  args: {
    tile: false,
    disabled: false,
    checked: false,
    name: 'basicRadio',
    ariaLabelledBy: 'basicRadioLabel',
  },
  parameters: {
    preview: [
      {
        tab: "radio-basic.component.ts",
        template: basicTs.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
          tab: "radio-template.html",
          template: basicTemplate.default,
          language: "html",
          copy: true,
          codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
        tab: "radio-basic.module.ts",
        template: basicModule.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
    ],
  }
} as Meta;



export const Basic = (args) => ({
  template: basicTemplate.default,
  props: {
    ...args,
    onRadioChange: actionsData.radioChange,
  },
});

export const RadioForms = () => ({
  template: `<radio-forms></radio-forms>`
});

export const Footer = () => ({
  template: footer.default,
  props: {
    columnHeaders: ['variable', 'description'],
    dataRows: [
      {
        variable: '$theme-input-tile-background-color-selected',
        description: 'Tile background color when selected.'
      },
      {
        variable: '$theme-input-tile-border-radius',
        description: 'Tile border radius for rounded corners.'
      },
      {
        variable: '$theme-input-tile-border-width',
        description: 'Tile border thickness.'
      },
      {
        variable: '$theme-input-tile-border-color',
        description: 'Tile border color.'
      },
      {
        variable: '$theme-input-tile-border-color-selected',
        description: 'Tile border color when selected.'
      }
    ]
  }
});
