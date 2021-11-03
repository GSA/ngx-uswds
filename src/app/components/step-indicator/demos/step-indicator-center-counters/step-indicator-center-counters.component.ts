import { Component } from '@angular/core';
import { UsaStepIndicatorModel } from 'uswds-components';

@Component({
  selector: 'usa-step-indicator-center-counters',
  templateUrl: './step-indicator-center-counters.component.html',
})
export class StepIndicatorCenterCountersComponent {

  centerAndCounterLabels: UsaStepIndicatorModel[] = [
    {label: 'Centered Step 1'},
    {label: 'Centered Step 2'},
    {label: 'Centered Step 3'},
    {label: 'Centered Step 4'},
    {label: 'Centered Step 5'},
  ];

  currentStepCenterAndCounterLabels = 0;
}
