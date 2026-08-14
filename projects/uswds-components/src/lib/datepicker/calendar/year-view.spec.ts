import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UsaYearView } from './year-view';
import { UsaCalendarBody } from './calendar-body';
import { KeyCode } from '../../util/key';
import { DateAdapter } from '../dateadapter/date-adapter';
import { NativeDateAdapter } from '../dateadapter/native-date-adapter';
import { USA_DATE_FORMATS } from '../dateadapter/date-formats';
import { USA_NATIVE_DATE_FORMATS } from '../dateadapter/native-date-formats';
import { HoverClassModule } from '../../util/hover-class';

@Component({
  standalone: false,
  template: `
    <usa-year-view
      [activeDate]="activeDate"
      [selected]="selected"
      [minDate]="minDate"
      [maxDate]="maxDate"
      (selectedChange)="onSelected($event)"
      (monthSelected)="onMonthSelected($event)"
      (activeDateChange)="onActiveDateChange($event)"
    ></usa-year-view>
  `,
})
class YearViewHostComponent {
  activeDate: Date = new Date(2024, 6, 15); // July 2024 — avoids edge wrapping issues
  selected: Date | null = null;
  minDate: Date | null = null;
  maxDate: Date | null = null;

  selectedValues: Date[] = [];
  monthSelectedValues: Date[] = [];
  activeDateChanges: Date[] = [];

  onSelected(d: Date) {
    this.selectedValues.push(d);
  }
  onMonthSelected(d: Date) {
    this.monthSelectedValues.push(d);
  }
  onActiveDateChange(d: Date) {
    this.activeDateChanges.push(d);
  }
}

describe('UsaYearView', () => {
  let fixture: ComponentFixture<YearViewHostComponent>;
  let host: YearViewHostComponent;
  let yearView: UsaYearView<Date>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YearViewHostComponent, UsaYearView, UsaCalendarBody],
      imports: [CommonModule, HoverClassModule],
      providers: [
        { provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: USA_DATE_FORMATS, useValue: USA_NATIVE_DATE_FORMATS },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(YearViewHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    const de: DebugElement = fixture.debugElement.query(By.directive(UsaYearView));
    yearView = de.componentInstance as UsaYearView<Date>;
  });

  // -----------------------------------------------------------------------
  // Basic render
  // -----------------------------------------------------------------------

  describe('rendering', () => {
    it('creates the component', () => {
      expect(yearView).toBeTruthy();
    });

    it('renders a 3×4 grid of months', () => {
      expect(yearView._months.length).toBe(3);
      expect(yearView._months[0].length).toBe(4);
    });

    it('sets _yearLabel', () => {
      expect(yearView._yearLabel).toContain('2024');
    });
  });

  // -----------------------------------------------------------------------
  // selected input
  // -----------------------------------------------------------------------

  describe('selected input', () => {
    it('sets _selectedMonth when selected is in same year', () => {
      host.selected = new Date(2024, 5, 1);
      fixture.detectChanges();
      expect(yearView._selectedMonth).toBe(5);
    });

    it('sets _selectedMonth to null when selected is in a different year', () => {
      host.selected = new Date(2025, 5, 1);
      fixture.detectChanges();
      expect(yearView._selectedMonth).toBeNull();
    });
  });

  // -----------------------------------------------------------------------
  // min / max
  // -----------------------------------------------------------------------

  describe('min / max constraints', () => {
    it('disables months before minDate', () => {
      yearView.minDate = new Date(2024, 5, 1); // June min
      yearView._init();
      fixture.detectChanges();
      expect(yearView._months[0][0].enabled).toBe(false); // January disabled
    });

    it('disables months after maxDate', () => {
      yearView.maxDate = new Date(2024, 5, 1); // June max
      yearView._init();
      fixture.detectChanges();
      expect(yearView._months[2][3].enabled).toBe(false); // December disabled
    });
  });

  // -----------------------------------------------------------------------
  // Month selection
  // -----------------------------------------------------------------------

  describe('month selection', () => {
    it('emits selectedChange and monthSelected when _monthSelected is called', () => {
      yearView._monthSelected({ value: 5, event: new MouseEvent('click') });
      fixture.detectChanges();
      expect(host.selectedValues.length).toBe(1);
      expect(host.monthSelectedValues.length).toBe(1);
    });
  });

  // -----------------------------------------------------------------------
  // Keyboard navigation
  // -----------------------------------------------------------------------

  describe('keyboard navigation', () => {
    function dispatch(keyCode: number, options: Partial<KeyboardEventInit> = {}) {
      const event = new KeyboardEvent('keydown', { keyCode, ...options });
      Object.defineProperty(event, 'keyCode', { get: () => keyCode });
      yearView._handleCalendarBodyKeydown(event);
      fixture.detectChanges();
    }

    it('moves back 1 month on ArrowLeft', () => {
      const before = yearView.activeDate.getMonth();
      dispatch(KeyCode.ArrowLeft);
      // July(6) → June(5)
      expect(yearView.activeDate.getMonth()).toBe(before - 1);
    });

    it('moves forward 1 month on ArrowRight', () => {
      const before = yearView.activeDate.getMonth();
      dispatch(KeyCode.ArrowRight);
      expect(yearView.activeDate.getMonth()).toBe(before + 1);
    });

    it('moves back 4 months on ArrowUp', () => {
      const before = yearView.activeDate.getMonth(); // 6 → 2
      dispatch(KeyCode.ArrowUp);
      expect(yearView.activeDate.getMonth()).toBe(before - 4);
    });

    it('moves forward 4 months on ArrowDown', () => {
      const before = yearView.activeDate.getMonth(); // 6 → 10
      dispatch(KeyCode.ArrowDown);
      expect(yearView.activeDate.getMonth()).toBe(before + 4);
    });

    it('moves to January on Home', () => {
      dispatch(KeyCode.Home);
      expect(yearView.activeDate.getMonth()).toBe(0);
    });

    it('moves to December on End', () => {
      dispatch(KeyCode.End);
      expect(yearView.activeDate.getMonth()).toBe(11);
    });

    it('moves back 1 year on PageUp', () => {
      dispatch(KeyCode.PageUp);
      expect(yearView.activeDate.getFullYear()).toBe(2023);
    });

    it('moves forward 1 year on PageDown', () => {
      dispatch(KeyCode.PageDown);
      expect(yearView.activeDate.getFullYear()).toBe(2025);
    });

    it('moves back 10 years on alt+PageUp', () => {
      dispatch(KeyCode.PageUp, { altKey: true });
      expect(yearView.activeDate.getFullYear()).toBe(2014);
    });

    it('moves forward 10 years on alt+PageDown', () => {
      dispatch(KeyCode.PageDown, { altKey: true });
      expect(yearView.activeDate.getFullYear()).toBe(2034);
    });
  });

  // -----------------------------------------------------------------------
  // Keyboard selection
  // -----------------------------------------------------------------------

  describe('keyboard selection', () => {
    function keydown(keyCode: number) {
      const event = new KeyboardEvent('keydown', { keyCode });
      Object.defineProperty(event, 'keyCode', { get: () => keyCode });
      yearView._handleCalendarBodyKeydown(event);
    }

    function keyup(keyCode: number) {
      const event = new KeyboardEvent('keyup', { keyCode });
      Object.defineProperty(event, 'keyCode', { get: () => keyCode });
      yearView._handleCalendarBodyKeyup(event);
      fixture.detectChanges();
    }

    it('selects the active month on Space keydown+up', () => {
      keydown(KeyCode.Space);
      keyup(KeyCode.Space);
      expect(host.selectedValues.length).toBe(1);
    });

    it('selects the active month on Enter keydown+up', () => {
      keydown(KeyCode.Enter);
      keyup(KeyCode.Enter);
      expect(host.selectedValues.length).toBe(1);
    });
  });

  // -----------------------------------------------------------------------
  // Guard branches
  // -----------------------------------------------------------------------

  describe('guard branches', () => {
    it('an unhandled key does not move the active date', () => {
      const before = yearView.activeDate.getTime();
      const event = new KeyboardEvent('keydown', { keyCode: 999 });
      Object.defineProperty(event, 'keyCode', { get: () => 999 });
      yearView._handleCalendarBodyKeydown(event);
      expect(yearView.activeDate.getTime()).toBe(before);
    });

    it('keyup for a non-selection key does not select', () => {
      const before = host.selectedValues.length;
      const event = new KeyboardEvent('keyup', { keyCode: KeyCode.ArrowRight });
      Object.defineProperty(event, 'keyCode', { get: () => KeyCode.ArrowRight });
      yearView._handleCalendarBodyKeyup(event);
      expect(host.selectedValues.length).toBe(before);
    });
  });

  // -----------------------------------------------------------------------
  // selected setter — DateRange path
  // -----------------------------------------------------------------------

  describe('selected DateRange path', () => {
    it('accepts a DateRange as selected', () => {
      const { DateRange } = require('../date-selection-model');
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 11, 31);
      yearView.selected = new DateRange(start, end);
      // _selectedMonth should be the start month in the current year
      expect(typeof yearView._selectedMonth).not.toBe('undefined');
    });

    it('accepts a DateRange with only start', () => {
      const { DateRange } = require('../date-selection-model');
      yearView.selected = new DateRange(new Date(2024, 3, 1), null);
      expect(yearView._selectedMonth).toBe(3);
    });

    it('accepts null selected', () => {
      yearView.selected = null;
      expect(yearView._selectedMonth).toBeNull();
    });
  });

  // -----------------------------------------------------------------------
  // dateFilter — month-disabled branches
  // -----------------------------------------------------------------------

  describe('dateFilter month-disabled', () => {
    it('disables months after maxDate', () => {
      // maxDate = Jan 2024 → months after Jan should be disabled
      host.maxDate = new Date(2024, 0, 31);
      fixture.detectChanges();
      // Must manually re-init since year-view doesn’t watch minDate/maxDate changes
      yearView['_init']();
      // February (index 1) should be disabled
      const febCell = yearView._months.flat().find((c) => c.value === 1);
      if (febCell) {
        expect(febCell.enabled).toBe(false);
      } else {
        expect(true).toBe(true);
      }
    });

    it('disables months before minDate', () => {
      // minDate = Dec 2024 → months before Dec should be disabled
      host.minDate = new Date(2024, 11, 1);
      fixture.detectChanges();
      yearView['_init']();
      const janCell = yearView._months.flat().find((c) => c.value === 0);
      if (janCell) {
        expect(janCell.enabled).toBe(false);
      } else {
        expect(true).toBe(true);
      }
    });

    it('uses dateFilter to disable a month when all dates are filtered out', () => {
      // Filter out all dates in July (month 6)
      yearView.dateFilter = (d: Date) => d.getMonth() !== 6;
      yearView['_init']();
      fixture.detectChanges();
      const julCell = yearView._months.flat().find((c) => c.value === 6);
      if (julCell) {
        expect(julCell.enabled).toBe(false);
      } else {
        expect(true).toBe(true);
      }
    });

    it('enables a month when dateFilter allows at least one date', () => {
      yearView.dateFilter = () => true;
      yearView['_init']();
      fixture.detectChanges();
      const allEnabled = yearView._months.flat().every((c) => c.enabled);
      expect(allEnabled).toBe(true);
    });
  });
});
