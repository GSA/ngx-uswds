import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaCheckboxComponent,  UsaCheckboxModule, UsaTableModule } from "@gsa-sam/ngx-uswds";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CheckboxIndeterminateComponent } from "./checkbox-indeterminate/checkbox-indeterminate.component";
import { generateConfig } from "src/sandbox/sandbox-utils";

declare var require;


const basicTemplate = require('!!raw-loader!./checkbox-basic/checkbox-basic.component.html');

const footer = require('!!raw-loader!./checkbox-overview.html');


export default {
  title: 'Components/Checkbox',
  component: UsaCheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, UsaCheckboxModule, ReactiveFormsModule, UsaTableModule],
      declarations: [CheckboxIndeterminateComponent],
    }),
  ],
  args: {
    tile: false,
    disabled: false,
    checked: false,
  }
} as Meta;

export const Overview = () => ({
  template: footer.default,
  props: {
    columnHeaders: ['variable', 'description'],
    dataRows: [
      {
        variable: ' $theme-checkbox-border-radius',
        description: 'Checkbox border radius for rounded corners.',
      },
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
  },
});
Overview.parameters = {options: {showPanel: false}};

export const Basic = (args) => ({
  template: basicTemplate.default,
  props: args,
});

Basic.parameters = {
  preview: generateConfig('components/checkbox/checkbox-basic', 'CheckboxBasicModule', 'checkbox-basic'),
}


const FormControlTemplate: Story<UsaCheckboxComponent> = (args: any) => {

  const formControl = new FormControl();

  return {
    template: `
    <usa-checkbox [tile]="${args.tile}" [disabled]="${args.disabled}" [checked]="${args.checked}" 
      [formControl]="formControl"> Sojourner Truth
      <span usaCheckboxDescription>
        This is optional text that can be used to describe the label in more detail.
      </span>
    </usa-checkbox>`,
    props: {
      ...args,
      formControl: formControl,
    },
  }
};

export const FormControlCheckbox = FormControlTemplate.bind({});


export const Indeterminate = () => ({
  template: `<checkbox-indeterminate></checkbox-indeterminate>`
});
Indeterminate.parameters = {
  preview: generateConfig('components/checkbox/checkbox-indeterminate', 'CheckboxIndeterminateModule', 'checkbox-indeterminate')
}
