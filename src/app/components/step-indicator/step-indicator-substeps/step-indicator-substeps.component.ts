import { Component } from '@angular/core';
import { UsaStepIndicatorModel } from '@gsa-sam/ngx-uswds';

@Component({
  selector: 'step-indicator-substeps',
  templateUrl: './step-indicator-substeps.component.html',
  styles: [
  ]
})
export class StepIndicatorSubstepsComponent {

  steps: UsaStepIndicatorModel[] = [
    { label: 'Step 1' },
    { label: 'Step 2', segmentScale: 2, completionPercent: 0  },
    {}, // Make last step simple empty step
  ];

  currentStep = 0;

  changeSubstep(change: number) {
    const newCompletionPercent = this.steps[1].completionPercent + change
    this.steps[1].completionPercent = Math.max(0, Math.min(100, newCompletionPercent));

    // Advance to step 3 if step 2 is at 100% completion
    if (this.steps[1].completionPercent === 100) {
      this.currentStep++;
    }
  }
}
