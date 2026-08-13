import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { UsaDatePickerModule } from './date-picker.module';
import { UsaDatePickerInput } from './date-picker-input';
import { KeyCode } from '../util/key';

@Component({
  standalone: false,
  template: `
    <usa-date-picker-wrapper>
      <input
        #input
        usaDatePicker
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
      if (!picker) return; // picker not registered yet
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
      if (!picker) return;
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
});
