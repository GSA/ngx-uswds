import { Component } from '@angular/core';
import { UsaStepIndicatorModel } from 'uswds-components';

@Component({
  selector: 'app-step-indicator',
  templateUrl: './step-indicator.component.html',
})
export class StepIndicatorComponent {

  stepsDefault: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4'},
    {label: 'Step 5'},
  ];

  currentStepDefault = 0;

  /** Hide Labels */
  stepsHideLabels: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4'},
    {label: 'Step 5'},
  ];

  currentStepHideLabel = 0;

  /** Center Labels */
  stepsCenterLabels: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4'},
    {label: 'Step 5'},
  ];

  currentStepCenterLabel = 0;

  /** Display Counters */
  stepsShowCounters: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4'},
    {label: 'Step 5'},
  ];

  currentStepShowCounters = 0;

  /** Display Counters Small */
  stepsShowCountersSmall: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4'},
    {label: 'Step 5'},
  ];

  currentStepShowCountersSmall = 0;

  /** Display Header Top */
  stepsHeaderTop: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4'},
    {label: 'Step 5'},
  ];

  currentStepHeaderTop = 0;

  /** Disable Step Selection */
  stepsDisableSingleStep: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4'},
    {label: 'Step 5', disabled: true},
  ];

  currentStepDisableSingle = 0;

  /** Disable Step Selection */
  stepsDisableSelection: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4'},
    {label: 'Step 5'},
  ];

  currentStepDisableSelection = 0;

  /** Disable Step Selection */
  stepsCustomHeader: UsaStepIndicatorModel[] = [
    {label: 'Step 1'},
    {label: 'Step 2'},
    {label: 'Step 3'},
    {label: 'Step 4'},
    {label: 'Step 5'},
  ];

  currentStepCustomHeader = 0;

  /** Disable Step Selection */
  centerAndCounterLabels: UsaStepIndicatorModel[] = [
    {label: 'Centered Step 1'},
    {label: 'Centered Step 2'},
    {label: 'Centered Step 3'},
    {label: 'Centered Step 4'},
    {label: 'Centered Step 5'},
  ];

  currentStepCenterAndCounterLabels = 0;

}
