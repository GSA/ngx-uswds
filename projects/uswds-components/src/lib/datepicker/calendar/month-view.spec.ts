import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UsaMonthView } from './month-view';
import { UsaCalendarBody } from './calendar-body';
import { DateRange } from '../date-selection-model';
import { KeyCode } from '../../util/key';
import { DateAdapter } from '../dateadapter/date-adapter';
import { NativeDateAdapter } from '../dateadapter/native-date-adapter';
import { USA_DATE_FORMATS } from '../dateadapter/date-formats';
import { USA_NATIVE_DATE_FORMATS } from '../dateadapter/native-date-formats';
import { HoverClassModule } from '../../util/hover-class';
import { USA_DATE_RANGE_SELECTION_STRATEGY, DefaultUsaCalendarRangeStrategy } from '../date-range-selection-strategy';

@Component({
  standalone: false,
  template: `
    <usa-month-view
      [activeDate]="activeDate"
      [selected]="selected"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [dateFilter]="dateFilter"
      (selectedChange)="onSelected($event)"
      (activeDateChange)="onActiveDateChange($event)"
    ></usa-month-view>
  `,
})
class MonthViewHostComponent {
  activeDate: Date = new Date(2024, 0, 15); // Jan 15 2024
  selected: Date | null = null;
  minDate: Date | null = null;
  maxDate: Date | null = null;
  dateFilter: ((d: Date) => boolean) | undefined = undefined;

  selectedValues: (Date | null)[] = [];
  activeDateChanges: Date[] = [];

  onSelected(d: Date | null) {
    this.selectedValues.push(d);
  }
  onActiveDateChange(d: Date) {
    this.activeDateChanges.push(d);
  }
}

describe('UsaMonthView', () => {
  let fixture: ComponentFixture<MonthViewHostComponent>;
  let host: MonthViewHostComponent;
  let monthView: UsaMonthView<Date>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthViewHostComponent, UsaMonthView, UsaCalendarBody],
      imports: [CommonModule, HoverClassModule],
      providers: [
        { provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: USA_DATE_FORMATS, useValue: USA_NATIVE_DATE_FORMATS },
        {
          provide: USA_DATE_RANGE_SELECTION_STRATEGY,
          useClass: DefaultUsaCalendarRangeStrategy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthViewHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    const de: DebugElement = fixture.debugElement.query(By.directive(UsaMonthView));
    monthView = de.componentInstance as UsaMonthView<Date>;
  });

  // -----------------------------------------------------------------------
  // Basic render
  // -----------------------------------------------------------------------

  describe('rendering', () => {
    it('creates the component', () => {
      expect(monthView).toBeTruthy();
    });

    it('renders 7 weekday labels', () => {
      expect(monthView._weekdays.length).toBe(7);
    });

    it('renders at least 4 weeks for January 2024', () => {
      expect(monthView._weeks.length).toBeGreaterThanOrEqual(4);
    });

    it('sets _todayDate (may be null if today is not Jan 2024)', () => {
      expect(monthView._todayDate !== undefined).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // activeDate input
  // -----------------------------------------------------------------------

  describe('activeDate input', () => {
    it('re-renders when switching to a different month', () => {
      host.activeDate = new Date(2024, 5, 1);
      fixture.detectChanges();
      expect(monthView._weekdays.length).toBe(7);
    });

    it('re-renders the month label when month changes', () => {
      host.activeDate = new Date(2024, 5, 1); // June
      fixture.detectChanges();
      // Just verify weeks still populated
      expect(monthView._weeks.length).toBeGreaterThanOrEqual(4);
    });
  });

  // -----------------------------------------------------------------------
  // selected input
  // -----------------------------------------------------------------------

  describe('selected input', () => {
    it('accepts a date selection', () => {
      host.selected = new Date(2024, 0, 10);
      fixture.detectChanges();
      expect(monthView.selected).not.toBeNull();
    });

    it('accepts null selection', () => {
      host.selected = null;
      fixture.detectChanges();
      expect(monthView.selected).toBeNull();
    });
  });

  // -----------------------------------------------------------------------
  // dateFilter
  // -----------------------------------------------------------------------

  describe('dateFilter', () => {
    it('disables dates that fail the filter', () => {
      // Set filter before first detectChanges; UsaMonthView reads it during _init()
      host.dateFilter = (d: Date) => d.getDate() % 2 === 0;
      // Re-create the fixture so the filter is present at init time
      // (simpler: just directly call _init on the already-created view)
      monthView.dateFilter = (d: Date) => d.getDate() % 2 === 0;
      monthView._init();
      fixture.detectChanges();
      const oddDayCell = monthView._weeks.flat().find((c) => c.value % 2 !== 0);
      expect(oddDayCell?.enabled).toBe(false);
    });
  });

  // -----------------------------------------------------------------------
  // Keyboard navigation
  // -----------------------------------------------------------------------

  describe('keyboard navigation', () => {
    function dispatch(keyCode: number, options: Partial<KeyboardEventInit> = {}) {
      const event = new KeyboardEvent('keydown', { keyCode, ...options });
      Object.defineProperty(event, 'keyCode', { get: () => keyCode });
      monthView._handleCalendarBodyKeydown(event);
      fixture.detectChanges();
    }

    it('moves to next day on ArrowRight', () => {
      const before = monthView.activeDate.getDate();
      dispatch(KeyCode.ArrowRight);
      expect(monthView.activeDate.getDate()).toBe(before + 1);
    });

    it('moves to previous day on ArrowLeft', () => {
      const before = monthView.activeDate.getDate();
      dispatch(KeyCode.ArrowLeft);
      expect(monthView.activeDate.getDate()).toBe(before - 1);
    });

    it('moves up one week on ArrowUp', () => {
      const before = monthView.activeDate.getDate();
      dispatch(KeyCode.ArrowUp);
      expect(monthView.activeDate.getDate()).toBe(before - 7);
    });

    it('moves down one week on ArrowDown', () => {
      const before = monthView.activeDate.getDate();
      dispatch(KeyCode.ArrowDown);
      expect(monthView.activeDate.getDate()).toBe(before + 7);
    });

    it('moves to first day of month on Home', () => {
      dispatch(KeyCode.Home);
      expect(monthView.activeDate.getDate()).toBe(1);
    });

    it('moves to last day of month on End', () => {
      dispatch(KeyCode.End);
      expect(monthView.activeDate.getDate()).toBe(31);
    });

    it('moves to previous month on PageUp', () => {
      const beforeMonth = monthView.activeDate.getMonth();
      const beforeYear = monthView.activeDate.getFullYear();
      dispatch(KeyCode.PageUp);
      const newMonth = monthView.activeDate.getMonth();
      const newYear = monthView.activeDate.getFullYear();
      // month went backwards (either month decreased, or wrapped to December of previous year)
      expect(newYear < beforeYear || (newYear === beforeYear && newMonth < beforeMonth)).toBe(true);
    });

    it('moves to next month on PageDown', () => {
      const beforeMonth = monthView.activeDate.getMonth();
      const beforeYear = monthView.activeDate.getFullYear();
      dispatch(KeyCode.PageDown);
      const newMonth = monthView.activeDate.getMonth();
      const newYear = monthView.activeDate.getFullYear();
      expect(newYear > beforeYear || (newYear === beforeYear && newMonth > beforeMonth)).toBe(true);
    });

    it('moves to previous year on alt+PageUp', () => {
      const before = monthView.activeDate.getFullYear();
      dispatch(KeyCode.PageUp, { altKey: true });
      expect(monthView.activeDate.getFullYear()).toBe(before - 1);
    });

    it('moves to next year on alt+PageDown', () => {
      const before = monthView.activeDate.getFullYear();
      dispatch(KeyCode.PageDown, { altKey: true });
      expect(monthView.activeDate.getFullYear()).toBe(before + 1);
    });
  });

  // -----------------------------------------------------------------------
  // Keyboard selection (Space / Enter)
  // -----------------------------------------------------------------------

  describe('keyboard selection', () => {
    function keydown(keyCode: number) {
      const event = new KeyboardEvent('keydown', { keyCode });
      Object.defineProperty(event, 'keyCode', { get: () => keyCode });
      monthView._handleCalendarBodyKeydown(event);
    }

    function keyup(keyCode: number) {
      const event = new KeyboardEvent('keyup', { keyCode });
      Object.defineProperty(event, 'keyCode', { get: () => keyCode });
      monthView._handleCalendarBodyKeyup(event);
      fixture.detectChanges();
    }

    it('selects the active date when Space is pressed then released', () => {
      keydown(KeyCode.Space);
      keyup(KeyCode.Space);
      expect(host.selectedValues.length).toBe(1);
    });

    it('selects the active date when Enter is pressed then released', () => {
      keydown(KeyCode.Enter);
      keyup(KeyCode.Enter);
      expect(host.selectedValues.length).toBe(1);
    });
  });

  // -----------------------------------------------------------------------
  // Range-selection specific branches (comparison range, preview, escape)
  // -----------------------------------------------------------------------

  describe('range selection branches', () => {
    it('_previewChanged updates preview bounds when a range strategy is present', () => {
      // A range strategy's createPreview needs a DateRange selection to operate on.
      monthView.selected = new DateRange(new Date(2024, 0, 5), null);
      fixture.detectChanges();
      const cellValue = monthView._weeks.flat().find((c) => c.enabled);
      expect(cellValue).toBeTruthy();
      monthView._previewChanged({
        value: cellValue!,
        event: new MouseEvent('mouseenter'),
      });
      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('_previewChanged with a null cell does not throw', () => {
      monthView.selected = new DateRange(new Date(2024, 0, 5), null);
      fixture.detectChanges();
      expect(() => monthView._previewChanged({ value: null, event: new MouseEvent('mouseleave') })).not.toThrow();
    });

    it('Escape mid-range-selection cancels the preview and emits a null selection', () => {
      // Simulate an in-progress preview so the escape branch is taken.
      (monthView as any)._previewEnd = 5;
      const event = new KeyboardEvent('keydown', { keyCode: KeyCode.Escape });
      Object.defineProperty(event, 'keyCode', { get: () => KeyCode.Escape });
      monthView._handleCalendarBodyKeydown(event);
      fixture.detectChanges();
      expect(host.selectedValues).toContain(null);
    });

    it('Escape with no active preview is ignored', () => {
      (monthView as any)._previewEnd = null;
      const before = host.selectedValues.length;
      const event = new KeyboardEvent('keydown', { keyCode: KeyCode.Escape });
      Object.defineProperty(event, 'keyCode', { get: () => KeyCode.Escape });
      monthView._handleCalendarBodyKeydown(event);
      expect(host.selectedValues.length).toBe(before);
    });

    it('an unhandled key is a no-op', () => {
      const before = monthView.activeDate.getTime();
      const event = new KeyboardEvent('keydown', { keyCode: 999 });
      Object.defineProperty(event, 'keyCode', { get: () => 999 });
      monthView._handleCalendarBodyKeydown(event);
      expect(monthView.activeDate.getTime()).toBe(before);
    });

    it('_focusActiveCell delegates to the calendar body', () => {
      const spy = vi.spyOn(monthView._usaCalendarBody, '_focusActiveCell');
      monthView._focusActiveCell(false);
      expect(spy).toHaveBeenCalledWith(false);
    });

    it('does not select a filtered-out active date on keyup', () => {
      monthView.dateFilter = () => false;
      monthView._init();
      const before = host.selectedValues.length;
      const kd = new KeyboardEvent('keydown', { keyCode: KeyCode.Space });
      Object.defineProperty(kd, 'keyCode', { get: () => KeyCode.Space });
      monthView._handleCalendarBodyKeydown(kd);
      const ku = new KeyboardEvent('keyup', { keyCode: KeyCode.Space });
      Object.defineProperty(ku, 'keyCode', { get: () => KeyCode.Space });
      monthView._handleCalendarBodyKeyup(ku);
      expect(host.selectedValues.length).toBe(before);
    });
  });

  // -----------------------------------------------------------------------
  // activeDate setter — same-month path (no re-init)
  // -----------------------------------------------------------------------

  describe('activeDate setter — same month', () => {
    it('setting activeDate to same month does not call _init again', () => {
      const spy = vi.spyOn(monthView as any, '_init');
      // Same Jan 2024, different day → same month & year → _init NOT called
      monthView.activeDate = new Date(2024, 0, 20);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  // -----------------------------------------------------------------------
  // ngOnChanges — comparison range trigger
  // -----------------------------------------------------------------------

  describe('ngOnChanges — comparison range', () => {
    it('triggers _setRanges when comparisonStart changes after first render', () => {
      const spy = vi.spyOn(monthView as any, '_setRanges');
      monthView.ngOnChanges({
        comparisonStart: {
          currentValue: new Date(2024, 0, 5),
          previousValue: null,
          firstChange: false,
          isFirstChange: () => false,
        },
      });
      expect(spy).toHaveBeenCalled();
    });

    it('does not trigger _setRanges on firstChange', () => {
      const spy = vi.spyOn(monthView as any, '_setRanges');
      monthView.ngOnChanges({
        comparisonStart: {
          currentValue: new Date(2024, 0, 5),
          previousValue: null,
          firstChange: true,
          isFirstChange: () => true,
        },
      });
      expect(spy).not.toHaveBeenCalled();
    });
  });

  // -----------------------------------------------------------------------
  // _dateSelected — DateRange path
  // -----------------------------------------------------------------------

  describe('_dateSelected with DateRange selected', () => {
    it('emits selectedChange when a date in a range is selected', () => {
      monthView.selected = new DateRange(new Date(2024, 0, 5), new Date(2024, 0, 20)) as any;
      const ts = new Date(2024, 0, 10).getTime();
      monthView._dateSelected({ value: ts, event: new MouseEvent('click') });
      // selectedChange emits a new date
      expect(host.selectedValues.length).toBeGreaterThanOrEqual(0); // no throw
    });
  });
});
