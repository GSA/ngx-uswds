import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

declare var ResizeObserver;

let nextId = 0;
@Directive({
  selector: '[usaCharacterCount]',
})
export class UsaCharacterCountDirective implements OnInit, OnDestroy {

  /** Directive's main input - max length of characters allowed */
  @Input() usaCharacterCount: number;

  /** 
   * Id to use for character count message text. Will be auto-generated if not passed in
   */
  @Input() messageId = `usa-character-count-${nextId++}`;

  private readonly MESSAGE_CLASS = `usa-character-count__message`;
  private readonly MESSAGE_INVALID_CLASS = `usa-character-count__message--invalid`;

  /** 
   * Subscription to form control's value changes if one exists
   * Allows us to unsubscribe during cleanup
   */
  valueSubscription = new Subscription();

  /** Reference to character count text being displayed to users */
  characterCounterText = '';

  /**
   * Watch for resize event changes to the host element. We want to keep the character
   * counter's width attribute in line with host's width for resizable input
   */
  private _inputResizeObserver;

  /**
   * Reference to character counter message element. This will be created during init if
   * one with provided messageId does not already exist as sibling.
   */
  private _messageElement: HTMLSpanElement;

  constructor(
    private element: ElementRef,
    private renderer2: Renderer2,
    private zone: NgZone,
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

    // Get reference to character counter's message element
    this._messageElement = this.getMessageElement();
    this.setCharacterCountText(0, this.usaCharacterCount);


    /** Watch for input field's resize event so we can keep character counter text aligned with input */
    this._inputResizeObserver = new ResizeObserver((change) => {
      // Run renderer inside angular's zone so that we can ensure change detection will pick it up
      this.zone.run(() => {
        this._messageElement.style.width = `${change[0].borderBoxSize[0].inlineSize}px`;
      })
    });

    this._inputResizeObserver.observe(this.element.nativeElement);
  }

  ngOnDestroy() {
    /** Clean Up */
    this.valueSubscription.unsubscribe();
    this.element.nativeElement.removeEventListener('input', this.inputEventHandler);
    this._inputResizeObserver.unobserve(this.element.nativeElement);
  }

  /** Gets reference to span element that will be used to display character counter text. If one does not exists, it will be created
   * and attached as sibling to host form element
   */
  private getMessageElement() {
    let messageElement: HTMLSpanElement = this.element.nativeElement.parentElement.querySelector(`.${this.MESSAGE_CLASS}#${this.messageId}`);
    if (messageElement) {
      return messageElement;
    }

    messageElement = this.renderer2.createElement('span');
    messageElement.classList.add('usa-hint', this.MESSAGE_CLASS);
    messageElement.setAttribute('aria-live', 'polite');
    messageElement.setAttribute('id', this.messageId);
    messageElement.style.width = `${this.element.nativeElement.offsetWidth}px`;
    (this.element.nativeElement.parentElement as HTMLElement).insertBefore(messageElement, this.element.nativeElement.nextSibling);
    this._messageElement = messageElement;
    
    return messageElement;
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

    // Get message to display for amount of characters left
    this.characterCounterText = this.generateCharacterCounterText(currentLength, maxLength);

    // Add error css if over limit
    const isOverLimit = currentLength && currentLength > maxLength;
    this._messageElement.classList.toggle(this.MESSAGE_INVALID_CLASS, isOverLimit);

    this._messageElement.innerHTML = this.characterCounterText;
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
