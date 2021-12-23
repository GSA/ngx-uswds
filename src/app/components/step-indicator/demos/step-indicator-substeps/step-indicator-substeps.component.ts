import { Component, OnInit } from '@angular/core';
import { UsaStepIndicatorModel } from '@gsa-sam/ngx-uswds';

@Component({
  selector: 'usa-step-indicator-substeps',
  templateUrl: './step-indicator-substeps.component.html',
  styles: [
  ]
})
export class StepIndicatorSubstepsComponent {

  steps: UsaStepIndicatorModel[] = [
    { label: 'Step 1' },
    { label: 'Step 2', segmentWidth: 30, completionPercent: 0},
    { label: 'Step 3' },
  ];

  currentStep = 0;

  changeSubstep(change: number) {
    const newCompletionPercent = this.steps[1].completionPercent + change
    this.steps[1].completionPercent = Math.max(0, Math.min(100, newCompletionPercent));
  }
}
