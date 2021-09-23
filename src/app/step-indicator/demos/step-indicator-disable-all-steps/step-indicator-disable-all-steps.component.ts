import { Component } from '@angular/core';
import { UsaStepIndicatorModel } from 'uswds-components';

@Component({
  selector: 'usa-step-indicator-disable-all-steps',
  templateUrl: './step-indicator-disable-all-steps.component.html',
})
export class StepIndicatorDisableAllStepsComponent {
  /** Disable Step Selection */
  stepsDisableSelection: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4'},
    {label: 'Step 5'},
  ];

  currentStepDisableSelection = 0;
}
