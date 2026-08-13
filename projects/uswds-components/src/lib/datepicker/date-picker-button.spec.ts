import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UsaDatePickerModule } from './date-picker.module';
import { UsaDatePickerButton } from './date-picker-button';

@Component({
  standalone: false,
  template: `
    <usa-date-picker-wrapper>
      <input usaDatePicker />
      <usa-date-picker #picker></usa-date-picker>
      <usa-date-picker-button [for]="picker" [disabled]="buttonDisabled"></usa-date-picker-button>
    </usa-date-picker-wrapper>
  `,
})
class DatePickerButtonHostComponent {
  buttonDisabled = false;
}

describe('UsaDatePickerButton', () => {
  let fixture: ComponentFixture<DatePickerButtonHostComponent>;
  let host: DatePickerButtonHostComponent;
  let buttonDE: DebugElement;
  let button: UsaDatePickerButton<Date>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatePickerButtonHostComponent],
      imports: [UsaDatePickerModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerButtonHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    buttonDE = fixture.debugElement.query(By.directive(UsaDatePickerButton));
    button = buttonDE.componentInstance as UsaDatePickerButton<Date>;
  });

  // -----------------------------------------------------------------------
  // Construction
  // -----------------------------------------------------------------------

  describe('construction', () => {
    it('creates the component', () => {
      expect(button).toBeTruthy();
    });

    it('has the usa-date-picker__button class', () => {
      expect((buttonDE.nativeElement as HTMLElement).classList).toContain('usa-date-picker__button');
    });
  });

  // -----------------------------------------------------------------------
  // disabled property
  // -----------------------------------------------------------------------

  describe('disabled', () => {
    it('inherits disabled state from the linked datePicker', () => {
      // By default the picker and input are not disabled
      expect(button.disabled).toBe(false);
    });

    it('can be explicitly disabled via input', () => {
      host.buttonDisabled = true;
      fixture.detectChanges();
      expect(button.disabled).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // _toggle
  // -----------------------------------------------------------------------

  describe('_toggle', () => {
    it('does nothing when datePicker is null', () => {
      const originalPicker = button.datePicker;
      (button as any).datePicker = null;
      expect(() => button._toggle(new MouseEvent('click'))).not.toThrow();
      (button as any).datePicker = originalPicker;
    });

    it('does not open when disabled', () => {
      host.buttonDisabled = true;
      fixture.detectChanges();
      const picker = button.datePicker;
      const opened = picker.opened;
      button._toggle(new MouseEvent('click'));
      fixture.detectChanges();
      expect(picker.opened).toBe(opened);
    });
  });
});
