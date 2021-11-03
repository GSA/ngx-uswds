import { Component } from '@angular/core';
import { UsaStepIndicatorModel } from 'uswds-components';

@Component({
  selector: 'usa-step-indicator-disable-step',
  templateUrl: './step-indicator-disable-step.component.html',
})
export class StepIndicatorDisableStepComponent {

  /** Disable Step Selection */
  stepsDisableSingleStep: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4'},
    {label: 'Step 5', disabled: true},
  ];

  currentStepDisableSingle = 0;
}
