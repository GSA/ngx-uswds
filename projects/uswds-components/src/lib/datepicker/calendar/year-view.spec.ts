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
});
