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
});
