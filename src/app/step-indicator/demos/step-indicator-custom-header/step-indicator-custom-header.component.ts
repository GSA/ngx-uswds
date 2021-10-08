import { Component, OnInit } from '@angular/core';
import { UsaStepIndicatorModel } from 'uswds-components';

@Component({
  selector: 'usa-step-indicator-custom-header',
  templateUrl: './step-indicator-custom-header.component.html',
  styles: [
  ]
})
export class StepIndicatorCustomHeaderComponent  {

  /** Disable Step Selection */
  stepsCustomHeader: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4'},
    {label: 'Step 5'},
  ];

  currentStepCustomHeader = 0;
}
