import { Component } from "@angular/core";
import { UsaStepIndicatorModel } from "uswds-components";

@Component({
  templateUrl: `./step-indicator-basic.component.html`,
  selector: `usa-step-indicator-basic-demo`
})
export class StepIndicatorBasicComponent {
  stepsDefault: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4'},
    {label: 'Step 5'},
  ];

  currentStepDefault = 0;

}