
export interface UsaStepIndicatorModel {
  /** Defines label to display for step */
  label: string;

  /** Defines whether the step is disabled or not */
  disabled?: boolean;

  /** Defines percentage filled if this is current step. Useful if the step is large enough to have sub steps */
  completionPercent?: number;

  /** Defines min width of step segment. Useful to visually indicate if some steps are lengthier than others */
  segmentWidth?: number;
  
  [propName: string]: any;
}