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

  /**
   * Whether or not the data is sorted server side. If set to true, then
   * the table will not perform sort operations on given data, but simply
   * handle bookkeeping of sort state and event emission
   * @default false
   */
  serverSideSort = false;
}