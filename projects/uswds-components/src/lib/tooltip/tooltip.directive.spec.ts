import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, DebugNode, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UsaTooltipDirective } from './tooltip.directive';

@Component({
  template: `<div><button [usaTooltip] title="test">Test</button></div>`
})
class TestTooltipComponent {
  @ViewChild(UsaTooltipDirective) directive: UsaTooltipDirective;
}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestTooltipComponent>, component: TestTooltipComponent, button: DebugElement, tooltipText: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsaTooltipDirective, TestTooltipComponent],
      schemas: []
    });
    fixture = TestBed.createComponent(TestTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    button = fixture.debugElement.query(By.css('button'));
    tooltipText = fixture.debugElement.query(By.css('.usa-tooltip__body'));
  });
  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should show tooltip when hovered', () => {
    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(false)
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(false)
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('true');

    button.triggerEventHandler('mouseenter', null)
    fixture.detectChanges();

    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(true)
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(true)
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('false');
  });

  it('should hide tooltip after hover event finished', () => {
    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(false)
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(false)
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('true');

    button.triggerEventHandler('mouseenter', null)
    fixture.detectChanges();

    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(true)
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(true)
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('false');

    button.triggerEventHandler('mouseleave', null)
    fixture.detectChanges();

    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(false)
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(false)
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('true');
  })

  it('should show tooltip when focused', () => {
    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(false)
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(false)
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('true');

    button.triggerEventHandler('focus', null)
    fixture.detectChanges();

    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(true)
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(true)
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('false');
  });

  it('should hide tooltip after blur', () => {
    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(false)
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(false)
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('true');

    button.triggerEventHandler('focus', null)
    fixture.detectChanges();

    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(true)
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(true)
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('false');

    button.triggerEventHandler('blur', null)
    fixture.detectChanges();

    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(false)
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(false)
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('true');
  })
  it('position should default to top if no position is provided', () => {

    button.triggerEventHandler('focus', null)
    fixture.detectChanges();
    expect(Object.keys(tooltipText.classes).includes('usa-tooltip__body--top')).toBe(true)
  })
  it('should apply the appropriate position class based on input', () => {
    component.directive.position = 'bottom';
    button.triggerEventHandler('focus', null)
    fixture.detectChanges();
    expect(Object.keys(tooltipText.classes).includes('usa-tooltip__body--bottom')).toBe(true);
    button.triggerEventHandler('blur', null)
    fixture.detectChanges();

    component.directive.position = 'left';
    button.triggerEventHandler('focus', null)
    fixture.detectChanges();
    expect(Object.keys(tooltipText.classes).includes('usa-tooltip__body--left')).toBe(true);
    button.triggerEventHandler('blur', null)
    fixture.detectChanges();

    component.directive.position = 'right';
    button.triggerEventHandler('focus', null)
    fixture.detectChanges();
    expect(Object.keys(tooltipText.classes).includes('usa-tooltip__body--right')).toBe(true);
    button.triggerEventHandler('blur', null)
    fixture.detectChanges();

    component.directive.position = 'top';
    button.triggerEventHandler('focus', null)
    fixture.detectChanges();
    expect(Object.keys(tooltipText.classes).includes('usa-tooltip__body--top')).toBe(true);
    button.triggerEventHandler('blur', null)
    fixture.detectChanges();
  })
});
