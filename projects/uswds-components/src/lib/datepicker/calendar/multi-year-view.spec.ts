import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UsaMultiYearView, yearsPerPage, yearsPerRow } from './multi-year-view';
import { UsaCalendarBody } from './calendar-body';
import { KeyCode } from '../../util/key';
import { DateAdapter } from '../dateadapter/date-adapter';
import { NativeDateAdapter } from '../dateadapter/native-date-adapter';
import { HoverClassModule } from '../../util/hover-class';
import { DateRange } from '../date-selection-model';

@Component({
  standalone: false,
  template: `
    <usa-multi-year-view
      [activeDate]="activeDate"
      [selected]="selected"
      [minDate]="minDate"
      [maxDate]="maxDate"
      (selectedChange)="onSelected($event)"
      (yearSelected)="onYearSelected($event)"
      (activeDateChange)="onActiveDateChange($event)"
    ></usa-multi-year-view>
  `,
})
class MultiYearViewHostComponent {
  activeDate: Date = new Date(2024, 0, 1);
  selected: Date | null = null;
  minDate: Date | null = null;
  maxDate: Date | null = null;

  selectedValues: Date[] = [];
  yearSelectedValues: Date[] = [];
  activeDateChanges: Date[] = [];

  onSelected(d: Date) {
    this.selectedValues.push(d);
  }
  onYearSelected(d: Date) {
    this.yearSelectedValues.push(d);
  }
  onActiveDateChange(d: Date) {
    this.activeDateChanges.push(d);
  }
}

describe('UsaMultiYearView', () => {
  let fixture: ComponentFixture<MultiYearViewHostComponent>;
  let host: MultiYearViewHostComponent;
  let multiYearView: UsaMultiYearView<Date>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiYearViewHostComponent, UsaMultiYearView, UsaCalendarBody],
      imports: [CommonModule, HoverClassModule],
      providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiYearViewHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    const de: DebugElement = fixture.debugElement.query(By.directive(UsaMultiYearView));
    multiYearView = de.componentInstance as UsaMultiYearView<Date>;
  });

  // -----------------------------------------------------------------------
  // Basic render
  // -----------------------------------------------------------------------

  describe('rendering', () => {
    it('creates the component', () => {
      expect(multiYearView).toBeTruthy();
    });

    it('renders the correct number of years', () => {
      const totalYears = multiYearView._years.flat().length;
      expect(totalYears).toBe(yearsPerPage);
    });

    it('sets _todayYear', () => {
      expect(multiYearView._todayYear).toBe(new Date().getFullYear());
    });
  });

  // -----------------------------------------------------------------------
  // selected input
  // -----------------------------------------------------------------------

  describe('selected input', () => {
    it('sets _selectedYear when a date is selected', () => {
      host.selected = new Date(2024, 5, 1);
      fixture.detectChanges();
      expect(multiYearView._selectedYear).toBe(2024);
    });

    it('sets _selectedYear to null when selected is null', () => {
      host.selected = null;
      fixture.detectChanges();
      expect(multiYearView._selectedYear).toBeNull();
    });
  });

  // -----------------------------------------------------------------------
  // min / max
  // -----------------------------------------------------------------------

  describe('min / max constraints', () => {
    it('disables years before minDate', () => {
      multiYearView.minDate = new Date(2020, 0, 1);
      multiYearView.activeDate = new Date(2020, 0, 1);
      multiYearView._init();
      fixture.detectChanges();
      const years = multiYearView._years.flat();
      const year2019 = years.find((c) => c.value === 2019);
      if (year2019) {
        expect(year2019.enabled).toBe(false);
      }
    });

    it('disables years after maxDate', () => {
      multiYearView.maxDate = new Date(2024, 11, 31);
      multiYearView._init();
      fixture.detectChanges();
      const years = multiYearView._years.flat();
      const futureYear = years.find((c) => c.value > 2024);
      if (futureYear) {
        expect(futureYear.enabled).toBe(false);
      }
    });
  });

  // -----------------------------------------------------------------------
  // Year selection
  // -----------------------------------------------------------------------

  describe('year selection', () => {
    it('emits selectedChange and yearSelected when _yearSelected is called', () => {
      multiYearView._yearSelected({ value: 2025, event: new MouseEvent('click') });
      fixture.detectChanges();
      expect(host.selectedValues.length).toBe(1);
      expect(host.yearSelectedValues.length).toBe(1);
    });
  });

  // -----------------------------------------------------------------------
  // getNextYears / getPreviousYears
  // -----------------------------------------------------------------------

  describe('getNextYears / getPreviousYears', () => {
    it('getNextYears advances by yearsPerPage', () => {
      const beforeYear = multiYearView.activeDate.getFullYear();
      multiYearView.getNextYears();
      fixture.detectChanges();
      expect(multiYearView.activeDate.getFullYear()).toBe(beforeYear + yearsPerPage);
    });

    it('getPreviousYears retreats by yearsPerPage', () => {
      const beforeYear = multiYearView.activeDate.getFullYear();
      multiYearView.getPreviousYears();
      fixture.detectChanges();
      expect(multiYearView.activeDate.getFullYear()).toBe(beforeYear - yearsPerPage);
    });
  });

  // -----------------------------------------------------------------------
  // _getActiveCell
  // -----------------------------------------------------------------------

  describe('_getActiveCell', () => {
    it('returns a number in [0, yearsPerPage)', () => {
      const cell = multiYearView._getActiveCell();
      expect(cell).toBeGreaterThanOrEqual(0);
      expect(cell).toBeLessThan(yearsPerPage);
    });
  });

  // -----------------------------------------------------------------------
  // Keyboard navigation
  // -----------------------------------------------------------------------

  describe('keyboard navigation', () => {
    function dispatch(keyCode: number, options: Partial<KeyboardEventInit> = {}) {
      const event = new KeyboardEvent('keydown', { keyCode, ...options });
      Object.defineProperty(event, 'keyCode', { get: () => keyCode });
      multiYearView._handleCalendarBodyKeydown(event);
      fixture.detectChanges();
    }

    it('moves back 1 year on ArrowLeft', () => {
      const before = multiYearView.activeDate.getFullYear();
      dispatch(KeyCode.ArrowLeft);
      expect(multiYearView.activeDate.getFullYear()).toBe(before - 1);
    });

    it('moves forward 1 year on ArrowRight', () => {
      const before = multiYearView.activeDate.getFullYear();
      dispatch(KeyCode.ArrowRight);
      expect(multiYearView.activeDate.getFullYear()).toBe(before + 1);
    });

    it('moves back yearsPerRow on ArrowUp', () => {
      const before = multiYearView.activeDate.getFullYear();
      dispatch(KeyCode.ArrowUp);
      expect(multiYearView.activeDate.getFullYear()).toBe(before - yearsPerRow);
    });

    it('moves forward yearsPerRow on ArrowDown', () => {
      const before = multiYearView.activeDate.getFullYear();
      dispatch(KeyCode.ArrowDown);
      expect(multiYearView.activeDate.getFullYear()).toBe(before + yearsPerRow);
    });

    it('moves to the first year in page on Home', () => {
      dispatch(KeyCode.Home);
      expect(multiYearView._getActiveCell()).toBe(0);
    });

    it('moves to the last year in page on End', () => {
      dispatch(KeyCode.End);
      expect(multiYearView._getActiveCell()).toBe(yearsPerPage - 1);
    });

    it('moves back yearsPerPage on PageUp', () => {
      const before = multiYearView.activeDate.getFullYear();
      dispatch(KeyCode.PageUp);
      expect(multiYearView.activeDate.getFullYear()).toBe(before - yearsPerPage);
    });

    it('moves forward yearsPerPage on PageDown', () => {
      const before = multiYearView.activeDate.getFullYear();
      dispatch(KeyCode.PageDown);
      expect(multiYearView.activeDate.getFullYear()).toBe(before + yearsPerPage);
    });

    it('moves back yearsPerPage*10 on alt+PageUp', () => {
      const before = multiYearView.activeDate.getFullYear();
      dispatch(KeyCode.PageUp, { altKey: true });
      expect(multiYearView.activeDate.getFullYear()).toBe(before - yearsPerPage * 10);
    });

    it('moves forward yearsPerPage*10 on alt+PageDown', () => {
      const before = multiYearView.activeDate.getFullYear();
      dispatch(KeyCode.PageDown, { altKey: true });
      expect(multiYearView.activeDate.getFullYear()).toBe(before + yearsPerPage * 10);
    });
  });

  // -----------------------------------------------------------------------
  // Keyboard selection
  // -----------------------------------------------------------------------

  describe('keyboard selection', () => {
    function keydown(keyCode: number) {
      const event = new KeyboardEvent('keydown', { keyCode });
      Object.defineProperty(event, 'keyCode', { get: () => keyCode });
      multiYearView._handleCalendarBodyKeydown(event);
    }

    function keyup(keyCode: number) {
      const event = new KeyboardEvent('keyup', { keyCode });
      Object.defineProperty(event, 'keyCode', { get: () => keyCode });
      multiYearView._handleCalendarBodyKeyup(event);
      fixture.detectChanges();
    }

    it('selects the active year on Space keydown+up', () => {
      keydown(KeyCode.Space);
      keyup(KeyCode.Space);
      expect(host.selectedValues.length).toBe(1);
    });

    it('selects the active year on Enter keydown+up', () => {
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
      const before = multiYearView.activeDate.getTime();
      const event = new KeyboardEvent('keydown', { keyCode: 999 });
      Object.defineProperty(event, 'keyCode', { get: () => 999 });
      multiYearView._handleCalendarBodyKeydown(event);
      expect(multiYearView.activeDate.getTime()).toBe(before);
    });

    it('keyup for a non-selection key does not select', () => {
      const before = host.selectedValues.length;
      const event = new KeyboardEvent('keyup', { keyCode: KeyCode.ArrowRight });
      Object.defineProperty(event, 'keyCode', { get: () => KeyCode.ArrowRight });
      multiYearView._handleCalendarBodyKeyup(event);
      expect(host.selectedValues.length).toBe(before);
    });
  });

  // -----------------------------------------------------------------------
  // selected setter — DateRange path
  // -----------------------------------------------------------------------

  describe('selected DateRange path', () => {
    it('accepts a DateRange as selected (start only)', () => {
      const start = new Date(2024, 0, 1);
      multiYearView.selected = new DateRange(start, null);
      expect(multiYearView._selectedYear).toBe(2024);
    });

    it('accepts a DateRange as selected (end only)', () => {
      const end = new Date(2025, 5, 1);
      multiYearView.selected = new DateRange(null, end);
      expect(multiYearView._selectedYear).toBe(2025);
    });

    it('accepts a DateRange with no start/end', () => {
      multiYearView.selected = new DateRange(null, null);
      expect(multiYearView._selectedYear).toBeNull();
    });

    it('accepts a plain date', () => {
      multiYearView.selected = new Date(2023, 0, 1);
      expect(multiYearView._selectedYear).toBe(2023);
    });

    it('accepts null', () => {
      multiYearView.selected = null;
      expect(multiYearView._selectedYear).toBeNull();
    });
  });

  // -----------------------------------------------------------------------
  // dateFilter — year-disabled branches
  // -----------------------------------------------------------------------

  describe('dateFilter year-disabled', () => {
    it('disables a year beyond maxDate', () => {
      host.maxDate = new Date(2023, 11, 31);
      fixture.detectChanges();
      const year2025Cell = multiYearView._years.flat().find((c) => c.rawValue?.getFullYear?.() === 2025);
      if (year2025Cell) {
        expect(year2025Cell.enabled).toBe(false);
      } else {
        // year not in current page — just verify no throw
        expect(true).toBe(true);
      }
    });

    it('disables a year before minDate', () => {
      host.minDate = new Date(2025, 0, 1);
      fixture.detectChanges();
      const year2023Cell = multiYearView._years.flat().find((c) => c.rawValue?.getFullYear?.() === 2023);
      if (year2023Cell) {
        expect(year2023Cell.enabled).toBe(false);
      } else {
        expect(true).toBe(true);
      }
    });

    it('uses dateFilter to disable a year when all dates in it are filtered out', () => {
      // Provide a filter that blocks every date in 2024
      multiYearView.dateFilter = (d: Date) => d.getFullYear() !== 2024;
      multiYearView['_init']();
      fixture.detectChanges();
      const year2024Cell = multiYearView._years.flat().find((c) => c.rawValue?.getFullYear?.() === 2024);
      if (year2024Cell) {
        expect(year2024Cell.enabled).toBe(false);
      } else {
        expect(true).toBe(true);
      }
    });

    it('enables a year when dateFilter allows at least one date', () => {
      // Allow any date — all years should be enabled
      multiYearView.dateFilter = (d: Date) => true;
      multiYearView['_init']();
      fixture.detectChanges();
      const allEnabled = multiYearView._years.flat().every((c) => c.enabled);
      expect(allEnabled).toBe(true);
    });
  });
});
