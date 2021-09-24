import { Component } from '@angular/core';
import { UsaStepIndicatorModel } from 'uswds-components';

@Component({
  selector: 'usa-step-indicator-center-labels',
  templateUrl: './step-indicator-center-labels.component.html',
})
export class StepIndicatorCenterLabelsComponent {

  /** Center Labels */
  stepsCenterLabels: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4'},
    {label: 'Step 5'},
  ];

  currentStepCenterLabel = 0;
}
