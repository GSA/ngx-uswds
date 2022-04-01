import { Meta, moduleMetadata } from "@storybook/angular";
import { 
  UsaStepIndicatorModule, UsaStepIndicatorComponent, 
  UsaStepIndicatorHeaderComponent, UsaStepIndicatorModel, 
  UsaTableModule } from '@gsa-sam/ngx-uswds';
import { CommonModule } from "@angular/common";
import { StepIndicatorSubstepsModule } from "./step-indicator-substeps/step-indicator-substeps.module";
import { generateConfig } from "src/sandbox/sandbox-utils";

declare var require: any;

const template = require('!!raw-loader!./step-indicator-basic/step-indicator-basic.component.html');

const customHeader = require('!!raw-loader!./step-indicator-custom-header.html');
const footer = require('!!raw-loader!./step-indicator-overview.html');


const steps: UsaStepIndicatorModel[] = [
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
  { label: 'Step 4' },
  { label: 'Step 5' },
];

let currentStep = 0;



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
  }
} as Meta;

/** -------------------- Overview Notes -------------------- */
export const Overview = () => ({
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
Overview.parameters = {options: {showPanel: false}};


export const Basic = (args) => ({
  template: template.default,
  props: args,
});
Basic.parameters = {
  preview: generateConfig('components/step-indicator/step-indicator-basic', 'StepIndicatorBasicModule', 'step-indicator-basic')
}

export const CustomHeader = (args) => ({
  template: customHeader.default,
  props: args,
});

export const Substeps = () => ({
  template: `<step-indicator-substeps></step-indicator-substeps>`
})
Substeps.parameters = {
  preview: generateConfig('components/step-indicator/step-indicator-substeps', 'StepIndicatorSubstepsModule', 'step-indicator-substeps'),
}

