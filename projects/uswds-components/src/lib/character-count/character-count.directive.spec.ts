import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsaCharacterCountDirective } from './character-count.directive';

@Component({
  template: `
    <input [usaCharacterCount]="25" id="inputA">
    <input [usaCharacterCount]="25" [formControl]="formControl" id="inputB">
  `
})
class CharacterCountTestComponent {
  formControl = new FormControl();
  constructor(public elementRef: ElementRef) {}
}

describe('CharacterCountDirective', () => {
  const MESSAGE_CLASS = `usa-character-count__message`;
  const MESSAGE_INVALID_CLASS = `usa-character-count__message--invalid`;
  let fixture: ComponentFixture<CharacterCountTestComponent>;
  let component: CharacterCountTestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ UsaCharacterCountDirective, CharacterCountTestComponent ]
    })
    .createComponent(CharacterCountTestComponent);
  
    fixture.detectChanges(); // initial binding
    component = fixture.componentInstance;
  });


  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display character counter text', () => {
    const characterCountMessage = component.elementRef.nativeElement.querySelector(`.${MESSAGE_CLASS}`);
    expect(characterCountMessage.innerHTML).toEqual('25 characters allowed')
  });

  it('should update character counter text on input', () => {
    const inputEl = component.elementRef.nativeElement.querySelector('#inputA');
    inputEl.value = 'test';
    inputEl.dispatchEvent(new InputEvent('input', {data: 'test'}));
    const characterCountMessage = component.elementRef.nativeElement.querySelector(`.${MESSAGE_CLASS}`);
    expect(characterCountMessage.innerHTML).toEqual('21 characters left');
  });

  it('should update text when users go over limit', () => {
    const inputValue = '12345678901234567890123456'; // 26 characters
    const inputEl = component.elementRef.nativeElement.querySelector('#inputA');
    inputEl.value = inputValue;
    inputEl.dispatchEvent(new InputEvent('input', {data: inputValue}));
    const characterCountMessage: HTMLElement = component.elementRef.nativeElement.querySelector(`.${MESSAGE_CLASS}`);
    expect(characterCountMessage.innerHTML).toEqual('1 character over limit');
    expect(characterCountMessage.classList.contains(MESSAGE_INVALID_CLASS));
  });

  it('should update text for form control inputs', () => {
    component.formControl.setValue('test control');
    fixture.detectChanges();
    const characterCountMessage: HTMLElement = component.elementRef.nativeElement.querySelectorAll(`.${MESSAGE_CLASS}`)[1];
    expect(characterCountMessage.innerHTML).toEqual('13 characters left');
  });
});
