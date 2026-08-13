import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { USWDSFormFieldModule } from './form-field.module';
import { FormFieldComponent } from './form-field.component';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [USWDSFormFieldModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ── Slice 1: constructs ────────────────────────────────────────────────────

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ── Slice 2: label and description render ──────────────────────────────────

  describe('label and description rendering', () => {
    it('renders label text when set', () => {
      component.label = 'My Field';
      fixture.detectChanges();
      const label: HTMLLabelElement = fixture.nativeElement.querySelector('.usa-label');
      expect(label.textContent).toContain('My Field');
    });

    it('does not render label element when label is empty', () => {
      component.label = '';
      fixture.detectChanges();
      const label = fixture.nativeElement.querySelector('.usa-label');
      expect(label).toBeNull();
    });

    it('renders description text when set', () => {
      component.label = 'Field';
      component.id = 'my-id';
      component.description = 'Helpful hint';
      fixture.detectChanges();
      const desc = fixture.nativeElement.querySelector('.usa-label--description');
      expect(desc.textContent).toContain('Helpful hint');
    });
  });

  // ── Slice 3: requiredFlag / required shows "(Required)" ───────────────────

  describe('required indicator', () => {
    beforeEach(() => {
      component.label = 'My Label';
    });

    it('shows (Required) when requiredFlag is true', () => {
      component.requiredFlag = true;
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain('(Required)');
    });

    it('shows (Required) when required is true', () => {
      component.required = true;
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain('(Required)');
    });

    it('does not show (Required) when both are false', () => {
      component.required = false;
      component.requiredFlag = false;
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).not.toContain('(Required)');
    });
  });

  // ── Slice 4: errorMessage getter/setter and DOM rendering ─────────────────

  describe('errorMessage', () => {
    it('starts empty', () => {
      expect(component.errorMessage).toBe('');
    });

    it('setter stores the message and getter returns it', () => {
      component.errorMessage = 'Something went wrong';
      expect(component.errorMessage).toBe('Something went wrong');
    });

    it('renders the error message in the DOM when non-empty', () => {
      component.errorMessage = 'This field is required';
      fixture.detectChanges();
      const errEl = fixture.nativeElement.querySelector('.usa-error-message');
      expect(errEl.textContent.trim()).toBe('This field is required');
    });

    it('adds usa-form-group--error class when errorMessage is non-empty', () => {
      component.errorMessage = 'Oops';
      fixture.detectChanges();
      const group = fixture.nativeElement.querySelector('.usa-form-group');
      expect(group.classList.contains('usa-form-group--error')).toBe(true);
    });

    it('does not show error element when errorMessage is empty', () => {
      component.errorMessage = '';
      fixture.detectChanges();
      const errEl = fixture.nativeElement.querySelector('.usa-error-message');
      expect(errEl).toBeNull();
    });
  });

  // ── Slice 5: clearError ────────────────────────────────────────────────────

  describe('clearError', () => {
    it('clears the error message', () => {
      component.errorMessage = 'Had an error';
      component.clearError();
      expect(component.errorMessage).toBe('');
    });
  });

  // ── Slice 6: formatErrors — no control ────────────────────────────────────

  describe('formatErrors', () => {
    it('does nothing when control is null', () => {
      component.errorMessage = 'pre-existing';
      component.formatErrors(null);
      expect(component.errorMessage).toBe('pre-existing');
    });

    it('clears error when control is pristine', () => {
      const ctrl = new FormControl('', Validators.required);
      component.errorMessage = 'stale error';
      component.formatErrors(ctrl as any);
      expect(component.errorMessage).toBe('');
    });

    it('clears error when control has no errors', () => {
      const ctrl = new FormControl('valid', Validators.required);
      ctrl.markAsDirty();
      component.formatErrors(ctrl as any);
      expect(component.errorMessage).toBe('');
    });

    it('sets "This field is required" for required error', () => {
      const ctrl = new FormControl('', Validators.required);
      ctrl.markAsDirty();
      component.formatErrors(ctrl as any);
      expect(component.errorMessage).toBe('This field is required');
    });

    it('sets minlength error message', () => {
      const ctrl = new FormControl('ab', Validators.minLength(5));
      ctrl.markAsDirty();
      component.formatErrors(ctrl as any);
      expect(component.errorMessage).toContain('should not be less than 5');
    });

    it('sets maxlength error message', () => {
      const ctrl = new FormControl('toolongvalue', Validators.maxLength(5));
      ctrl.markAsDirty();
      component.formatErrors(ctrl as any);
      expect(component.errorMessage).toContain('max length is 5');
    });

    it('sets isNotBeforeToday error message', () => {
      const ctrl = new FormControl('bad-date');
      ctrl.markAsDirty();
      (ctrl as any).setErrors({ isNotBeforeToday: { message: null } });
      component.formatErrors(ctrl as any);
      expect(component.errorMessage).toBe('Date must not be before today');
    });

    it('sets error from object message when message is an object', () => {
      const ctrl = new FormControl('x');
      ctrl.markAsDirty();
      const msgObj = { key: 'val' };
      (ctrl as any).setErrors({ customError: { message: msgObj } });
      component.formatErrors(ctrl as any);
      expect(component.errorMessage).toBe(msgObj as any);
    });
  });
});
