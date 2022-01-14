import { Meta, moduleMetadata } from "@storybook/angular";
import { 
  UsaStepIndicatorModule, UsaStepIndicatorComponent, 
  UsaStepIndicatorHeaderComponent, UsaStepIndicatorModel, 
  UsaTableModule } from '@gsa-sam/ngx-uswds';
import { CommonModule } from "@angular/common";
import { StepIndicatorSubstepsModule } from "./step-indicator-substeps/step-indicator-substeps.module";
import { ANGULAR_CODESANDBOX } from "src/app/shared/sandbox/angular-dependencies";

declare var require: any;

const template = require('!!raw-loader!./step-indicator-basic/step-indicator-basic.component.html');
const basicTs = require('!!raw-loader!./step-indicator-basic/step-indicator-basic.component.ts');
const basicModule = require('!!raw-loader!./step-indicator-basic/step-indicator-basic.module.ts')

const customHeader = require('!!raw-loader!./step-indicator-custom-header.html');
const footer = require('!!raw-loader!./step-indicator-footer.template.html');

const sandboxConfig = {
  files: {
    'step-indicator-basic.component.ts': basicTs.default,
    'step-indicator-basic.module.ts': basicModule.default,
    'step-indicator-basic.component.html': template.default
  },
  moduleName: 'StepIndicatorBasicModule',
  selector: 'step-indicator-basic'
};

const steps: UsaStepIndicatorModel[] = [
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
  { label: 'Step 4' },
  { label: 'Step 5' },
];

let currentStep= 0;



export default {
  title: 'Components/StepIndicator',
  component: UsaStepIndicatorComponent,
  subcomponents: {UsaStepIndicatorHeaderComponent},
  decorators: [
    moduleMetadata({
      imports: [CommonModule, UsaStepIndicatorModule, UsaTableModule, StepIndicatorSubstepsModule],
    }),
  ],
  args: {
    hideLabels: false,
    centerLabels: false,
    displayCounters: false,
    smallCounters: false,
    headerPosition: 'bottom',
    disableStepSelection: false,
    steps: steps,
    currentStep: currentStep,
  },
  parameters: {
    preview: [
      {
        tab: "step-indicator-basic.component.ts",
        template: basicTs.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
          tab: "step-indicator-template.html",
          template: template.default,
          language: "html",
          copy: true,
          codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
        tab: "step-indicator-basic.module.ts",
        template: basicModule.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
    ],
  }
} as Meta;


export const Basic = (args) => ({
  template: template.default,
  props: args,
});

export const CustomHeader = (args) => ({
  template: customHeader.default,
  props: args,
});

export const Substeps = () => ({
  template: `<step-indicator-substeps></step-indicator-substeps>`
})


/** -------------------- Footer Table Data -------------------- */
export const Footer = () => ({
  template: footer.default,
  props: {
    columnHeaders: ['variable', 'description'],
    dataRows: [
        {
          variable: '$step-indicator-background-color',
          description: 'Background color of the component and the gaps around the counters',
        },
        {
          variable: '$theme-step-indicator-counter-gap',
          description: 'Gap between the counter and the segment'
        },
        {
          variable: '$theme-step-indicator-counter-border-width',
          description: 'Size of the border around the pending steps'
        },
        {
          variable: '$theme-step-indicator-font-family',
          description: 'Font family of the labels and counter numbers'
        },
        {
          variable: '$theme-step-indicator-heading-font-family',
          description: 'Font family of the heading'
        },
        {
          variable: '$theme-step-indicator-heading-color',
          description: 'Color of the heading'
        },
        {
          variable: '$theme-step-indicator-heading-font-size',
          description: 'Font size of the heading on screens of $theme-step-indicator-min-width and larger'
        },
        {
          variable: '$theme-step-indicator-heading-font-size-small',
          description: 'Font size of the heading on screens smaller than $theme-step-indicator-min-width'
        },
        {
          variable: '$theme-step-indicator-label-font-size',
          description: 'Font size of segment labels'
        },
        {
          variable: '$theme-step-indicator-min-width',
          description: 'Width at which the component displays large-width features'
        },
        {
          variable: '$theme-step-indicator-segment-color-pending',
          description: 'Color of pending step segments. Use a grade of 20 more than $step-indicator-background-color'
        },
        {
          variable: '$theme-step-indicator-segment-color-complete',
          description: 'Color of complete step segments. Use a grade at least 60.'
        },
        {
          variable: '$theme-step-indicator-segment-color-current',
          description: 'Color of the current step segments. Use a grade at least 20 more than $theme-step-indicator-segment-color-complete.'
        },
        {
          variable: '$theme-step-indicator-segment-gap',
          description: 'Gap between step segments'
        },
        {
          variable: '$theme-step-indicator-segment-height',
          description: 'Height of the step segment. Note that the mobile segment height is always 1 unit.'
        },
        {
          variable: '$theme-step-indicator-text-pending-color',
          description: 'The text color of pending steps. Use a gray grade of 60 more than the $step-indicator-background-color.'
        },
      ]
  }
});