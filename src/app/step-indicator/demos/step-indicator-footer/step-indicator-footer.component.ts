import { Component } from '@angular/core';
import { TableDataSource } from 'uswds-components';

@Component({
  selector: 'usa-step-indicator-footer',
  templateUrl: './step-indicator-footer.component.html',
})
export class StepIndicatorFooterComponent {

  columnHeaders = ['variable', 'description'];
  dataRows: TableDataSource = [
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
      description: 'Font size of the heading on screens of <strong>$theme-step-indicator-min-width</strong> and larger'
    },
    {
      variable: '$theme-step-indicator-heading-font-size-small', 
      description: 'Font size of the heading on screens smaller than <strong>$theme-step-indicator-min-width</strong>'
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
      description: 'Color of pending step segments. Use a grade of 20 more than <strong>$step-indicator-background-color'
    },
    {
      variable: '$theme-step-indicator-segment-color-complete', 
      description: 'Color of complete step segments. Use a grade at least 60.'
    },
    {
      variable: '$theme-step-indicator-segment-color-current', 
      description: 'Color of the current step segments. Use a grade at least 20 more than <strong>$theme-step-indicator-segment-color-complete</strong>.'
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
      description: 'The text color of pending steps. Use a gray grade of 60 more than the <strong>$step-indicator-background-color</strong>.'
    },
  ]
}
