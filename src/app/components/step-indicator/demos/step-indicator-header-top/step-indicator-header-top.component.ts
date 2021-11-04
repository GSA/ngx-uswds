import { Component } from '@angular/core';
import { UsaStepIndicatorModel } from 'uswds-components';

@Component({
  selector: 'usa-step-indicator-header-top',
  templateUrl: './step-indicator-header-top.component.html',
})
export class StepIndicatorHeaderTopComponent {
  /** Display Header Top */
  stepsHeaderTop: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4'},
    {label: 'Step 5'},
  ];

  currentStepHeaderTop = 0;
}
