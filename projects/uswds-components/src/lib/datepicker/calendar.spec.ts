import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UsaDatePickerModule } from './date-picker.module';
import { UsaCalendar, UsaCalendarHeader, UsaCalendarView } from './calendar/calendar';

@Component({
  standalone: false,
  template: `
    <usa-calendar
      [startAt]="startAt"
      [startView]="startView"
      [selected]="selected"
      [minDate]="minDate"
      [maxDate]="maxDate"
      (selectedChange)="onSelectedChange($event)"
      (yearSelected)="onYearSelected($event)"
      (monthSelected)="onMonthSelected($event)"
      (viewChanged)="onViewChanged($event)"
    ></usa-calendar>
  `,
})
class CalendarTestHostComponent {
  startAt: Date | null = new Date(2024, 0, 15);
  startView: UsaCalendarView = 'month';
  selected: Date | null = null;
  minDate: Date | null = null;
  maxDate: Date | null = null;
  selectedValues: (Date | null)[] = [];
  yearSelectedValues: Date[] = [];
  monthSelectedValues: Date[] = [];
  viewChangedValues: UsaCalendarView[] = [];

  onSelectedChange(d: Date | null) {
    this.selectedValues.push(d);
  }
  onYearSelected(d: Date) {
    this.yearSelectedValues.push(d);
  }
  onMonthSelected(d: Date) {
    this.monthSelectedValues.push(d);
  }
  onViewChanged(v: UsaCalendarView) {
    this.viewChangedValues.push(v);
  }
}

describe('UsaCalendar', () => {
  let fixture: ComponentFixture<CalendarTestHostComponent>;
  let host: CalendarTestHostComponent;
  let calendarDE: DebugElement;
  let calendar: UsaCalendar<Date>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarTestHostComponent],
      imports: [UsaDatePickerModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarTestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    calendarDE = fixture.debugElement.query(By.directive(UsaCalendar));
    calendar = calendarDE.componentInstance as UsaCalendar<Date>;
  });

  // -----------------------------------------------------------------------
  // Construction & initial state
  // -----------------------------------------------------------------------

  describe('initial state', () => {
    it('creates the component', () => {
      expect(calendar).toBeTruthy();
    });

    it('starts in month view by default', () => {
      expect(calendar.currentView).toBe('month');
    });

    it('sets activeDate from startAt input', () => {
      expect(calendar.activeDate.getFullYear()).toBe(2024);
      expect(calendar.activeDate.getMonth()).toBe(0);
    });
  });

  // -----------------------------------------------------------------------
  // startView input — tested via freshly created fixtures
  // -----------------------------------------------------------------------

  describe('startView input', () => {
    async function buildWithStartView(startView: UsaCalendarView) {
      const f = TestBed.createComponent(CalendarTestHostComponent);
      f.componentInstance.startView = startView;
      f.detectChanges();
      await f.whenStable();
      return f.debugElement.query(By.directive(UsaCalendar)).componentInstance as UsaCalendar<Date>;
    }

    it('starts in year view when startView="year"', async () => {
      const cal = await buildWithStartView('year');
      expect(cal.currentView).toBe('year');
    });

    it('starts in multi-year view when startView="multi-year"', async () => {
      const cal = await buildWithStartView('multi-year');
      expect(cal.currentView).toBe('multi-year');
    });
  });

  // -----------------------------------------------------------------------
  // View switching via public setters
  // -----------------------------------------------------------------------

  describe('currentView setter', () => {
    it('switches to year view and emits viewChanged', fakeAsync(() => {
      // calendar starts in month; switching to year should emit viewChanged
      const before = host.viewChangedValues.length;
      calendar.currentView = 'year';
      fixture.detectChanges();
      tick(); // flush async EventEmitter (created with `true`)
      expect(calendar.currentView).toBe('year');
      expect(host.viewChangedValues.length).toBeGreaterThan(before);
      expect(host.viewChangedValues[host.viewChangedValues.length - 1]).toBe('year');
    }));

    it('switches to multi-year view', () => {
      calendar.currentView = 'multi-year';
      fixture.detectChanges();
      expect(calendar.currentView).toBe('multi-year');
    });

    it('does not emit viewChanged when setting the same view', () => {
      const before = host.viewChangedValues.length;
      calendar.currentView = 'month';
      fixture.detectChanges();
      // still month — no new emission
      expect(host.viewChangedValues.length).toBe(before);
    });
  });

  // -----------------------------------------------------------------------
  // Date selection
  // -----------------------------------------------------------------------

  describe('date selection', () => {
    it('emits selectedChange when _dateSelected is called with a new date', () => {
      const d = new Date(2024, 0, 20);
      calendar._dateSelected({ value: d, event: new MouseEvent('click') });
      expect(host.selectedValues.length).toBe(1);
    });

    it('does not emit selectedChange when same date is selected again', () => {
      const d = new Date(2024, 0, 20);
      host.selected = d;
      fixture.detectChanges();
      calendar._dateSelected({ value: d, event: new MouseEvent('click') });
      // sameDate match — no new emission
      expect(host.selectedValues.length).toBe(0);
    });
  });

  // -----------------------------------------------------------------------
  // min / max inputs
  // -----------------------------------------------------------------------

  describe('minDate / maxDate', () => {
    it('accepts a minDate input', () => {
      host.minDate = new Date(2024, 0, 1);
      fixture.detectChanges();
      expect(calendar.minDate).not.toBeNull();
    });

    it('accepts a maxDate input', () => {
      host.maxDate = new Date(2024, 11, 31);
      fixture.detectChanges();
      expect(calendar.maxDate).not.toBeNull();
    });
  });

  // -----------------------------------------------------------------------
  // Year / month relay outputs
  // -----------------------------------------------------------------------

  describe('year/month relay', () => {
    it('relays year selected from multi-year view', () => {
      const d = new Date(2025, 0, 1);
      calendar._yearSelectedInMultiYearView(d);
      expect(host.yearSelectedValues.length).toBe(1);
    });

    it('relays month selected from year view', () => {
      const d = new Date(2024, 5, 1);
      calendar._monthSelectedInYearView(d);
      expect(host.monthSelectedValues.length).toBe(1);
    });
  });

  // -----------------------------------------------------------------------
  // ngOnChanges — re-initialises the view
  // -----------------------------------------------------------------------

  describe('ngOnChanges', () => {
    it('emits stateChanges when minDate changes', () => {
      let count = 0;
      calendar.stateChanges.subscribe(() => count++);
      host.minDate = new Date(2024, 0, 1);
      fixture.detectChanges();
      expect(count).toBeGreaterThan(0);
    });
  });

  // -----------------------------------------------------------------------
  // updateTodaysDate
  // -----------------------------------------------------------------------

  describe('updateTodaysDate', () => {
    it('can be called without error', () => {
      expect(() => calendar.updateTodaysDate()).not.toThrow();
    });
  });

  // -----------------------------------------------------------------------
  // _goToDateInView
  // -----------------------------------------------------------------------

  describe('_goToDateInView', () => {
    it('changes activeDate and view', () => {
      const d = new Date(2025, 5, 1);
      calendar._goToDateInView(d, 'year');
      fixture.detectChanges();
      expect(calendar.currentView).toBe('year');
      expect(calendar.activeDate.getFullYear()).toBe(2025);
    });
  });
});

// ---------------------------------------------------------------------------
// UsaCalendarHeader — nav button coverage
// ---------------------------------------------------------------------------

describe('UsaCalendarHeader', () => {
  let fixture: ComponentFixture<CalendarTestHostComponent>;
  let header: UsaCalendarHeader<Date>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarTestHostComponent],
      imports: [UsaDatePickerModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarTestHostComponent);
    fixture.detectChanges();

    const headerDe = fixture.debugElement.query(By.directive(UsaCalendarHeader));
    header = headerDe.componentInstance;
  });

  it('creates the header', () => {
    expect(header).toBeTruthy();
  });

  it('monthLabel returns a non-empty string', () => {
    expect(header.monthLabel.length).toBeGreaterThan(0);
  });

  it('yearLabel returns a non-empty string', () => {
    expect(header.yearLabel.length).toBeGreaterThan(0);
  });

  it('previousClicked steps back a month', () => {
    const before = header.calendar.activeDate.getTime();
    header.previousClicked();
    fixture.detectChanges();
    expect(header.calendar.activeDate.getTime()).toBeLessThan(before);
  });

  it('nextClicked steps forward a month', () => {
    const before = header.calendar.activeDate.getTime();
    header.nextClicked();
    fixture.detectChanges();
    expect(header.calendar.activeDate.getTime()).toBeGreaterThan(before);
  });

  it('monthClicked switches to year view', () => {
    header.monthClicked();
    fixture.detectChanges();
    expect(header.calendar.currentView).toBe('year');
  });

  it('yearClicked switches to multi-year view', () => {
    header.yearClicked();
    fixture.detectChanges();
    expect(header.calendar.currentView).toBe('multi-year');
  });

  it('nextYearClicked steps forward a year', () => {
    const before = header.calendar.activeDate.getFullYear();
    header.nextYearClicked();
    fixture.detectChanges();
    expect(header.calendar.activeDate.getFullYear()).toBeGreaterThan(before);
  });

  it('previousYearClicked steps back a year', () => {
    const before = header.calendar.activeDate.getFullYear();
    header.previousYearClicked();
    fixture.detectChanges();
    expect(header.calendar.activeDate.getFullYear()).toBeLessThan(before);
  });

  it('previousEnabled returns true when no minDate', () => {
    expect(header.previousEnabled()).toBe(true);
  });

  it('nextEnabled returns true when no maxDate', () => {
    expect(header.nextEnabled()).toBe(true);
  });

  it('previousYearEnabled returns true when no minDate', () => {
    expect(header.previousYearEnabled()).toBe(true);
  });

  it('nextYearEnabled returns true when no maxDate', () => {
    expect(header.nextYearEnabled()).toBe(true);
  });
});
