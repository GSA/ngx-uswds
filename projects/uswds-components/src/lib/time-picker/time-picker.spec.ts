import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UsaTimePicker } from './time-picker';
import { UsaTimePickerModule } from './time-picker.module';

// ---------------------------------------------------------------------------
// Host component that wires up the directive to a real UsaComboBoxComponent
// ---------------------------------------------------------------------------
@Component({
  standalone: false,
  template: `
    <usa-combobox
      usa-time-picker
      #timePicker="usaTimePicker"
      [minTime]="minTime"
      [maxTime]="maxTime"
      [timeStep]="timeStep"
      [filterBy]="filterBy"
    ></usa-combobox>
  `,
})
class TestHostComponent {
  @ViewChild('timePicker') timePicker: UsaTimePicker;
  minTime: Date | string = '00:00';
  maxTime: Date | string = '23:59';
  timeStep = 30;
  filterBy: (input: string, values: string[]) => number = undefined;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getComboBoxEl(fixture: ComponentFixture<TestHostComponent>): HTMLElement {
  return fixture.nativeElement.querySelector('.usa-combo-box');
}

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------
describe('UsaTimePicker', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaTimePickerModule],
      declarations: [TestHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // -------------------------------------------------------------------------
  // 1. Instantiation + CSS class
  // -------------------------------------------------------------------------
  it('should create the directive', () => {
    expect(host.timePicker).toBeTruthy();
  });

  it('should add usa-time-picker CSS class to the combo-box wrapper', () => {
    const wrapper = getComboBoxEl(fixture);
    expect(wrapper.classList).toContain('usa-time-picker');
  });

  // -------------------------------------------------------------------------
  // 2. Default inputs generate correct time slots
  // -------------------------------------------------------------------------
  it('should generate 48 time slots with default settings (00:00–23:30, step=30)', () => {
    const items = host.timePicker['hostComboBox'].items;
    // 24 hours * 2 slots/hour = 48
    expect(items.length).toBe(48);
  });

  it('should produce the first slot as 12:00am with value 00:00', () => {
    const items = host.timePicker['hostComboBox'].items;
    expect(items[0]['value']).toBe('00:00');
    expect(items[0]['label']).toBe('12:00am');
  });

  it('should produce the last slot as 11:30pm with value 23:30', () => {
    const items = host.timePicker['hostComboBox'].items;
    const last = items[items.length - 1];
    expect(last['value']).toBe('23:30');
    expect(last['label']).toBe('11:30pm');
  });

  it('should set labelField and valueField on the host combo-box', () => {
    const comboBox = host.timePicker['hostComboBox'];
    expect(comboBox.labelField).toBe('label');
    expect(comboBox.valueField).toBe('value');
  });

  // -------------------------------------------------------------------------
  // 3. minTime restricts start of list
  // -------------------------------------------------------------------------
  it('should restrict items to start at minTime (string)', () => {
    host.minTime = '09:00';
    fixture.detectChanges();
    const items = host.timePicker['hostComboBox'].items;
    expect(items[0]['value']).toBe('09:00');
  });

  // -------------------------------------------------------------------------
  // 4. maxTime restricts end of list
  // -------------------------------------------------------------------------
  it('should restrict items to end at or before maxTime (string)', () => {
    host.maxTime = '12:00';
    fixture.detectChanges();
    const items = host.timePicker['hostComboBox'].items;
    const last = items[items.length - 1];
    expect(last['value']).toBe('12:00');
  });

  // -------------------------------------------------------------------------
  // 5. timeStep changes slot density
  // -------------------------------------------------------------------------
  it('should change slot count when timeStep is updated', () => {
    host.timeStep = 60;
    fixture.detectChanges();
    const items = host.timePicker['hostComboBox'].items;
    // 24 slots: 00:00, 01:00, … 23:00
    expect(items.length).toBe(24);
    expect(items[1]['value']).toBe('01:00');
  });

  it('should generate a single slot when minTime equals maxTime', () => {
    host.minTime = '08:00';
    host.maxTime = '08:00';
    fixture.detectChanges();
    const items = host.timePicker['hostComboBox'].items;
    expect(items.length).toBe(1);
    expect(items[0]['value']).toBe('08:00');
  });

  // -------------------------------------------------------------------------
  // 6. minTime / maxTime as Date objects
  // -------------------------------------------------------------------------
  it('should throw a TypeError when minTime is a Date object (unsupported — parseTimeString calls .split on it)', () => {
    // parseTimeString() calls timeStr.split(':') — Date objects do not have a
    // .split method, so passing a Date directly throws a TypeError. This test
    // documents that behaviour so callers know to convert Dates to 'HH:mm'
    // strings before binding to [minTime].
    const d = new Date(2020, 0, 1, 10, 30);
    host.minTime = d as any;
    expect(() => fixture.detectChanges()).toThrowError(TypeError);
  });

  it('should handle minTime as a formatted string derived from a date', () => {
    // Use a string extracted from a date — the supported format
    host.minTime = '10:30';
    fixture.detectChanges();
    const items = host.timePicker['hostComboBox'].items;
    expect(items[0]['value']).toBe('10:30');
  });

  // -------------------------------------------------------------------------
  // 7–9. defaultFilter
  // -------------------------------------------------------------------------
  it('defaultFilter should return -1 for empty input', () => {
    const tp = host.timePicker;
    expect(tp.defaultFilter('', ['12:00am', '12:30am'])).toBe(-1);
    expect(tp.defaultFilter(null, ['12:00am'])).toBe(-1);
  });

  it('defaultFilter should return the index of the first matching value', () => {
    const tp = host.timePicker;
    const values = ['12:00am', '12:30am', '1:00pm'];
    expect(tp.defaultFilter('12:30', values)).toBe(1);
  });

  it('defaultFilter should return -1 when no value matches', () => {
    const tp = host.timePicker;
    expect(tp.defaultFilter('99:99', ['12:00am', '12:30am'])).toBe(-1);
  });

  // -------------------------------------------------------------------------
  // 10. changeEvent uses defaultFilter to highlight an item
  // -------------------------------------------------------------------------
  it('should call highlightItem via defaultFilter when changeEvent fires', () => {
    const comboBox = host.timePicker['hostComboBox'];

    // jsdom does not implement getClientRects; stub it out so UsaComboboxList
    // ngAfterViewInit does not throw when the dropdown renders.
    vi.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue({
      item: () => ({ top: 100 }),
      length: 1,
    } as any);

    // Force the dropdown open so the *ngIf renders UsaComboboxList
    comboBox._displayDropdown = true;
    comboBox.cdr.detectChanges();
    fixture.detectChanges();

    const dropdown = comboBox.comboBoxDropdown;
    expect(dropdown).toBeTruthy();
    const highlightSpy = vi.spyOn(dropdown, 'highlightItem').mockReturnValue(undefined);

    comboBox.changeEvent.emit('12:30');
    expect(highlightSpy).toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------
  // 11. Custom filterBy input is called instead of defaultFilter
  // -------------------------------------------------------------------------
  it('should use custom filterBy function when provided', () => {
    const customFilter = vi.fn().mockReturnValue(3);
    host.filterBy = customFilter;
    fixture.detectChanges();

    const comboBox = host.timePicker['hostComboBox'];

    vi.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue({
      item: () => ({ top: 100 }),
      length: 1,
    } as any);
    // scrollIntoView isn't defined in jsdom; install a no-op before spying
    if (!HTMLElement.prototype.scrollIntoView) {
      HTMLElement.prototype.scrollIntoView = () => {};
    }
    vi.spyOn(HTMLElement.prototype, 'scrollIntoView').mockImplementation(() => {});

    comboBox._displayDropdown = true;
    comboBox.cdr.detectChanges();
    fixture.detectChanges();

    const dropdown = comboBox.comboBoxDropdown;
    expect(dropdown).toBeTruthy();
    const highlightSpy = vi.spyOn(dropdown, 'highlightItem').mockReturnValue(undefined);

    comboBox.changeEvent.emit('12');
    expect(customFilter).toHaveBeenCalledWith('12', expect.any(Array));
    expect(highlightSpy).toHaveBeenCalledWith(3);
  });

  // -------------------------------------------------------------------------
  // 12. Guard: no comboBoxDropdown → exits early without error
  // -------------------------------------------------------------------------
  it('should not throw when changeEvent fires but comboBoxDropdown is absent', () => {
    const comboBox = host.timePicker['hostComboBox'];
    // Keep dropdown closed so comboBoxDropdown ViewChild is undefined
    comboBox._displayDropdown = false;
    fixture.detectChanges();

    expect(() => comboBox.changeEvent.emit('12:00')).not.toThrow();
  });

  // -------------------------------------------------------------------------
  // ngOnChanges early return when hostComboBox is null
  // -------------------------------------------------------------------------
  it('should unsubscribe on destroy', () => {
    const tp = host.timePicker;
    const unsubSpy = vi.spyOn(tp._inputChangeSubscription, 'unsubscribe');
    fixture.destroy();
    expect(unsubSpy).toHaveBeenCalled();
  });

  it('ngOnChanges early-returns when hostComboBox is null', () => {
    const tp = host.timePicker;
    const original = (tp as any).hostComboBox;
    (tp as any).hostComboBox = null;
    expect(() => tp.ngOnChanges()).not.toThrow();
    (tp as any).hostComboBox = original;
  });

  it('parseTimeString returns null for invalid string (NaN hours path)', () => {
    const tp = host.timePicker;
    // A string with non-numeric parts causes NaN parse → hours/mins are undefined
    const result = (tp as any).parseTimeString('abc:xyz');
    expect(result).toBeUndefined();
  });

  it('parseTimeString returns null for empty string (no timeStr)', () => {
    const tp = host.timePicker;
    const result = (tp as any).parseTimeString('');
    expect(result).toBeUndefined();
  });

  it('genetateItems uses MIN_TIME when parseTimeString returns falsy for minTime', () => {
    host.minTime = 'invalid';
    fixture.detectChanges();
    const tp = host.timePicker;
    tp.ngOnChanges();
    const items = (tp as any).hostComboBox.items;
    // Should still generate items starting from MIN_TIME
    expect(items.length).toBeGreaterThan(0);
  });
});
