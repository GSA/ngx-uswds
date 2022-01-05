
export interface UsaStepIndicatorModel {
  /** Defines label to display for step */
  label?: string;

  /** Defines whether the step is disabled or not */
  disabled?: boolean;

  /** Defines percentage filled if this is current step. Useful if the step is large enough to have sub steps */
  completionPercent?: number;

  /** Defines scale of segment relative to other segments */
  segmentScale?: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4;

  [propName: string]: any;
}