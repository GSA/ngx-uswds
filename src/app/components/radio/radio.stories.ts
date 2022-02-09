import { Meta, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaRadioComponent, UsaRadioGroupComponent, UsaRadioGroupLabel, UsaRadioLabelDescription, UsaRadioModule, UsaTableModule } from "@gsa-sam/ngx-uswds";
import {  ReactiveFormsModule } from '@angular/forms';
import { action } from "@storybook/addon-actions";
import { RadioFormsModule } from "./radio-forms/radio-forms.module";
import { generateConfig } from "src/sandbox/sandbox-utils";

declare var require;

const basicTemplate = require('!!raw-loader!./radio-basic/radio-basic.component.html');
const footer = require('!!raw-loader!./radio-overview.html');

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
  }
} as Meta;

export const Overview = () => ({
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
Overview.parameters = {options: {showPanel: false}};


export const Basic = (args) => ({
  template: basicTemplate.default,
  props: {
    ...args,
    onRadioChange: actionsData.radioChange,
  },
});
Basic.parameters = {
  preview: generateConfig('components/radio/radio-basic', 'RadioBasicModule', 'radio-basic')
};


export const RadioForms = () => ({
  template: `<radio-forms></radio-forms>`
});
RadioForms.parameters = {
  preview: generateConfig('components/radio/radio-forms', 'RadioFormsModule', 'radio-forms')
};
