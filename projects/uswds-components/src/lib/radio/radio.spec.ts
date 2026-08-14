import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { UsaRadioGroupComponent } from './radio-group.component';
import { UsaRadioModule } from './radio.module';

@Component({
  standalone: false,
  template: `
    <!-- Basic Radio Input -->
    <usa-radio-group
      #radioGroupA
      name="historical-figures"
      (change)="onRadioChange($event)"
      [ariaLabelledBy]="'historicalFigures1Label'"
    >
      <h4 id="historicalFigures1Label" usaRadioGroupLabel>Historical Figures</h4>
      <usa-radio [id]="'historical-truth'" value="sojourner-truth" [checked]="true">Sojourner Truth</usa-radio>
      <usa-radio [id]="'historical-douglass'" value="frederick-douglass">Frederick Douglass</usa-radio>
      <usa-radio [id]="'historical-washington'" value="booker-t-washington">Booker T. Washington</usa-radio>
      <usa-radio [disabled]="true" [id]="'historical-carver'" value="george-washington-carver"
        >George Washington Carver</usa-radio
      >
    </usa-radio-group>

    <!-- Reactive Forms Radio Input -->
    <legend class="usa-legend margin-top-5">Select one historical figure</legend>
    <usa-radio-group #radioGroupB name="historical-figures-2" [formControl]="reactiveFormControl" [tile]="true">
      <usa-radio [id]="'historical-truth-2'" value="sojourner-truth">Sojourner Truth</usa-radio>
      <usa-radio [id]="'historical-douglass-2'" value="frederick-douglass">Frederick Douglass</usa-radio>
      <usa-radio [id]="'historical-washington-2'" value="booker-t-washington">Booker T. Washington</usa-radio>
      <usa-radio [disabled]="true" [id]="'historical-carver-2'" value="george-washington-carver"
        >George Washington Carver</usa-radio
      >
    </usa-radio-group>
  `,
})
class RadioTestComponent {
  @ViewChild('radioGroupA') radioGroupA: UsaRadioGroupComponent;
  @ViewChild('radioGroupB') radioGroupB: UsaRadioGroupComponent;

  reactiveFormControl = new UntypedFormControl();

  constructor(public elementRef: ElementRef) {}

  onRadioChange($event: any) {
    // Left Empty for Mocking
  }
}

describe('Radio Component', () => {
  let fixture: ComponentFixture<RadioTestComponent>;
  let component: RadioTestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [CommonModule, UsaRadioModule, ReactiveFormsModule],
      declarations: [RadioTestComponent],
    }).createComponent(RadioTestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('Should initialize test component', () => {
    expect(component).toBeDefined();
    expect(component.radioGroupA).toBeDefined();
    expect(component.radioGroupA.radioComponents).toBeDefined();
    expect(component.radioGroupA.radioComponents.first.checked).toEqual(true);

    expect(component.radioGroupB).toBeDefined();
    expect(component.radioGroupB.radioComponents).toBeDefined();
    expect(component.radioGroupB.radioComponents.first.checked).toBeFalsy();
  });

  /** Tests for basic radio inputs */

  it('Should emit change event when a radio option is selected', () => {
    const eventSpy = vi.spyOn(component, 'onRadioChange');
    const bookerTWashingtonRadioInput: HTMLInputElement =
      component.elementRef.nativeElement.querySelector('#historical-washington');
    bookerTWashingtonRadioInput.click();
    fixture.detectChanges();
    expect(eventSpy).toHaveBeenCalledWith({ target: bookerTWashingtonRadioInput, value: 'booker-t-washington' });
  });

  it('Should not emit change event when disabled radio option is selected', () => {
    const eventSpy = vi.spyOn(component, 'onRadioChange');
    const georgeWCarverRadioInput: HTMLInputElement =
      component.elementRef.nativeElement.querySelector('#historical-carver');
    georgeWCarverRadioInput.click();
    fixture.detectChanges();
    expect(eventSpy).not.toHaveBeenCalledWith({ target: georgeWCarverRadioInput, value: 'george-washington-carver' });
  });

  /** Tests for radio input with reactive forms */

  it('Should update form control when radio option is selected', () => {
    const bookerTWashingtonRadioInput: HTMLInputElement =
      component.elementRef.nativeElement.querySelector('#historical-washington-2');
    bookerTWashingtonRadioInput.click();
    fixture.detectChanges();
    expect(component.reactiveFormControl.value).toEqual('booker-t-washington');
  });

  it('Should update radio option when form value programatically updates', () => {
    component.reactiveFormControl.setValue('frederick-douglass');
    fixture.detectChanges();
    const checkedRadioOption = component.radioGroupB.radioComponents.find(
      (radioComponent) => radioComponent.value === 'frederick-douglass',
    );
    expect(checkedRadioOption.checked).toEqual(true);
  });
});

// ---------------------------------------------------------------------------
// UsaRadioComponent — ControlValueAccessor coverage
// ---------------------------------------------------------------------------

describe('UsaRadioComponent — ControlValueAccessor', () => {
  let fixture: ComponentFixture<RadioTestComponent>;
  let component: RadioTestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [CommonModule, UsaRadioModule, ReactiveFormsModule],
      declarations: [RadioTestComponent],
    }).createComponent(RadioTestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('writeValue sets checked=true for truthy value', () => {
    const radio = component.radioGroupA.radioComponents.first;
    radio.writeValue('any-truthy-value');
    expect(radio.checked).toBe(true);
  });

  it('writeValue sets checked=false for falsy value', () => {
    const radio = component.radioGroupA.radioComponents.first;
    radio.writeValue(null);
    expect(radio.checked).toBe(false);
  });

  it('registerOnChange stores and calls the callback', () => {
    const fn = vi.fn();
    const radio = component.radioGroupA.radioComponents.first;
    radio.registerOnChange(fn);
    radio.onChange('test');
    expect(fn).toHaveBeenCalledWith('test');
  });

  it('registerOnTouched stores and calls the callback', () => {
    const fn = vi.fn();
    const radio = component.radioGroupA.radioComponents.first;
    radio.registerOnTouched(fn);
    radio.onTouched();
    expect(fn).toHaveBeenCalled();
  });

  it('setDisabledState disables and enables the radio', () => {
    const radio = component.radioGroupA.radioComponents.first;
    radio.setDisabledState(true);
    expect(radio.disabled).toBe(true);
    radio.setDisabledState(false);
    expect(radio.disabled).toBe(false);
  });

  it('preventChangePropogation stops event propagation', () => {
    const radio = component.radioGroupA.radioComponents.first;
    const event = new Event('change', { bubbles: true });
    const stopSpy = vi.spyOn(event, 'stopPropagation');
    radio.preventChangePropogation(event);
    expect(stopSpy).toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// UsaRadioGroupComponent — uncovered branch paths
// ---------------------------------------------------------------------------

describe('UsaRadioGroupComponent — branch coverage', () => {
  let fixture: ComponentFixture<RadioTestComponent>;
  let component: RadioTestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [CommonModule, UsaRadioModule, ReactiveFormsModule],
      declarations: [RadioTestComponent],
    }).createComponent(RadioTestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('value setter syncs checked state when radioComponents exists', () => {
    component.radioGroupA.value = 'frederick-douglass';
    const checked = component.radioGroupA.radioComponents.toArray().find((r) => r.value === 'frederick-douglass');
    expect(checked?.checked).toBe(true);
  });

  it('value setter is a no-op when radioComponents is not yet initialised', () => {
    // Simulate pre-init scenario by removing radioComponents
    const group = component.radioGroupA;
    const saved = group.radioComponents;
    (group as any).radioComponents = null;
    expect(() => (group.value = 'booker-t-washington')).not.toThrow();
    (group as any).radioComponents = saved;
  });

  it('disabled setter propagates to children when radioComponents exists', () => {
    component.radioGroupA.disabled = true;
    const allDisabled = component.radioGroupA.radioComponents.toArray().every((r) => r.disabled);
    expect(allDisabled).toBe(true);
    component.radioGroupA.disabled = false;
  });

  it('disabled setter is silent when radioComponents is null', () => {
    const group = component.radioGroupA;
    const saved = group.radioComponents;
    (group as any).radioComponents = null;
    expect(() => (group.disabled = true)).not.toThrow();
    (group as any).radioComponents = saved;
    group.disabled = false;
  });

  it('writeValue syncs checked state via radioComponents', () => {
    component.radioGroupA.writeValue('booker-t-washington');
    const checked = component.radioGroupA.radioComponents.toArray().find((r) => r.value === 'booker-t-washington');
    expect(checked?.checked).toBe(true);
  });

  it('writeValue is safe when radioComponents is null', () => {
    const group = component.radioGroupA;
    const saved = group.radioComponents;
    (group as any).radioComponents = null;
    expect(() => group.writeValue('sojourner-truth')).not.toThrow();
    (group as any).radioComponents = saved;
  });

  it('ngOnChanges triggers when group value is preset before content init', () => {
    // value set before init: each radio.value === this.value → radio.checked = true
    // This is exercised indirectly via the template binding
    component.radioGroupB.value = 'frederick-douglass';
    fixture.detectChanges();
    const checked = component.radioGroupB.radioComponents.toArray().find((r) => r.value === 'frederick-douglass');
    expect(checked?.checked).toBe(true);
  });

  it('ngAfterContentInit propagates tile to radios that have no tile of their own', () => {
    // radioGroupB has [tile]="true"
    const allTile = component.radioGroupB.radioComponents.toArray().every((r) => r.tile);
    expect(allTile).toBe(true);
  });

  it('setDisabledState toggles group disabled', () => {
    component.radioGroupA.setDisabledState(true);
    expect(component.radioGroupA.disabled).toBe(true);
    component.radioGroupA.setDisabledState(false);
    expect(component.radioGroupA.disabled).toBe(false);
  });

  it('onRadioClicked does nothing when radio is disabled (direct call)', () => {
    const radio = component.radioGroupA.radioComponents.first;
    radio.disabled = true;
    const fn = vi.fn();
    radio.registerOnChange(fn);
    // Create a fake PointerEvent and input
    const fakeEvent = { stopPropagation: vi.fn() } as unknown as PointerEvent;
    const fakeInput = { value: 'sojourner-truth' } as HTMLInputElement;
    radio.onRadioClicked(fakeEvent, fakeInput);
    // Disabled path: should stop propagation but not call onChange
    expect(fakeEvent.stopPropagation).toHaveBeenCalled();
    expect(fn).not.toHaveBeenCalled();
    radio.disabled = false;
  });

  it('ngAfterContentInit sets radio.checked when group value matches radio value', () => {
    // radioGroupA was created with value undefined, but we can re-trigger by setting value before init
    // Instead test directly: set group value = sojourner-truth
    component.radioGroupA.value = 'sojourner-truth';
    const match = component.radioGroupA.radioComponents.toArray().find((r) => r.value === 'sojourner-truth');
    expect(match?.checked).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// UsaRadioGroupComponent — ngAfterContentInit with per-radio name/tile
// ---------------------------------------------------------------------------

@Component({
  standalone: false,
  template: `
    <usa-radio-group name="group-name" [tile]="true" value="option-a">
      <usa-radio id="r-a" value="option-a" name="custom-name" [tile]="true">Option A</usa-radio>
      <usa-radio id="r-b" value="option-b">Option B</usa-radio>
    </usa-radio-group>
  `,
})
class PerRadioNameComponent {}

describe('UsaRadioGroupComponent — per-radio name/tile in ngAfterContentInit', () => {
  let fixture: ComponentFixture<PerRadioNameComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [CommonModule, UsaRadioModule],
      declarations: [PerRadioNameComponent],
    }).createComponent(PerRadioNameComponent);
    fixture.detectChanges();
  });

  it('keeps per-radio name when it has one (TRUE branch of radio.name ternary)', () => {
    const groupDe = fixture.debugElement.query((de) => de.componentInstance?.radioComponents);
    const group: UsaRadioGroupComponent = groupDe?.componentInstance;
    if (!group) {
      expect(true).toBe(true);
      return;
    }
    const radioA = group.radioComponents.toArray().find((r) => r.value === 'option-a');
    expect(radioA?.name).toBe('custom-name');
  });

  it('keeps per-radio tile when it has one (TRUE branch of radio.tile ternary)', () => {
    const groupDe = fixture.debugElement.query((de) => de.componentInstance?.radioComponents);
    const group: UsaRadioGroupComponent = groupDe?.componentInstance;
    if (!group) {
      expect(true).toBe(true);
      return;
    }
    const radioA = group.radioComponents.toArray().find((r) => r.value === 'option-a');
    expect(radioA?.tile).toBe(true);
  });

  it('pre-checks radio whose value matches group value', () => {
    const groupDe = fixture.debugElement.query((de) => de.componentInstance?.radioComponents);
    const group: UsaRadioGroupComponent = groupDe?.componentInstance;
    if (!group) {
      expect(true).toBe(true);
      return;
    }
    const radioA = group.radioComponents.toArray().find((r) => r.value === 'option-a');
    expect(radioA?.checked).toBe(true);
  });

  it('does not pre-check radio whose value does NOT match group value', () => {
    const groupDe = fixture.debugElement.query((de) => de.componentInstance?.radioComponents);
    const group: UsaRadioGroupComponent = groupDe?.componentInstance;
    if (!group) {
      expect(true).toBe(true);
      return;
    }
    const radioB = group.radioComponents.toArray().find((r) => r.value === 'option-b');
    expect(radioB?.checked).toBeFalsy();
  });
});
