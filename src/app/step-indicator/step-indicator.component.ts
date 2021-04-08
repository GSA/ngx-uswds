import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-indicator',
  templateUrl: './step-indicator.component.html',
})
export class StepIndicatorComponent {

  steps = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4', disabled: true},
    {label: 'Step 5'},
  ];

  currentStep = 0;

  constructor() { }

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
