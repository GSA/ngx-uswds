import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[usaTooltip]',
  host: {
    class: 'usa-tooltip__trigger',
    '(mouseenter)': 'show()',
    '(focus)': 'show()',
    '(mouseleave)': 'hide()',
    '(blur)': 'hide()',
  },
})
export class UsaTooltipDirective implements AfterViewInit {
  // Span which contains the tooltip text
  tooltipBody: HTMLElement;
  // Element which causes tooltip to be shown, tooltip apppears relative to this
  tooltipTrigger: HTMLElement;
  // Element which wraps tooltip and trigger
  tooltipWrapper: HTMLElement;

  readonly TRIANGLE_SIZE = 5;

  @Input()
  position: string = 'top';

  /**
   * Value to be displayed in tooltip
   */
  @Input()
  title: string;

  /**
   * Additional classes to be applied to wrapper
   */
  @Input()
  classes: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const tooltipID = `tooltip-${Math.floor(Math.random() * 900000) + 100000}`;

    this.tooltipTrigger = this.el.nativeElement;
    this.tooltipWrapper = document.createElement('span');
    this.tooltipBody = document.createElement('span');

    this.tooltipTrigger.setAttribute('aria-describedby', tooltipID);
    this.tooltipTrigger.setAttribute('tabindex', '0');
    this.tooltipTrigger.classList.remove('usa-tooltip');

    const parent = this.renderer.parentNode(this.el.nativeElement);
    parent.replaceChild(this.tooltipWrapper, this.el.nativeElement);
    this.renderer.appendChild(this.tooltipWrapper, this.tooltipTrigger);
    this.renderer.appendChild(this.tooltipWrapper, this.tooltipBody);
    this.renderer.addClass(this.tooltipWrapper, 'usa-tooltip');

    if (this.classes) {
      this.classes
        .split(' ')
        .forEach((className) => this.tooltipWrapper.classList.add(className));
    }

    this.renderer.addClass(this.tooltipBody, 'usa-tooltip__body');
    this.renderer.setAttribute(this.tooltipBody, 'id', tooltipID);
    this.renderer.setAttribute(this.tooltipBody, 'role', 'tooltip');
    this.renderer.setAttribute(this.tooltipBody, 'aria-hidden', 'true');

    const text = this.renderer.createText(this.title);
    this.renderer.appendChild(this.tooltipBody, text);
  }

  positionTop(): void {
    this.resetPositionStyles(this.tooltipBody);

    const top = this.calculateMarginOffset(
      'top',
      this.tooltipBody.offsetHeight,
      this.tooltipTrigger
    );
    const left = this.calculateMarginOffset(
      'left',
      this.tooltipBody.offsetWidth,
      this.tooltipTrigger
    );

    this.setPositionClass('top');

    this.tooltipBody.style.left = '50%';
    this.tooltipBody.style.top = `-${this.TRIANGLE_SIZE}px`;
    this.tooltipBody.style.margin = `-${top}px 0 0 -${left / 2}px`;
  }

  positionBottom(): void {
    this.resetPositionStyles(this.tooltipBody);

    const left = this.calculateMarginOffset(
      'left',
      this.tooltipBody.offsetWidth,
      this.tooltipTrigger
    );

    this.setPositionClass('bottom');

    this.tooltipBody.style.left = '50%';
    this.tooltipBody.style.margin = `${this.TRIANGLE_SIZE}px 0 0 -${
      left / 2
    }px`;
  }

  positionLeft(): void {
    this.resetPositionStyles(this.tooltipBody);

    const top = this.calculateMarginOffset(
      'top',
      this.tooltipBody.offsetHeight,
      this.tooltipTrigger
    );
    const left = this.calculateMarginOffset(
      'left',
      this.tooltipTrigger.offsetLeft > this.tooltipBody.offsetWidth
        ? this.tooltipTrigger.offsetLeft - this.tooltipBody.offsetWidth
        : this.tooltipBody.offsetWidth,
      this.tooltipTrigger
    );

    this.setPositionClass('left');

    this.tooltipBody.style.top = `50%`;
    this.tooltipBody.style.left = `-${this.TRIANGLE_SIZE}px`;
    this.tooltipBody.style.margin = `-${top / 2}px 0 0 ${
      this.tooltipTrigger.offsetLeft > this.tooltipBody.offsetWidth
        ? left
        : -left
    }px`;
  }
  positionRight(): void {
    this.resetPositionStyles(this.tooltipBody);

    const top = this.calculateMarginOffset(
      'top',
      this.tooltipBody.offsetHeight,
      this.tooltipTrigger
    );

    this.setPositionClass('right');

    this.tooltipBody.style.top = '50%';
    this.tooltipBody.style.left = `${
      this.tooltipTrigger.offsetLeft +
      this.tooltipTrigger.offsetWidth +
      this.TRIANGLE_SIZE
    }px`;
    this.tooltipBody.style.margin = `-${top / 2}px 0 0 0`;
  }

  setPositionClass(position: string): void {
    this.renderer.removeClass(this.tooltipBody, 'usa-tooltip__body--top');
    this.renderer.removeClass(this.tooltipBody, 'usa-tooltip__body--bottom');
    this.renderer.removeClass(this.tooltipBody, 'usa-tooltip__body--left');
    this.renderer.removeClass(this.tooltipBody, 'usa-tooltip__body--right');
    this.renderer.addClass(this.tooltipBody, `usa-tooltip__body--${position}`);
  }

  show() {
    this.tooltipBody.setAttribute('aria-hidden', 'false');
    this.renderer.addClass(this.tooltipBody, 'is-set');
    this.renderer.addClass(this.tooltipBody, 'is-visible');

    switch (this.position) {
      case 'top': {
        this.positionTop();
        if (!this.isInViewport(this.tooltipBody)) {
          this.positionBottom();
        }
        break;
      }
      case 'bottom': {
        this.positionBottom();
        if (!this.isInViewport(this.tooltipBody)) {
          this.positionTop();
        }
        break;
      }
      case 'left':
        this.positionLeft();
        if (!this.isInViewport(this.tooltipBody)) {
          this.positionRight();
          if (!this.isInViewport(this.tooltipBody)) {
            this.positionTop();
          }
        }
        break;
      case 'right':
        this.positionRight();
        if (!this.isInViewport(this.tooltipBody)) {
          this.positionLeft();
          if (!this.isInViewport(this.tooltipBody)) {
            this.positionTop();
          }
        }
        break;
    }
  }

  hide() {
    this.renderer.removeClass(this.tooltipBody, 'is-set');
    this.renderer.removeClass(this.tooltipBody, 'is-visible');
    this.tooltipBody.setAttribute('aria-hidden', 'true');
  }

  isInViewport(elementToCheck): boolean {
    const rect = elementToCheck.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  offsetMargin(target, propertyToCheck): number {
    return parseInt(
      window.getComputedStyle(target).getPropertyValue(propertyToCheck),
      10
    );
  }

  calculateMarginOffset(positionToCheck, bodyOffset, trigger) {
    return this.offsetMargin(trigger, `margin-${positionToCheck}`) > 0
      ? bodyOffset - this.offsetMargin(trigger, `margin-${positionToCheck}`)
      : bodyOffset;
  }

  resetPositionStyles(target): void {
    target.style.top = null;
    target.style.bottom = null;
    target.style.right = null;
    target.style.left = null;
    target.style.margin = null;
  }
}
