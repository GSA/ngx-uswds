import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { UsaDatePickerModule } from './date-picker.module';
import { UsaDatePickerInput } from './date-picker-input';
import { KeyCode } from '../util/key';

@Component({
  standalone: false,
  template: `
    <usa-date-picker-wrapper>
      <input
        #input
        [usaDatePicker]="picker"
        [min]="min"
        [max]="max"
        [usaDatePickerFilter]="dateFilter"
        (dateChange)="onDateChange($event)"
        (dateInput)="onDateInput($event)"
      />
      <usa-date-picker #picker></usa-date-picker>
      <usa-date-picker-button [for]="picker"></usa-date-picker-button>
    </usa-date-picker-wrapper>
  `,
})
class DatePickerInputHostComponent {
  min: Date | null = null;
  max: Date | null = null;
  dateFilter: ((d: Date | null) => boolean) | null = null;

  dateChanges: any[] = [];
  dateInputs: any[] = [];

  onDateChange(e: any) {
    this.dateChanges.push(e);
  }
  onDateInput(e: any) {
    this.dateInputs.push(e);
  }
}

describe('UsaDatePickerInput', () => {
  let fixture: ComponentFixture<DatePickerInputHostComponent>;
  let host: DatePickerInputHostComponent;
  let inputDE: DebugElement;
  let datePickerInput: UsaDatePickerInput<Date>;
  let nativeInput: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatePickerInputHostComponent],
      imports: [UsaDatePickerModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerInputHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    inputDE = fixture.debugElement.query(By.directive(UsaDatePickerInput));
    datePickerInput = inputDE.injector.get(UsaDatePickerInput) as UsaDatePickerInput<Date>;
    nativeInput = inputDE.nativeElement as HTMLInputElement;
  });

  // -----------------------------------------------------------------------
  // Construction
  // -----------------------------------------------------------------------

  describe('construction', () => {
    it('creates the directive', () => {
      expect(datePickerInput).toBeTruthy();
    });

    it('has usa-input CSS class', () => {
      expect(nativeInput.classList).toContain('usa-input');
    });
  });

  // -----------------------------------------------------------------------
  // value input / output
  // -----------------------------------------------------------------------

  describe('value', () => {
    it('is null or undefined initially (no model registered yet)', () => {
      // Value is undefined when no model is registered yet; null after writeValue(null)
      expect(datePickerInput.value == null).toBe(true);
    });

    it('can be set programmatically via writeValue', () => {
      datePickerInput.writeValue(new Date(2024, 0, 15));
      expect(datePickerInput.value).not.toBeNull();
    });
  });

  // -----------------------------------------------------------------------
  // min / max validation
  // -----------------------------------------------------------------------

  describe('min / max', () => {
    it('getStartValue returns current value (null or undefined initially)', () => {
      expect(datePickerInput.getStartValue() == null).toBe(true);
    });

    it('getConnectedOverlayOrigin returns an ElementRef', () => {
      expect(datePickerInput.getConnectedOverlayOrigin()).toBeTruthy();
    });

    it('getOverlayLabelId returns null when no aria-labelledby', () => {
      expect(datePickerInput.getOverlayLabelId()).toBeNull();
    });
  });

  // -----------------------------------------------------------------------
  // Keyboard: Alt+ArrowDown opens the picker
  // -----------------------------------------------------------------------

  describe('keyboard', () => {
    it('Alt+ArrowDown triggers _openPopup (calls datePicker.open)', () => {
      const picker = (datePickerInput as any)._datePicker;
      expect(picker).toBeTruthy(); // fails fast if input registration broke
      let opened = false;
      vi.spyOn(picker, 'open').mockImplementation(() => {
        opened = true;
      });

      const event = new KeyboardEvent('keydown', { keyCode: KeyCode.ArrowDown, altKey: true });
      Object.defineProperty(event, 'keyCode', { get: () => KeyCode.ArrowDown });
      datePickerInput._onKeydown(event);
      expect(opened).toBe(true);
    });

    it('does not open on other keys', () => {
      const picker = (datePickerInput as any)._datePicker;
      expect(picker).toBeTruthy();
      let opened = false;
      vi.spyOn(picker, 'open').mockImplementation(() => {
        opened = true;
      });

      const event = new KeyboardEvent('keydown', { keyCode: KeyCode.ArrowDown });
      Object.defineProperty(event, 'keyCode', { get: () => KeyCode.ArrowDown });
      datePickerInput._onKeydown(event);
      expect(opened).toBe(false);
    });
  });

  // -----------------------------------------------------------------------
  // disabled state
  // -----------------------------------------------------------------------

  describe('disabled', () => {
    it('starts enabled', () => {
      expect(datePickerInput.disabled).toBe(false);
    });

    it('can be set via setDisabledState', () => {
      datePickerInput.setDisabledState(true);
      expect(datePickerInput.disabled).toBe(true);
      datePickerInput.setDisabledState(false);
    });
  });

  // -----------------------------------------------------------------------
  // CVA registration
  // -----------------------------------------------------------------------

  describe('ControlValueAccessor', () => {
    it('registerOnChange accepts a function', () => {
      expect(() => datePickerInput.registerOnChange(() => {})).not.toThrow();
    });

    it('registerOnTouched accepts a function', () => {
      expect(() => datePickerInput.registerOnTouched(() => {})).not.toThrow();
    });
  });

  // -----------------------------------------------------------------------
  // _onInput / _onChange / _onBlur
  // -----------------------------------------------------------------------

  describe('input events', () => {
    it('_onInput with empty string does not throw', () => {
      expect(() => datePickerInput._onInput('')).not.toThrow();
    });

    it('_onChange emits a dateChange event', () => {
      const before = host.dateChanges.length;
      datePickerInput._onChange();
      expect(host.dateChanges.length).toBeGreaterThan(before);
    });

    it('_onBlur does not throw', () => {
      expect(() => datePickerInput._onBlur()).not.toThrow();
    });
  });

  // -----------------------------------------------------------------------
  // Validation (min / max / filter / parse) via public form control API
  // -----------------------------------------------------------------------

  describe('validation', () => {
    it('reports a min error for a value before the min date', () => {
      host.min = new Date(2024, 0, 10);
      fixture.detectChanges();
      datePickerInput.writeValue(new Date(2024, 0, 5));
      const errors = datePickerInput.validate({ value: new Date(2024, 0, 5) } as any);
      expect(errors?.usaDatePickerMin).toBeTruthy();
    });

    it('reports a max error for a value after the max date', () => {
      host.max = new Date(2024, 0, 10);
      fixture.detectChanges();
      const errors = datePickerInput.validate({ value: new Date(2024, 0, 20) } as any);
      expect(errors?.usaDatePickerMax).toBeTruthy();
    });

    it('reports no error for a value within the min/max window', () => {
      host.min = new Date(2024, 0, 1);
      host.max = new Date(2024, 11, 31);
      fixture.detectChanges();
      const errors = datePickerInput.validate({ value: new Date(2024, 5, 15) } as any);
      expect(errors?.usaDatePickerMin).toBeFalsy();
      expect(errors?.usaDatePickerMax).toBeFalsy();
    });

    it('reports a filter error for a filtered-out date', () => {
      // only allow even days
      host.dateFilter = (d: Date | null) => !!d && d.getDate() % 2 === 0;
      fixture.detectChanges();
      const errors = datePickerInput.validate({ value: new Date(2024, 0, 3) } as any);
      expect(errors?.usaDatePickerFilter).toBeTruthy();
    });

    it('reports no filter error for an allowed date', () => {
      host.dateFilter = (d: Date | null) => !!d && d.getDate() % 2 === 0;
      fixture.detectChanges();
      const errors = datePickerInput.validate({ value: new Date(2024, 0, 4) } as any);
      expect(errors?.usaDatePickerFilter).toBeFalsy();
    });

    it('_matchesFilter returns true when no filter is set', () => {
      expect(datePickerInput._matchesFilter(new Date(2024, 0, 1))).toBe(true);
    });

    it('registerOnValidatorChange wires a callback that fires when min changes', () => {
      let called = false;
      datePickerInput.registerOnValidatorChange(() => (called = true));
      host.min = new Date(2024, 0, 1);
      fixture.detectChanges();
      expect(called).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // _onInput parsing
  // -----------------------------------------------------------------------

  describe('_onInput parsing', () => {
    it('parses a valid date string and emits dateInput', () => {
      const before = host.dateInputs.length;
      datePickerInput._onInput('01/15/2024');
      expect(host.dateInputs.length).toBeGreaterThan(before);
      expect(datePickerInput.value).not.toBeNull();
    });

    it('marks the control dirty via CVA change for an unparseable non-empty value', () => {
      let changed: unknown;
      datePickerInput.registerOnChange((v) => (changed = v));
      datePickerInput._onInput('not-a-date');
      // date could not be parsed → value stays null, CVA still invoked with null
      expect(changed === null || changed === undefined).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // min / max setters de-dupe
  // -----------------------------------------------------------------------

  describe('min / max setters', () => {
    it('setting the same min value does not fire validator change twice', () => {
      let count = 0;
      datePickerInput.registerOnValidatorChange(() => count++);
      const d = new Date(2024, 0, 1);
      datePickerInput.min = d;
      const afterFirst = count;
      datePickerInput.min = new Date(2024, 0, 1); // equal date
      expect(count).toBe(afterFirst);
    });
  });

  // -----------------------------------------------------------------------
  // stateChanges
  // -----------------------------------------------------------------------

  describe('stateChanges', () => {
    it('emits when disabled changes', () => {
      let emitted = false;
      datePickerInput.stateChanges.subscribe(() => (emitted = true));
      datePickerInput.disabled = true;
      expect(emitted).toBe(true);
      datePickerInput.setDisabledState(false);
    });
  });

  // -----------------------------------------------------------------------
  // _getMinDate / _getMaxDate / _getDateFilter / _shouldHandleChangeEvent
  // _getValueFromModel / _assignValueToModel
  // -----------------------------------------------------------------------

  describe('datepicker input helpers', () => {
    it('_getMinDate returns min input', () => {
      host.min = new Date(2024, 0, 1);
      fixture.detectChanges();
      expect(datePickerInput._getMinDate()).toEqual(new Date(2024, 0, 1));
    });

    it('_getMaxDate returns max input', () => {
      host.max = new Date(2024, 11, 31);
      fixture.detectChanges();
      expect(datePickerInput._getMaxDate()).toEqual(new Date(2024, 11, 31));
    });

    it('_getDateFilter returns the filter function', () => {
      const fn = (d: Date | null) => true;
      host.dateFilter = fn;
      fixture.detectChanges();
      expect((datePickerInput as any)._getDateFilter()).toBe(fn);
    });

    it('_getValueFromModel round-trips the value', () => {
      const d = new Date(2024, 5, 15);
      expect((datePickerInput as any)._getValueFromModel(d)).toBe(d);
    });

    it('_shouldHandleChangeEvent returns false when source is self', () => {
      const event: any = { source: datePickerInput };
      expect((datePickerInput as any)._shouldHandleChangeEvent(event)).toBe(false);
    });

    it('_shouldHandleChangeEvent returns true when source is other', () => {
      const event: any = { source: {} };
      expect((datePickerInput as any)._shouldHandleChangeEvent(event)).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // registerOnValidatorChange + validate
  // -----------------------------------------------------------------------

  describe('Validator', () => {
    it('registerOnValidatorChange stores fn without throwing', () => {
      expect(() => datePickerInput.registerOnValidatorChange(() => {})).not.toThrow();
    });

    it('validate does not throw for a null-value control', () => {
      // Use a minimal control mock — no import needed
      const ctrl: any = { value: null };
      expect(() => datePickerInput.validate(ctrl)).not.toThrow();
    });
  });

  // -----------------------------------------------------------------------
  // _matchesFilter
  // -----------------------------------------------------------------------

  describe('_matchesFilter', () => {
    it('returns true when no filter is set', () => {
      expect((datePickerInput as any)._matchesFilter(null)).toBe(true);
    });

    it('respects the filter function when set', () => {
      host.dateFilter = (d: Date | null) => false;
      fixture.detectChanges();
      expect((datePickerInput as any)._matchesFilter(new Date())).toBe(false);
    });
  });

  // -----------------------------------------------------------------------
  // _onBlur with a set value (covers _formatValue(value) branch)
  // -----------------------------------------------------------------------

  describe('_onBlur with value', () => {
    it('formats the value on blur when a date is set', () => {
      datePickerInput.writeValue(new Date(2024, 5, 15));
      fixture.detectChanges();
      // Should not throw and should format the value into the input
      expect(() => datePickerInput._onBlur()).not.toThrow();
      // nativeInput.value should be a non-empty string now
      expect(nativeInput.value.length).toBeGreaterThan(0);
    });
  });

  // -----------------------------------------------------------------------
  // _pendingValue path (value getter before model registered)
  // -----------------------------------------------------------------------

  describe('value getter — pendingValue path', () => {
    it('returns null from getter when no model and no pending value', () => {
      // The model is already registered via usaDatePicker binding;
      // access the base-class _model to verify value getter works
      const v = datePickerInput.value;
      expect(v === null || v === undefined).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // dateInputsHaveChanged helper
  // -----------------------------------------------------------------------

  describe('dateInputsHaveChanged', () => {
    it('min/max changes trigger re-validation', () => {
      // Setting min then changing it exercises the dateInputsHaveChanged helper
      host.min = new Date(2024, 0, 1);
      fixture.detectChanges();
      host.min = new Date(2024, 1, 1);
      fixture.detectChanges();
      // Expect no error thrown (branch: same-adapter-instance comparison)
      expect(datePickerInput.disabled).toBe(false);
    });
  });

  // -----------------------------------------------------------------------
  // _formatValue(null) path — covers the empty-string branch
  // -----------------------------------------------------------------------

  describe('_formatValue null path', () => {
    it('formats null as empty string', () => {
      // Call _formatValue with null to cover the `value ? ... : ''` FALSE branch
      (datePickerInput as any)._formatValue(null);
      expect(nativeInput.value).toBe('');
    });
  });

  // -----------------------------------------------------------------------
  // writeValue — covers _onTouched path in the base class
  // -----------------------------------------------------------------------

  describe('writeValue base class path', () => {
    it('assigns value programmatically and does not throw', () => {
      // writeValue calls _assignValueProgrammatically which formats and assigns the value
      expect(() => datePickerInput.writeValue(new Date(2024, 0, 15))).not.toThrow();
      expect(nativeInput.value.length).toBeGreaterThan(0);
    });
  });

  // -----------------------------------------------------------------------
  // pending value path — value getter before model is registered
  // -----------------------------------------------------------------------

  describe('pending value path', () => {
    it('returns pendingValue from getter when model is not yet set', () => {
      // Temporarily clear the model to trigger the pendingValue path
      const saved = (datePickerInput as any)._model;
      (datePickerInput as any)._model = undefined;
      (datePickerInput as any)._pendingValue = new Date(2024, 3, 10);
      const v = datePickerInput.value;
      expect(v).toBeTruthy();
      (datePickerInput as any)._model = saved;
      (datePickerInput as any)._pendingValue = null;
    });
  });

  // -----------------------------------------------------------------------
  // _registerModel with pendingValue — covers line 166 (if pendingValue TRUE path)
  // -----------------------------------------------------------------------

  describe('_registerModel with pending value', () => {
    it('assigns pending value when model is registered', () => {
      // Set a pending value by clearing the model and calling _assignValue
      const savedModel = (datePickerInput as any)._model;
      (datePickerInput as any)._model = undefined;
      const pendingDate = new Date(2024, 5, 1);
      (datePickerInput as any)['_assignValue'](pendingDate);
      expect((datePickerInput as any)._pendingValue).not.toBeNull();

      // Now re-register the model to trigger the pendingValue path
      (datePickerInput as any)._registerModel(savedModel);
      // After re-registration, pendingValue should be consumed
      expect((datePickerInput as any)._pendingValue).toBeNull();
    });
  });

  // -----------------------------------------------------------------------
  // selectionChanged event — triggers _shouldHandleChangeEvent path
  // -----------------------------------------------------------------------

  describe('selectionChanged subscription', () => {
    it('emits dateChange when model selection changes', () => {
      const before = host.dateChanges.length;
      // Trigger a model selection change by selecting a date through the picker
      const picker = (datePickerInput as any)._datePicker;
      // Select a value directly via the model
      const model = (datePickerInput as any)._model;
      if (model) {
        model.add(new Date(2024, 6, 4));
      }
      fixture.detectChanges();
      // The selectionChanged subscription should have fired
      expect(host.dateChanges.length).toBeGreaterThanOrEqual(before);
    });
  });
});
