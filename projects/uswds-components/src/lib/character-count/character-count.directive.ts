import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

let nextId = 0;
@Directive({
  selector: '[usaCharacterCount]'
})
export class UsaCharacterCountDirective implements OnInit, OnDestroy {

  @Input() usaCharacterCount: number;

  @Input() messageId = `usa-character-count-${nextId++}`;

  private readonly MESSAGE_CLASS = `usa-character-count__message`;
  private readonly MESSAGE_INVALID_CLASS = `usa-character-count__message--invalid`;


  valueSubscription = new Subscription();

  characterCounterText = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private element: ElementRef,
    @Optional() private control: NgControl
  ) { }

  ngOnInit() {
    if (!this.usaCharacterCount) {
      return;
    }

    if (this.control) {
      this.valueSubscription = this.control.valueChanges.subscribe(($event) => this.inputEventHandler($event));
    } else {
      this.element.nativeElement.addEventListener('input', this.inputEventHandler.bind(this));
    }

    this.setCharacterCountText(0, this.usaCharacterCount);
  }

  ngOnDestroy() {
    /** Clean Up */
    this.valueSubscription.unsubscribe();
    this.element.nativeElement.removeEventListener('input', this.inputEventHandler);
  }

  private inputEventHandler($event: InputEvent | string) {
    let value;
    if ($event instanceof InputEvent) {
      value = ($event.target as any).value;
    } else {
      value = $event;
    }

    if (value === undefined || value === null) {
      return;
    }

    this.setCharacterCountText(value.length, this.usaCharacterCount);
  }

  /**
   * Sets character counter message based on current number of characters.
   * The message is appended as sibling element to the element this character count directive
   * is attached through reference of shared parent element.
   * @param currentLength 
   */
  private setCharacterCountText(currentLength: number, maxLength: number) {
    // Get reference to character counter's message element
    let message: HTMLElement = this.element.nativeElement.parentElement.querySelector(`.${this.MESSAGE_CLASS}#${this.messageId}`);

    if (!message) {
      message = this.document.createElement(`span`);
      message.classList.add('usa-hint', this.MESSAGE_CLASS);
      message.setAttribute('aria-live', 'polite');
      message.setAttribute('id', this.messageId);
      (this.element.nativeElement.parentElement as HTMLElement).insertBefore(message, this.element.nativeElement.nextSibling);
    }

    // Get message to display for amount of characters left
    this.characterCounterText = this.generateCharacterCounterText(currentLength, maxLength);

    // Add error css if over limit
    const isOverLimit = currentLength && currentLength > maxLength;
    message.classList.toggle(this.MESSAGE_INVALID_CLASS, isOverLimit);

    message.innerHTML = this.characterCounterText;
  }

  /**
   * Follows logic from USWDS' character counter's JS file so that messaging is consistent
   * @param currentLength
   * @param maxLength 
   * @returns - string message to display based on current characters and max characters allowed
   */
  private generateCharacterCounterText(currentLength: number, maxLength: number) {
    const isOverLimit = currentLength && currentLength > maxLength;

    if (currentLength === 0) {
      return `${maxLength} characters allowed`;
    } else {
      const difference = Math.abs(maxLength - currentLength);
      const characters = `character${difference === 1 ? "" : "s"}`;
      const guidance = isOverLimit ? "over limit" : "left";
  
      return `${difference} ${characters} ${guidance}`;
    }
  }
}
