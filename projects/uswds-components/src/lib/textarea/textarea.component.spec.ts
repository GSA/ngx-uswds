import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { UsaTextareaModule } from './textarea.module';
import { UsaTextareaComponent } from './textarea.component';
import { Key } from '../util/key';

// ── Host for reactive-forms integration tests ──────────────────────────────
@Component({
  standalone: false,
  template: `<usa-textarea [formControl]="ctrl"></usa-textarea>`,
})
class TextareaHostComponent {
  ctrl = new FormControl('');
}

@Component({
  standalone: false,
  template: `<usa-textarea [formControl]="ctrl"></usa-textarea>`,
})
class TextareaRequiredHostComponent {
  ctrl = new FormControl('', Validators.required);
}

describe('UsaTextareaComponent', () => {
  let component: UsaTextareaComponent;
  let fixture: ComponentFixture<UsaTextareaComponent>;

  const getTextarea = (): HTMLTextAreaElement => fixture.nativeElement.querySelector('textarea');

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaTextareaModule, ReactiveFormsModule],
      declarations: [TextareaHostComponent, TextareaRequiredHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ── Slice 1: constructs ────────────────────────────────────────────────────

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ── Slice 2: writeValue sets model and renders ─────────────────────────────

  describe('writeValue', () => {
    it('sets model to the provided value', () => {
      component.writeValue('hello');
      expect(component.model).toBe('hello');
    });

    it('sets model to null when called with null', () => {
      component.writeValue(null);
      expect(component.model).toBeNull();
    });
  });

  // ── Slice 3: onInputChange emits valueChange and notifies onChange ─────────

  describe('onInputChange', () => {
    it('updates model', () => {
      component.onInputChange('typed');
      expect(component.model).toBe('typed');
    });

    it('emits valueChange', () => {
      const emitted: string[] = [];
      component.valueChange.subscribe((v) => emitted.push(v));
      component.onInputChange('abc');
      expect(emitted).toEqual(['abc']);
    });

    it('calls registered onChange callback', () => {
      const spy = vi.fn();
      component.registerOnChange(spy);
      component.onInputChange('xyz');
      expect(spy).toHaveBeenCalledWith('xyz');
    });

    it('calls registered onTouched callback', () => {
      const spy = vi.fn();
      component.registerOnTouched(spy);
      component.onInputChange('xyz');
      expect(spy).toHaveBeenCalled();
    });
  });

  // ── Slice 4: focusChange emits onBlur ─────────────────────────────────────

  describe('focusChange', () => {
    it('emits onBlur with the current value', () => {
      const emitted: string[] = [];
      component.onBlur.subscribe((v) => emitted.push(v));
      component.focusChange({ target: { value: 'focused' } });
      expect(emitted).toEqual(['focused']);
    });

    it('calls registered onTouched callback', () => {
      const spy = vi.fn();
      component.registerOnTouched(spy);
      component.focusChange({ target: { value: 'x' } });
      expect(spy).toHaveBeenCalled();
    });
  });

  // ── Slice 5: onValueChange ─────────────────────────────────────────────────

  describe('onValueChange', () => {
    it('updates model from event', () => {
      component.onValueChange({ target: { value: 'updated' } });
      expect(component.model).toBe('updated');
    });
  });

  // ── Slice 6: onKeydown ─────────────────────────────────────────────────────

  describe('onKeydown', () => {
    it('updates model and prevents default on Enter', () => {
      const event = { code: Key.Enter, target: { value: 'enter-value' }, preventDefault: vi.fn() };
      component.onKeydown(event);
      expect(component.model).toBe('enter-value');
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('does not call preventDefault on non-Enter keys', () => {
      const event = { code: Key.Space, target: { value: 'nope' }, preventDefault: vi.fn() };
      component.onKeydown(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  // ── Slice 7: setDisabledState ──────────────────────────────────────────────

  describe('setDisabledState', () => {
    it('sets disabled to true', () => {
      component.setDisabledState(true);
      expect(component.disabled).toBe(true);
    });

    it('sets disabled to false', () => {
      component.setDisabledState(false);
      expect(component.disabled).toBe(false);
    });
  });

  // ── Slice 8: invalid / showError getters without NgControl ────────────────

  describe('invalid / showError (no NgControl)', () => {
    it('invalid returns false when there is no control', () => {
      expect(component.invalid).toBe(false);
    });

    it('showError returns false when there is no control', () => {
      expect(component.showError).toBe(false);
    });
  });

  // ── Slice 9: CVA wiring via ReactiveFormsModule ────────────────────────────

  describe('ReactiveFormsModule integration', () => {
    let hostFixture: ComponentFixture<TextareaHostComponent>;
    let host: TextareaHostComponent;

    beforeEach(() => {
      hostFixture = TestBed.createComponent(TextareaHostComponent);
      host = hostFixture.componentInstance;
      hostFixture.detectChanges();
    });

    it('renders the initial FormControl value in the textarea', async () => {
      host.ctrl.setValue('initial');
      hostFixture.detectChanges();
      await hostFixture.whenStable();
      hostFixture.detectChanges();
      const ta: HTMLTextAreaElement = hostFixture.nativeElement.querySelector('textarea');
      expect(ta.value).toBe('initial');
    });

    it('propagates user input to the FormControl via CVA', async () => {
      const ta: HTMLTextAreaElement = hostFixture.nativeElement.querySelector('textarea');
      ta.value = 'user typed';
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      hostFixture.detectChanges();
      await hostFixture.whenStable();
      expect(host.ctrl.value).toBe('user typed');
    });

    it('disables the textarea when FormControl is disabled', async () => {
      host.ctrl.disable();
      hostFixture.detectChanges();
      await hostFixture.whenStable();
      hostFixture.detectChanges();
      const ta: HTMLTextAreaElement = hostFixture.nativeElement.querySelector('textarea');
      expect(ta.disabled).toBe(true);
    });
  });

  // ── Slice 10: invalid / showError with NgControl ──────────────────────────

  describe('invalid / showError (with NgControl via required validator)', () => {
    let hostFixture: ComponentFixture<TextareaRequiredHostComponent>;
    let host: TextareaRequiredHostComponent;
    let textareaComp: UsaTextareaComponent;

    beforeEach(() => {
      hostFixture = TestBed.createComponent(TextareaRequiredHostComponent);
      host = hostFixture.componentInstance;
      hostFixture.detectChanges();
      textareaComp = hostFixture.debugElement.query(By.directive(UsaTextareaComponent))
        .componentInstance as UsaTextareaComponent;
    });

    it('invalid is true when control is invalid', () => {
      host.ctrl.setValue('');
      host.ctrl.markAsDirty();
      hostFixture.detectChanges();
      expect(textareaComp.invalid).toBe(true);
    });

    it('showError is true when dirty and invalid', () => {
      host.ctrl.setValue('');
      host.ctrl.markAsDirty();
      hostFixture.detectChanges();
      expect(textareaComp.showError).toBe(true);
    });

    it('showError is false when valid', () => {
      host.ctrl.setValue('some text');
      host.ctrl.markAsDirty();
      hostFixture.detectChanges();
      expect(textareaComp.showError).toBe(false);
    });

    it('applies usa-input--error class when showError is true', () => {
      host.ctrl.setValue('');
      host.ctrl.markAsDirty();
      hostFixture.detectChanges();
      const ta: HTMLTextAreaElement = hostFixture.nativeElement.querySelector('textarea');
      expect(ta.classList.contains('usa-input--error')).toBe(true);
    });
  });

  // ── Slice 11: @Input attribute rendering ──────────────────────────────────

  describe('@Input rendering', () => {
    it('renders the placeholder attribute', () => {
      component.placeholder = 'Enter text here';
      fixture.detectChanges();
      expect(getTextarea().getAttribute('placeholder')).toBe('Enter text here');
    });

    it('renders the id attribute', () => {
      component.id = 'my-textarea';
      fixture.detectChanges();
      expect(getTextarea().getAttribute('id')).toBe('my-textarea');
    });

    it('renders the maxlength attribute', () => {
      component.maxlength = 100;
      fixture.detectChanges();
      expect(getTextarea().getAttribute('maxlength')).toBe('100');
    });

    it('renders the rows attribute from rowHeight', () => {
      component.rowHeight = 5;
      fixture.detectChanges();
      expect(getTextarea().rows).toBe(5);
    });
  });
});
