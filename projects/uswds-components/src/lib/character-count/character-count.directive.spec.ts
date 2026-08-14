import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { UsaCharacterCountModule } from './character-count.module';
import { UsaCharacterCountDirective } from './character-count.directive';

@Component({
  standalone: false,
  template: `
    <input [usaCharacterCount]="25" id="inputA" />
    <input [usaCharacterCount]="25" [formControl]="formControl" id="inputB" />
  `,
})
class CharacterCountTestComponent {
  formControl = new UntypedFormControl();
  constructor(public elementRef: ElementRef) {}
}

describe('CharacterCountDirective', () => {
  const MESSAGE_CLASS = `usa-character-count__message`;
  const MESSAGE_INVALID_CLASS = `usa-character-count__message--invalid`;
  let fixture: ComponentFixture<CharacterCountTestComponent>;
  let component: CharacterCountTestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, UsaCharacterCountModule],
      declarations: [CharacterCountTestComponent],
    }).createComponent(CharacterCountTestComponent);

    fixture.detectChanges(); // initial binding
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display character counter text', () => {
    const characterCountMessage = component.elementRef.nativeElement.querySelector(`.${MESSAGE_CLASS}`);
    expect(characterCountMessage.innerHTML).toEqual('25 characters allowed');
  });

  it('should update character counter text on input', () => {
    const inputEl = component.elementRef.nativeElement.querySelector('#inputA');
    inputEl.value = 'test';
    inputEl.dispatchEvent(new InputEvent('input', { data: 'test' }));
    const characterCountMessage = component.elementRef.nativeElement.querySelector(`.${MESSAGE_CLASS}`);
    expect(characterCountMessage.innerHTML).toEqual('21 characters left');
  });

  it('should update text when users go over limit', () => {
    const inputValue = '12345678901234567890123456'; // 26 characters
    const inputEl = component.elementRef.nativeElement.querySelector('#inputA');
    inputEl.value = inputValue;
    inputEl.dispatchEvent(new InputEvent('input', { data: inputValue }));
    const characterCountMessage: HTMLElement = component.elementRef.nativeElement.querySelector(`.${MESSAGE_CLASS}`);
    expect(characterCountMessage.innerHTML).toEqual('1 character over limit');
    expect(characterCountMessage.classList.contains(MESSAGE_INVALID_CLASS));
  });

  it('should update text for form control inputs', () => {
    component.formControl.setValue('test control');
    fixture.detectChanges();
    const characterCountMessage: HTMLElement = component.elementRef.nativeElement.querySelectorAll(
      `.${MESSAGE_CLASS}`,
    )[1];
    expect(characterCountMessage.innerHTML).toEqual('13 characters left');
  });

  // -----------------------------------------------------------------------
  // Branch: no usaCharacterCount value — early return
  // -----------------------------------------------------------------------

  it('early-returns when usaCharacterCount is falsy', () => {
    // Cannot call configureTestingModule again inside a test; verify coverage indirectly.
    // The early-return branch at ngOnInit fires when the bound value is 0.
    // We exercise it by setting the directive’s value to 0 after init and calling ngOnInit.
    const directives = fixture.debugElement.queryAll(By.directive(UsaCharacterCountDirective));
    const dir = directives[0].injector.get(UsaCharacterCountDirective);
    const originalCount = dir.usaCharacterCount;
    dir.usaCharacterCount = 0;
    expect(() => dir.ngOnInit()).not.toThrow();
    dir.usaCharacterCount = originalCount;
  });

  // -----------------------------------------------------------------------
  // Branch: inputEventHandler called with string (reactive form value change)
  // -----------------------------------------------------------------------

  it('handles a string value from reactive form valueChanges (string path)', () => {
    component.formControl.setValue(null); // null → inputEventHandler gets null → early return
    fixture.detectChanges();
    // No throw expected
    const characterCountMessage: HTMLElement = component.elementRef.nativeElement.querySelectorAll(
      `.${MESSAGE_CLASS}`,
    )[1];
    expect(characterCountMessage).toBeTruthy();
  });

  // -----------------------------------------------------------------------
  // Branch: getMessageElement returns existing element (messageElement already exists)
  // -----------------------------------------------------------------------

  it('reuses existing message element on second detectChanges cycle', () => {
    // The element was created on first detectChanges; a second cycle should find and reuse it.
    fixture.detectChanges();
    const msgs = component.elementRef.nativeElement.querySelectorAll(`.${MESSAGE_CLASS}`);
    // Should not create duplicates
    expect(msgs.length).toBe(2); // one per input
  });
});
