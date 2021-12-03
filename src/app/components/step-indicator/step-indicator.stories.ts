import { Meta, moduleMetadata } from "@storybook/angular";
import { 
  UsaStepIndicatorModule, UsaStepIndicatorComponent, 
  UsaStepIndicatorHeaderComponent, UsaStepIndicatorModel, 
  UsaTableModule, TableDataSource } from '@gsa-sam/ngx-uswds';
import { CommonModule } from "@angular/common";

declare var require: any;

const basicTemplate = require('!!raw-loader!./step-indicator-basic.html');
const customHeader = require('!!raw-loader!./step-indicator-custom-header.html');

const steps: UsaStepIndicatorModel[] = [
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
  { label: 'Step 4' },
  { label: 'Step 5' },
];

let currentStep= 0;

function getArgs(args) {
  return       { 
    hideLabels: args.hideLabels,
    centerLabels: args.centerLabels,
    displayCounters: args.displayCounters,
    smallCounters: args.smallCounters,
    headerPosition: args.headerPosition,
    disableStepSelection: args.disableStepSelection,
    steps: args.steps,
    currentStep: args.currentStep,
  }
}


export default {
  title: 'Components/StepIndicator',
  component: UsaStepIndicatorComponent,
  subcomponents: {UsaStepIndicatorHeaderComponent},
  decorators: [
    moduleMetadata({
      imports: [CommonModule, UsaStepIndicatorModule, UsaTableModule],
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
} as Meta;


export const Basic = (args) => ({
  template: basicTemplate.default,
  props: {...getArgs(args), columnHeaders, dataRows},
});

export const CustomHeader = (args) => ({
  template: customHeader.default,
  props: getArgs(args),
});



/** -------------------- Footer Table Data -------------------- */
const columnHeaders = ['variable', 'description'];
const dataRows: TableDataSource = [
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
