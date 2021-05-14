import { DOCUMENT } from "@angular/common";
import { Component, ElementRef, EventEmitter, Inject, Input, Output } from "@angular/core";

@Component({
  selector: `button[usa-sort]`,
  host: {
    class: 'usa-table__header__button',
    '[attr.aria-label]': 'ariaLabel',
    '(click)': 'onClick($event)',
  },
  template: `
        <svg
          [ngSwitch]="ariaSort"
          class="usa-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g *ngSwitchCase="'descending'" class="descending">
            <path d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z"></path>
          </g>
          <g *ngSwitchCase="'ascending'" class="ascending">
            <path transform="rotate(180, 12, 12)" d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z"></path>
          </g>
          <g *ngSwitchCase="'none'" class="unsorted" fill="transparent">
            <polygon points="15.17 15 13 17.17 13 6.83 15.17 9 16.58 7.59 12 3 7.41 7.59 8.83 9 11 6.83 11 17.17 8.83 15 7.42 16.41 12 21 16.59 16.41 15.17 15"></polygon>
          </g>
        </svg>
  `
})
export class UsaSort {
  @Input() sortFn: (a: any, b: any) => number;

  @Output() sortClicked = new EventEmitter();

  ariaSort: 'ascending' | 'descending' | 'none' = 'none';
  ariaLabel: string;

  private _columnHeaderText: string;

  constructor(
    public _el: ElementRef,
    @Inject(DOCUMENT) private _document
  ) {}

  onClick() {
    this.toggleAriaSort();
    const sortFn = this.sortFn ? this.sortFn : this.defaultSortFunction;
    const eventDetails = {
      sortFn, 
      sortState: this.ariaSort, 
      columnHeaderText: this._columnHeaderText
    };

    let event: CustomEvent;
    if (typeof(Event) === 'function') {
      event = new CustomEvent('sort', {bubbles: true, detail: eventDetails});
    } else {
      // IE11 support
      event = this._document.createEvent('CustomEvent');
      event.initCustomEvent('sort', true, true, eventDetails);
    }

    this._el.nativeElement.dispatchEvent(event);
    this.sortClicked.emit(this.ariaSort);
  }

  setColumnHeader(columnHeaderText: string) {
    this._columnHeaderText = columnHeaderText;
    this.ariaLabel = `Click to sort ${this._columnHeaderText}`;
  }

  toggleAriaSort() {
    this.ariaSort = this.ariaSort === 'none' || this.ariaSort === 'descending' ? 'ascending' : 'descending';
    const sortOrder = this.ariaSort === 'ascending' ? 'in descending order' : 'in ascending order';
    this.ariaLabel = `Click to sort ${this._columnHeaderText} ${this.ariaSort ? sortOrder : ''}`;
  }

  disableSort() {
    this.ariaSort = 'none';
    this.ariaLabel = `Click to sort ${this._columnHeaderText}`;
  }

  private defaultSortFunction(value1: any, value2: any) {
    // if neither value is empty, and if both values are already numbers, compare numerically
    if (
      value1 &&
      value2 &&
      !Number.isNaN(Number(value1)) &&
      !Number.isNaN(Number(value2))
    ) {
      return value1 - value2;
    }

    if (!value1 || !value2) {
      return value1 ? 1 : value2 ? -1 : 0;
    }
    
    // Otherwise, compare alphabetically based on current user locale
    return value1
      .toString()
      .localeCompare(value2, navigator.language, {
        numeric: true,
        ignorePunctuation: true,
      });
  }
}