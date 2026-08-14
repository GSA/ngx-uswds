import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { UsaDatePickerModule } from './date-picker.module';
import { UsaDatePicker } from './date-picker';
import { UsaDatePickerInput } from './date-picker-input';

/**
 * Lifecycle coverage for {@link UsaDatePickerBase} (open/close/select, overlay
 * management, output emission) and the overlay {@link UsaDatePickerContent}
 * component, driven through the public `usa-date-picker` API rather than the
 * abstract base directly.
 */
@Component({
  standalone: false,
  template: `
    <usa-date-picker-wrapper>
      <input #input [usaDatePicker]="picker" [min]="min" [max]="max" />
      <usa-date-picker
        #picker
        [startView]="startView"
        [restoreFocus]="restoreFocus"
        (opened)="onOpened()"
        (closed)="onClosed()"
        (yearSelected)="onYearSelected($event)"
        (monthSelected)="onMonthSelected($event)"
      ></usa-date-picker>
      <usa-date-picker-button [for]="picker"></usa-date-picker-button>
    </usa-date-picker-wrapper>
  `,
})
class DatePickerHostComponent {
  min: Date | null = null;
  max: Date | null = null;
  startView: 'month' | 'year' | 'multi-year' = 'month';
  restoreFocus = true;

  openedCount = 0;
  closedCount = 0;
  yearsSelected: Date[] = [];
  monthsSelected: Date[] = [];

  onOpened() {
    this.openedCount++;
  }
  onClosed() {
    this.closedCount++;
  }
  onYearSelected(d: Date) {
    this.yearsSelected.push(d);
  }
  onMonthSelected(d: Date) {
    this.monthsSelected.push(d);
  }
}

describe('UsaDatePickerBase', () => {
  let fixture: ComponentFixture<DatePickerHostComponent>;
  let host: DatePickerHostComponent;
  let pickerDE: DebugElement;
  let picker: UsaDatePicker<Date>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatePickerHostComponent],
      imports: [UsaDatePickerModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    pickerDE = fixture.debugElement.query(By.directive(UsaDatePicker));
    picker = pickerDE.componentInstance as UsaDatePicker<Date>;
  });

  it('creates the picker', () => {
    expect(picker).toBeTruthy();
  });

  // ── open / close ────────────────────────────────────────────────────────

  describe('open / close', () => {
    it('open() emits the opened stream and marks the picker opened', () => {
      picker.open();
      fixture.detectChanges();
      expect(picker.opened).toBe(true);
      expect(host.openedCount).toBe(1);
    });

    it('open() is a no-op when already opened', () => {
      picker.open();
      picker.open();
      expect(host.openedCount).toBe(1);
    });

    it('open() is a no-op when disabled', () => {
      picker.disabled = true;
      picker.open();
      expect(picker.opened).toBe(false);
      expect(host.openedCount).toBe(0);
    });

    it('close() emits the closed stream and marks the picker closed', fakeAsync(() => {
      picker.open();
      fixture.detectChanges();
      picker.close();
      // restoreFocus makes completeClose async
      tick();
      flush();
      expect(picker.opened).toBe(false);
      expect(host.closedCount).toBe(1);
    }));

    it('close() is a no-op when not open', () => {
      picker.close();
      expect(host.closedCount).toBe(0);
    });

    it('close() completes synchronously when restoreFocus is false', () => {
      host.restoreFocus = false;
      fixture.detectChanges();
      picker.open();
      fixture.detectChanges();
      picker.close();
      expect(picker.opened).toBe(false);
      expect(host.closedCount).toBe(1);
    });

    it('opened setter opens and closes the picker', fakeAsync(() => {
      picker.opened = true;
      fixture.detectChanges();
      expect(picker.opened).toBe(true);
      picker.opened = false;
      tick();
      flush();
      expect(picker.opened).toBe(false);
    }));
  });

  // ── disabled state ─────────────────────────────────────────────────────────

  describe('disabled', () => {
    it('emits stateChanges when disabled toggles', () => {
      let count = 0;
      picker.stateChanges.subscribe(() => count++);
      picker.disabled = true;
      expect(count).toBe(1);
      // setting the same value does not re-emit
      picker.disabled = true;
      expect(count).toBe(1);
    });
  });

  // ── selection relays ───────────────────────────────────────────────────────

  describe('selection relays', () => {
    it('select() adds a date to the model without throwing', () => {
      expect(() => picker.select(new Date(2024, 0, 15))).not.toThrow();
    });

    it('_selectYear emits yearSelected', () => {
      picker._selectYear(new Date(2025, 0, 1));
      expect(host.yearsSelected.length).toBe(1);
    });

    it('_selectMonth emits monthSelected', () => {
      picker._selectMonth(new Date(2024, 5, 1));
      expect(host.monthsSelected.length).toBe(1);
    });
  });

  // ── startAt / min / max ──────────────────────────────────────────────────────

  describe('startAt / min / max', () => {
    it('startAt falls back to the input start value when unset', () => {
      // no explicit startAt and no value → null
      expect(picker.startAt).toBeNull();
    });

    it('startAt returns the explicitly-set value', () => {
      const d = new Date(2024, 2, 10);
      picker.startAt = d;
      expect(picker.startAt).not.toBeNull();
    });

    it('_getMinDate / _getMaxDate reflect the registered input', () => {
      host.min = new Date(2024, 0, 1);
      host.max = new Date(2024, 11, 31);
      fixture.detectChanges();
      expect(picker._getMinDate()).not.toBeNull();
      expect(picker._getMaxDate()).not.toBeNull();
    });
  });

  // ── registerInput guard ──────────────────────────────────────────────────────

  describe('registerInput', () => {
    it('throws when a second input registers with the same picker', () => {
      const anotherInput = {
        stateChanges: { subscribe: () => ({ unsubscribe() {} }) },
      } as unknown as UsaDatePickerInput<Date>;
      expect(() => picker.registerInput(anotherInput)).toThrow();
    });
  });

  // ── ngOnChanges / ngOnDestroy ────────────────────────────────────────────────

  describe('ngOnChanges / ngOnDestroy', () => {
    it('ngOnChanges emits stateChanges', () => {
      let count = 0;
      picker.stateChanges.subscribe(() => count++);
      picker.ngOnChanges();
      expect(count).toBe(1);
    });

    it('ngOnDestroy tears down without throwing', () => {
      expect(() => picker.ngOnDestroy()).not.toThrow();
    });
  });

  // ── overlay content rendering ────────────────────────────────────────────────

  describe('overlay content', () => {
    it('renders the calendar content element when opened', () => {
      picker.open();
      fixture.detectChanges();
      const content = document.querySelector('.usa-date-picker__calendar');
      expect(content).toBeTruthy();
    });

    it('opens directly into year view when startView is "year"', () => {
      host.startView = 'year';
      fixture.detectChanges();
      picker.open();
      fixture.detectChanges();
      expect(picker.startView).toBe('year');
    });
  });

  // ── overlay content interactions (UsaDatePickerContent) ───────────────────

  describe('overlay content interactions', () => {
    function openAndGetContent() {
      picker.open();
      fixture.detectChanges();
      const content = pickerDE.injector.get(UsaDatePicker) as any;
      // The content component is created inside the overlay; find its instance.
      const ref = (picker as any)._componentRef;
      return ref?.instance;
    }

    it('closes the picker when a click occurs outside the calendar', fakeAsync(() => {
      const content = openAndGetContent();
      expect(content).toBeTruthy();
      // A document click with no preceding inside-click should close.
      content.clickout();
      tick();
      flush();
      expect(picker.opened).toBe(false);
    }));

    it('does not close when the click originated inside the calendar', fakeAsync(() => {
      const content = openAndGetContent();
      content.clickInside();
      content.clickout();
      tick();
      flush();
      expect(picker.opened).toBe(true);
    }));

    it('closes on Escape keydown', fakeAsync(() => {
      const content = openAndGetContent();
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      content.onKeydownHandler(event);
      tick();
      flush();
      expect(picker.opened).toBe(false);
    }));

    it('_getSelected reflects the current model selection', () => {
      const content = openAndGetContent();
      expect(content._getSelected() === null || content._getSelected() === undefined).toBe(true);
    });

    it('_handleUserSelection with a non-null value closes the picker when model is complete', fakeAsync(() => {
      const content = openAndGetContent();
      expect(content).toBeTruthy();
      const date = new Date(2024, 5, 15);
      content._handleUserSelection({ value: date, event: new MouseEvent('click') });
      tick();
      flush();
      // After selecting a date the picker should be closed (single-date model is complete)
      expect(picker.opened).toBe(false);
    }));

    it('_handleUserSelection with null value does not crash', fakeAsync(() => {
      const content = openAndGetContent();
      expect(() => content._handleUserSelection({ value: null, event: new MouseEvent('click') })).not.toThrow();
      tick();
      flush();
    }));

    it('_applyPendingSelection does not throw', () => {
      const content = openAndGetContent();
      expect(() => content._applyPendingSelection()).not.toThrow();
    });
  });

  // ── close() with disabled input origin ───────────────────────────────────────

  describe('close() with disabled input origin', () => {
    it('falls back to focusedElementBeforeOpen when input origin is disabled', fakeAsync(() => {
      picker.open();
      fixture.detectChanges();

      // Disable the connected input element so the focus-restore branch falls through
      const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('input');
      inputEl.disabled = true;

      // Set a fake focusedElementBeforeOpen so the fallback branch is hit
      const fakeEl = document.createElement('button');
      document.body.appendChild(fakeEl);
      (picker as any)._focusedElementBeforeOpen = fakeEl;

      picker.close();
      tick();
      flush();

      expect(picker.opened).toBe(false);
      inputEl.disabled = false;
      document.body.removeChild(fakeEl);
    }));
  });

  // ── panelClass setter ─────────────────────────────────────────────────

  describe('panelClass', () => {
    it('accepts a string panelClass', () => {
      picker.panelClass = 'my-class';
      expect(picker.panelClass).toEqual(['my-class']);
    });

    it('accepts an array panelClass', () => {
      picker.panelClass = ['class-a', 'class-b'];
      expect(picker.panelClass).toEqual(['class-a', 'class-b']);
    });
  });
});
