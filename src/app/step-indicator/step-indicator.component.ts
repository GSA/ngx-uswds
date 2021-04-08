import { Component } from '@angular/core';
import { UsaStepIndicatorModel, UsaStepIndicatorConfig } from 'uswds-components';

@Component({
  selector: 'app-step-indicator',
  templateUrl: './step-indicator.component.html',
})
export class StepIndicatorComponent {

  steps: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4', disabled: true},
    {label: 'Step 5'},
  ];

  currentStep = 0;

  constructor(
    config: UsaStepIndicatorConfig
  ) { 
    config.disableStepSelection = false;
  }

  onNext() {
    this.currentStep++;
  }

  onPrev() {
    this.currentStep--;
  }

  onStepChange(stepIndex: number) {
    this.currentStep = stepIndex;
  }

}
