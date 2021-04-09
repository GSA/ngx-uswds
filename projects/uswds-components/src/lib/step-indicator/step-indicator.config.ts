import {Injectable} from '@angular/core';

/**
 * A configuration service for the Step Indeicator component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all accordions used in the application.
 */
@Injectable({providedIn: 'root'})
export class UsaStepIndicatorConfig {
  /**
   * Hides labels on each step when set to true
   * @default false
   */
  hideLabels: boolean = false;

  /**
   * Centers labels on each step when set to true - 
   * if hideLabels is also true, then labels will be hidden
   * @default false
   */
  centerLabels: boolean = false

  /**
   * Displays step counters in between each step
   * @default true
   */
  displayCounters: boolean = false;

  /**
   * Shrinks the size of counters if they are displayed
   * @default false
   */
  smallCounters: boolean = false;

  /**
   * Defines whether to place the header above or below the steps.
   * String value of 'top' represents above while 'bottom' represents below
   * @default bottom
   */
  headerPosition: 'top' | 'bottom' = 'bottom';

  /**
   * Disable the ability to click on specific step segments in step indicator
   */
  disableStepSelection = false;
}