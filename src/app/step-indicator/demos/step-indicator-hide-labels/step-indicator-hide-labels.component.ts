import { Component } from '@angular/core';
import { UsaStepIndicatorModel } from 'uswds-components';

@Component({
  selector: 'usa-step-indicator-hide-labels',
  templateUrl: './step-indicator-hide-labels.component.html',
  styles: [
  ]
})
export class StepIndicatorHideLabelsComponent {

  /** Hide Labels */
  stepsHideLabels: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4'},
    {label: 'Step 5'},
  ];

  currentStepHideLabel = 0;
}
