import { Component } from "@angular/core";

@Component({
  selector: `time-picker-basic`,
  templateUrl: './time-picker-basic.component.html'
})
export class TimePickerBasicComponent {
  /** Minimum time to display in time picker - Time of 00:00 correlates to 12:00am */
  minTime = '00:00';

  /** Maximum time to display in time picker - Time of 23:59 correlates to 11:59pm */
  maxTime = '23:59';

  /** Time increments in dropdown - display every 30 mins from minTime up to maxTime */
  timeStep = 30;

  /** Custom filter function to highlight time values based on user input. 
   * Undefined here to use default function */
  filterBy: (input, values) => number = undefined;
}