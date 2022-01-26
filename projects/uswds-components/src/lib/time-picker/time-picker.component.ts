import { Directive, Input, OnInit } from "@angular/core";
import { UsaComboBoxComponent } from "../combo-box/combo-box.component";


@Directive({
  selector: '[usa-time-picker]',
  exportAs: 'usaTimePicker'
})
export class UsaTimePicker implements OnInit {

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

  constructor(
    private hostComboBox: UsaComboBoxComponent,
  ) {}

  ngOnInit() {
    const wrapperDiv: HTMLDivElement = this.hostComboBox.el.nativeElement.querySelector('.usa-combo-box');
    wrapperDiv.classList.add('usa-time-picker');

    this.hostComboBox.items = this.genetateItems();
    this.hostComboBox.labelField = this.LABEL_FIELD;
    this.hostComboBox.valueField = this.VALUE_FIELD;
  }

  genetateItems() {
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

  padZeros(value, length) {
    return `0000${value}`.slice(-length);
  }

  getTimeContext(minutes) {
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
  parseTimeString(timeStr) {
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
}