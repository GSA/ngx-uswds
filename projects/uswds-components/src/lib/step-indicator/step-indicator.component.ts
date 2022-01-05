import { Component, ContentChild, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UsaStepIndicatorHeaderComponent } from './step-indicator-header.component';
import { UsaStepIndicatorConfig } from './step-indicator.config';
import { Key, KeyCode, MicrosfotKeys } from '../util/key';
import { getNextItemIndexInList, findLastIndex } from '../util/util';
import { UsaStepIndicatorModel } from './step-indicator.model';

let stepIndicatorId = 0;

@Component({
  selector: 'usa-step-indicator',
  templateUrl: './step-indicator.component.html',
  host: {
    'class': 'usa-step-indicator',
    '[class.usa-step-indicator--no-labels]': 'hideLabels',
    '[class.usa-step-indicator--center]': 'centerLabels && !hideLabels',
    '[class.usa-step-indicator--counters]': 'displayCounters && !smallCounters',
    '[class.usa-step-indicator--counters-sm]': 'smallCounters',

  },
  styleUrls: ['./step-indicator.component.scss'],
})
export class UsaStepIndicatorComponent implements OnChanges {

  /**
   * Hides labels on each step when set to true
   */
  @Input() hideLabels: boolean = false

  /**
   * Centers label with the step bar when set to true
   */
  @Input() centerLabels: boolean = false

  /**
   * Displays step counter
   */
  @Input() displayCounters: boolean = false

  /**
   * Shrinks size of displayed step counter
   */
  @Input() smallCounters: boolean = false

  /**
   * Whether to place the header above or below the step indicator
   */
  @Input() headerPosition: 'top' | 'bottom' = 'bottom';

  /**
   * Disables the ability to navigate to steps by clicking on the step bar
   */
  @Input() disableStepSelection: boolean = false;


  @Input() id: string = `usa-step-indicator-${stepIndicatorId++}`;

  /**
   * Currently selected step
   */
  @Input() currentStep: number = 0;

  /**
   * All possible steps
   */
  @Input() steps: UsaStepIndicatorModel[] = [];

  @Output() currentStepChange = new EventEmitter<number>();

  constructor(
    config: UsaStepIndicatorConfig,
    private elementRef: ElementRef,
  ) { 
    this.hideLabels = config.hideLabels;
    this.centerLabels = config.centerLabels;
    this.displayCounters = config.displayCounters;
    this.smallCounters = config.smallCounters;
    this.headerPosition = config.headerPosition;
    this.disableStepSelection = config.disableStepSelection;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentStep) {
      if (this.currentStep > this.steps.length - 1 || this.currentStep < 0) {
        throw new Error(`Steps in step indicator is out of bounds. 
          Current Step: ${this.currentStep}, Step Range: 0 - ${this.steps.length - 1}`);
      }
    }
  }

  onStepClicked(stepIndex: number, step: any) {
    if (step.disabled || this.disableStepSelection) {
      return;
    }

    this.currentStepChange.emit(stepIndex);
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const keyPressed = event.key || event.keyCode;
    let nextStepIndex: number;
    switch(keyPressed) {
      case Key.ArrowRight:
      case MicrosfotKeys.ArrowRight:
      case KeyCode.ArrowRight:
        nextStepIndex = getNextItemIndexInList(index, this.steps, 1);
        this._getAllStepListElements()[nextStepIndex].focus();
        event.preventDefault();
        break;
      case Key.ArrowLeft:
      case MicrosfotKeys.ArrowLeft:
      case KeyCode.ArrowLeft:
        nextStepIndex = getNextItemIndexInList(index, this.steps, -1);
        this._getAllStepListElements()[nextStepIndex].focus();
        event.preventDefault();       
        break;
      case Key.Home:
      case MicrosfotKeys.Home:
      case KeyCode.Home:
        nextStepIndex = this.steps.findIndex(step => !step.disabled);
        this._getAllStepListElements()[nextStepIndex].focus();
        event.preventDefault();
        break;
      case Key.End:
      case MicrosfotKeys.End:
      case KeyCode.End:
        nextStepIndex= findLastIndex(this.steps, (step => !step.disabled));
        this._getAllStepListElements()[nextStepIndex].focus();
        event.preventDefault();
        break;
      }
  }

  getFillPercentage(step: UsaStepIndicatorModel) {
    if (step.completionPercent === undefined || step != this.steps[this.currentStep]) {
      return undefined;
    }

    if (step.completionPercent % 25 === 0 || step.completionPercent % 33 === 0) {
      return `fill-${step.completionPercent}`;
    }

    const roundedStep = Math.round(step.completionPercent / 10) * 10;
    return `fill-${roundedStep}`
  }

  getSegmentScale(step: UsaStepIndicatorModel) {
    if (step.segmentScale === undefined) return undefined;
    const segmentPercentage = Math.max(0.5, Math.min(4, step.segmentScale)) * 100;
    return `scale-percent-${segmentPercentage}`;
  }

  private _getAllStepListElements() {
    const listElements: NodeList = this.elementRef.nativeElement.querySelectorAll(`#${this.id} .usa-step-indicator__segment`);
    return Array.prototype.slice.call(listElements);
  }

}
