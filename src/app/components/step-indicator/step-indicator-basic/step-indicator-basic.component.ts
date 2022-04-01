import { Component, Input } from "@angular/core";
import { UsaStepIndicatorModel } from "@gsa-sam/ngx-uswds";


@Component({
  selector: 'step-indicator-basic',
  templateUrl: './step-indicator-basic.component.html'
})
export class StepIndicatorBasicComponent {

  test = `<usa-step-indicator [steps]="steps" [(currentStep)]="currentStep" 
  [hideLabels]="hideLabels" [centerLabels]="centerLabels" 
  [displayCounters]="displayCounters" [smallCounters]="smallCounters"
  [headerPosition]="headerPosition" [disableStepSelection]="disableStepSelection">
  <h2 UsaStepHeader></h2>
</usa-step-indicator>`

  @Input() steps: UsaStepIndicatorModel[] = [
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' },
    { label: 'Step 4' },
    { label: 'Step 5' },
  ];

  @Input() currentStep = 0;

  @Input() hideLabels = false;

  @Input() centerLabels = false;

  @Input() displayCounters = false;

  @Input() smallCounters = false;

  @Input() headerPosition: 'top' | 'bottom';

  @Input() disableStepSelection: false;
}