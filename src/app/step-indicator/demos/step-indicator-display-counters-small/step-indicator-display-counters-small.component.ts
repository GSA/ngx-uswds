import { Component } from '@angular/core';
import { UsaStepIndicatorModel } from 'uswds-components';

@Component({
  selector: 'usa-step-indicator-display-counters-small',
  templateUrl: './step-indicator-display-counters-small.component.html',
})
export class StepIndicatorDisplayCountersSmallComponent  {
  /** Display Counters Small */
  stepsShowCountersSmall: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4'},
    {label: 'Step 5'},
  ];

  currentStepShowCountersSmall = 0;
}
