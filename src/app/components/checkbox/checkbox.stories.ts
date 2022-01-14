import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaCheckboxComponent,  UsaCheckboxModule, UsaTableModule } from "@gsa-sam/ngx-uswds";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ANGULAR_CODESANDBOX } from "src/app/shared/sandbox/angular-dependencies";
import { CheckboxIndeterminateComponent } from "./checkbox-indeterminate/checkbox-indeterminate.component";

declare var require;


const basicTemplate = require('!!raw-loader!./checkbox-basic/checkbox-basic.component.html');
const basicTs = require('!!raw-loader!./checkbox-basic/checkbox-basic.component.ts');
const basicModule = require('!!raw-loader!./checkbox-basic/checkbox-basic.module.ts')

const footer = require('!!raw-loader!./checkbox-footer.component.html');

const sandboxConfig = {
  files: {
    'checkbox-basic.component.ts': basicTs.default,
    'checkbox-basic.module.ts': basicModule.default,
    'checkbox-basic.component.html': basicTemplate.default
  },
  moduleName: 'CheckboxBasicModule',
  selector: 'checkbox-basic'
};

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
  },
  parameters: {
    preview: [
      {
        tab: "checkbox-basic.component.ts",
        template: basicTs.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
          tab: "checkbox-template.html",
          template: basicTemplate.default,
          language: "html",
          copy: true,
          codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
        tab: "checkbox-basic.module.ts",
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
  props: args,
});


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

export const Footer = () => ({
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
