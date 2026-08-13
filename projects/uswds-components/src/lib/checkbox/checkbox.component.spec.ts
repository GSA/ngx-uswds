import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsaCheckboxComponent } from './checkbox.component';
import { UsaCheckboxModule } from './checkbox.module';

describe('CheckboxComponent', () => {
  let component: UsaCheckboxComponent;
  let fixture: ComponentFixture<UsaCheckboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaCheckboxModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ── @Input bindings render correctly ────────────────────────────────────────

  it('applies usa-checkbox__input--tile class when tile is true', () => {
    component.tile = true;
    component.cdr.markForCheck();
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.classList).toContain('usa-checkbox__input--tile');
  });

  it('does not apply tile class when tile is false', () => {
    component.tile = false;
    component.cdr.markForCheck();
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.classList).not.toContain('usa-checkbox__input--tile');
  });

  it('sets disabled attribute on the input when disabled is true', () => {
    component.disabled = true;
    component.cdr.markForCheck();
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.disabled).toBe(true);
  });

  it('sets required attribute on the input when required is true', () => {
    component.required = true;
    component.cdr.markForCheck();
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.required).toBe(true);
  });

  it('binds the name attribute to the input', () => {
    component.name = 'my-checkbox';
    component.cdr.markForCheck();
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('name')).toBe('my-checkbox');
  });

  it('sets aria-label on the input when provided', () => {
    component.ariaLabel = 'Accept terms';
    component.cdr.markForCheck();
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-label')).toBe('Accept terms');
  });

  it('does not set aria-label when ariaLabel is empty string', () => {
    component.ariaLabel = '';
    component.cdr.markForCheck();
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-label')).toBeNull();
  });

  it('sets aria-labelledby on the input when provided', () => {
    component.ariaLabelledby = 'label-id';
    component.cdr.markForCheck();
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-labelledby')).toBe('label-id');
  });

  it('sets aria-describedby on the input when provided', () => {
    component.ariaDescribedby = 'desc-id';
    component.cdr.markForCheck();
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('aria-describedby')).toBe('desc-id');
  });

  it('binds the id input to the native input element', () => {
    component.id = 'my-cb';
    component.cdr.markForCheck();
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.id).toBe('my-cb');
  });

  it('generates a unique default id', () => {
    const fixture2 = TestBed.createComponent(UsaCheckboxComponent);
    const c2 = fixture2.componentInstance;
    fixture2.detectChanges();
    expect(component.id).not.toBe(c2.id);
    expect(component.id).toMatch(/^usa-checkbox-\d+$/);
  });

  // ── _getAriaChecked ──────────────────────────────────────────────────────────

  describe('_getAriaChecked()', () => {
    it('returns "true" when checked is true', () => {
      component.checked = true;
      expect(component._getAriaChecked()).toBe('true');
    });

    it('returns "false" when unchecked and not indeterminate', () => {
      component.checked = false;
      component['_indeterminate'] = false;
      expect(component._getAriaChecked()).toBe('false');
    });

    it('returns "mixed" when unchecked and indeterminate is set via private field', () => {
      component.checked = false;
      // Set the private backing field directly so we can test the branch
      // without triggering the setter's nativeInput guard.
      component['_indeterminate'] = true;
      expect(component._getAriaChecked()).toBe('mixed');
    });
  });

  // ── indeterminate setter ─────────────────────────────────────────────────────

  describe('indeterminate setter', () => {
    it('is a no-op before the view is initialised (no nativeInput)', () => {
      // Create a fresh component but do NOT call detectChanges so ViewChild is unset.
      const earlyFixture = TestBed.createComponent(UsaCheckboxComponent);
      const earlyComp = earlyFixture.componentInstance;
      // nativeInput is undefined at this point
      expect(() => {
        earlyComp.indeterminate = true;
      }).not.toThrow();
      expect(earlyComp['_indeterminate']).toBeUndefined();
    });

    it('sets nativeElement.indeterminate after view init', () => {
      // After fixture.detectChanges() nativeInput is available.
      component.indeterminate = true;
      expect(component['_indeterminate']).toBe(true);
      expect(component.nativeInput.nativeElement.indeterminate).toBe(true);
    });

    it('clears nativeElement.indeterminate when set to false', () => {
      component.indeterminate = true;
      component.indeterminate = false;
      expect(component['_indeterminate']).toBe(false);
      expect(component.nativeInput.nativeElement.indeterminate).toBe(false);
    });
  });

  // ── onCheckboxClick ──────────────────────────────────────────────────────────

  describe('onCheckboxClick()', () => {
    // jsdom does not define PointerEvent; use MouseEvent which has the same interface
    // for stopPropagation purposes and satisfies the type parameter.
    function makeClickEvent(): MouseEvent {
      return new MouseEvent('click');
    }

    it('toggles checked from false to true', () => {
      component.checked = false;
      component.onCheckboxClick(makeClickEvent() as unknown as PointerEvent);
      expect(component.checked).toBe(true);
    });

    it('toggles checked from true to false', () => {
      component.checked = true;
      component.onCheckboxClick(makeClickEvent() as unknown as PointerEvent);
      expect(component.checked).toBe(false);
    });

    it('calls the registered onChange callback with the new value', () => {
      const onChangeSpy = vi.fn();
      component.registerOnChange(onChangeSpy);
      component.checked = false;
      component.onCheckboxClick(makeClickEvent() as unknown as PointerEvent);
      expect(onChangeSpy).toHaveBeenCalledWith(true);
    });

    it('emits the new checked value via the change Output', () => {
      const emitted: boolean[] = [];
      component.change.subscribe((v: boolean) => emitted.push(v));
      component.checked = false;
      component.onCheckboxClick(makeClickEvent() as unknown as PointerEvent);
      expect(emitted).toEqual([true]);
    });

    it('calls stopPropagation on the click event', () => {
      const event = makeClickEvent() as unknown as PointerEvent;
      const spy = vi.spyOn(event, 'stopPropagation');
      component.onCheckboxClick(event);
      expect(spy).toHaveBeenCalled();
    });
  });

  // ── preventChangePropogation ─────────────────────────────────────────────────

  describe('preventChangePropogation()', () => {
    it('calls stopPropagation on the event', () => {
      const event = new Event('change');
      const spy = vi.spyOn(event, 'stopPropagation');
      component.preventChangePropogation(event);
      expect(spy).toHaveBeenCalled();
    });
  });

  // ── ControlValueAccessor ─────────────────────────────────────────────────────

  describe('ControlValueAccessor', () => {
    it('writeValue sets checked to true for a truthy value', () => {
      component.writeValue(true);
      expect(component.checked).toBe(true);
    });

    it('writeValue sets checked to false for a falsy value', () => {
      component.writeValue(null);
      expect(component.checked).toBe(false);
    });

    it('writeValue coerces a string to boolean', () => {
      component.writeValue('yes');
      expect(component.checked).toBe(true);
    });

    it('registerOnChange stores the callback', () => {
      const fn = vi.fn();
      component.registerOnChange(fn);
      expect(component.onChange).toBe(fn);
    });

    it('registerOnTouched stores the callback', () => {
      const fn = vi.fn();
      component.registerOnTouched(fn);
      expect(component.onTouched).toBe(fn);
    });

    it('setDisabledState sets the disabled property', () => {
      component.setDisabledState!(true);
      expect(component.disabled).toBe(true);
      component.setDisabledState!(false);
      expect(component.disabled).toBe(false);
    });
  });
});
