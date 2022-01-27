import { Directive, Input, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UsaComboBoxComponent } from "../combo-box/combo-box.component";


@Directive({
  selector: '[usa-time-picker]',
  exportAs: 'usaTimePicker'
})
export class UsaTimePicker implements OnInit, OnChanges, OnDestroy {

  readonly MAX_TIME = 60 * 24 - 1;
  readonly MIN_TIME = 0;

  readonly LABEL_FIELD = 'label';
  readonly VALUE_FIELD = 'value';

  /** 
   * Defines minimum selectable time within a 24 hour window.
   * This can be a date object or a string in hh:mm in 24-hour format.
   * The default min time is 00:00
   */
  @Input() minTime: Date | string = '00:00';

  /**
   * Defines the maximum selectable time within a 24 hour window.
   * This can be a date object or a string in hh:mm in 24-hour format.
   * The default max time is 23:59
   */
  @Input() maxTime: Date | string = '23:59';

  /**
   * The number of minutes between options. The minimum value is 1.
   * The default value is 30
   */
  @Input() timeStep: number = 30;

  /**
   * Filter function for when user types in input. This function
   * takes two parameters, current user input, and list of time
   * to parse input over. It should return a number which represents
   * the index within the values to select based on user input.
   * Index of -1 indicates no selection. A default filter function
   * is provided by the component, but a custom one can be passed in
   * if desired.
   */
  @Input() filterBy: (input: string, values: string[]) => number;

  _inputChangeSubscription: Subscription;

  constructor(
    private hostComboBox: UsaComboBoxComponent,
  ) {
    this._inputChangeSubscription = new Subscription();
  }

  ngOnChanges() {
    if (!this.hostComboBox) return;

    this.initializeDropdownItems();
  }

  ngOnInit() {
    const wrapperDiv: HTMLDivElement = this.hostComboBox.el.nativeElement.querySelector('.usa-combo-box');
    wrapperDiv.classList.add('usa-time-picker');
    this.initializeDropdownItems();

    const subscription = this.hostComboBox.changeEvent.subscribe(((value) => {
      const mappedItems = this.hostComboBox.items.map(item => item[this.LABEL_FIELD]);
      const index = this.filterBy ? this.filterBy(value, mappedItems) : this.filterTime(value, mappedItems);
      if (this.hostComboBox.comboBoxDropdown) {
        this.hostComboBox.comboBoxDropdown.highlightItem(index);
      }
    }).bind(this));

    this._inputChangeSubscription.add(subscription);
  }

  ngOnDestroy() {
    this._inputChangeSubscription.unsubscribe();
  }

  /**
   * Initializes dropdown values for timepixker as well as filter function
   * to use
   */
  private initializeDropdownItems() {
    this.hostComboBox.items = this.genetateItems();
    this.hostComboBox.labelField = this.LABEL_FIELD;
    this.hostComboBox.valueField = this.VALUE_FIELD;
  }

  /**
   * Generates list of times to display to the user.
   * This list is created based on user's min/max inputs
   * as well as time step
   * @returns - list of {label, value} pair of time to display in dropdown
   */
  private genetateItems() {
    const items = [];
    const minTime = Math.max(
      this.MIN_TIME,
      this.parseTimeString(this.minTime) || this.MIN_TIME
    );
    const maxTime = Math.min(
      this.MAX_TIME,
      this.parseTimeString(this.maxTime) || this.MAX_TIME
    );

    for (let time = minTime; time <= maxTime; time += this.timeStep) {
      const { minute, hour24, hour12, ampm } = this.getTimeContext(time);
      const option = {};
      option[this.VALUE_FIELD] = `${this.padZeros(hour24, 2)}:${this.padZeros(minute, 2)}`;
      option[this.LABEL_FIELD] = `${hour12}:${this.padZeros(minute, 2)}${ampm}`;

      items.push(option);
    }

    return items;
  }

  /**
   * Adds additional zeros if needed
   * @param value 
   * @param length 
   * @returns 
   */
  private padZeros(value: number, length: number) {
    return `0000${value}`.slice(-length);
  }

  /**
   * Given minuutes, parses number of hours and minutes to represent that time.
   * IE - 0 minutes would be 0:00 AM, 60 minutes would be 1:00 AM, etc
   * @param minutes 
   */
  private getTimeContext(minutes: number): {minute: number, hour24: number, hour12: number, ampm: string} {
    const minute = minutes % 60;
    const hour24 = Math.floor(minutes / 60);
    const hour12 = hour24 % 12 || 12;
    const ampm = hour24 < 12 ? "am" : "pm";

    return {
      minute,
      hour24,
      hour12,
      ampm,
    };
  };

  /**
   * Parse a string of hh:mm into minutes
   *
   * @param {string} timeStr the time string to parse
   * @returns {number} the number of minutes
   */
  private parseTimeString(timeStr) {
    let minutes;

    if (timeStr) {
      const [hours, mins] = timeStr.split(":").map((str) => {
        let value;
        const parsed = parseInt(str, 10);
        if (!Number.isNaN(parsed)) value = parsed;
        return value;
      });

      if (hours != null && mins != null) {
        minutes = hours * 60 + mins;
      }
    }

    return minutes;
  };

  filterTime(input: string, values: string[]) {
    if (!input || !input.length) return -1;
    return values.findIndex(value => value.includes(input));
  }
}