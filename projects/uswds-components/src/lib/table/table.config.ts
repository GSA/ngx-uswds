import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsaTableConfig {
  /**
   * Display table without column borders
   * @default false
   */
  borderless = false;

  /**
   * Allow table to scroll horizontally when content expand view width
   * @default false
   */
  scrollable = false;

  /**
   * Add alternating light/grey background color when displaying table rows
   * @default false
   */
  striped = false;

  /**
   * Minimize table cell padding
   * @default false
   */
  compact = false;

  /**
   * Stack table when in mobile sized view
   * @default true
   */
  stacked = true;

  /**
   * Displays first column as header when in stacked mode
   * @default false
   */
  stackedHeader = false;
}