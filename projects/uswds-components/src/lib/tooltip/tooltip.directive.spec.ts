import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, DebugNode, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UsaTooltipDirective } from './tooltip.directive';
import { UsaTooltipModule } from './tooltip.module';

@Component({
  standalone: false,
  template: `<div><button [usaTooltip] title="test">Test</button></div>`,
})
class TestTooltipComponent {
  @ViewChild(UsaTooltipDirective) directive: UsaTooltipDirective;
}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestTooltipComponent>,
    component: TestTooltipComponent,
    button: DebugElement,
    tooltipText: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UsaTooltipModule],
      declarations: [TestTooltipComponent],
      schemas: [],
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
    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(false);
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(false);
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('true');

    button.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(true);
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(true);
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('false');
  });

  it('should hide tooltip after hover event finished', () => {
    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(false);
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(false);
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('true');

    button.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();

    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(true);
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(true);
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('false');

    button.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();

    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(false);
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(false);
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('should show tooltip when focused', () => {
    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(false);
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(false);
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('true');

    button.triggerEventHandler('focus', null);
    fixture.detectChanges();

    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(true);
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(true);
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('false');
  });

  it('should hide tooltip after blur', () => {
    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(false);
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(false);
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('true');

    button.triggerEventHandler('focus', null);
    fixture.detectChanges();

    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(true);
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(true);
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('false');

    button.triggerEventHandler('blur', null);
    fixture.detectChanges();

    expect(Object.keys(tooltipText.classes).includes('is-set')).toBe(false);
    expect(Object.keys(tooltipText.classes).includes('is-visible')).toBe(false);
    expect(tooltipText.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });
  it('position should default to top if no position is provided', () => {
    button.triggerEventHandler('focus', null);
    fixture.detectChanges();
    expect(Object.keys(tooltipText.classes).includes('usa-tooltip__body--top')).toBe(true);
  });
  it('should apply the appropriate position class based on input', () => {
    component.directive.position = 'bottom';
    button.triggerEventHandler('focus', null);
    fixture.detectChanges();
    expect(Object.keys(tooltipText.classes).includes('usa-tooltip__body--bottom')).toBe(true);
    button.triggerEventHandler('blur', null);
    fixture.detectChanges();

    component.directive.position = 'left';
    button.triggerEventHandler('focus', null);
    fixture.detectChanges();
    expect(Object.keys(tooltipText.classes).includes('usa-tooltip__body--left')).toBe(true);
    button.triggerEventHandler('blur', null);
    fixture.detectChanges();

    component.directive.position = 'right';
    button.triggerEventHandler('focus', null);
    fixture.detectChanges();
    expect(Object.keys(tooltipText.classes).includes('usa-tooltip__body--right')).toBe(true);
    button.triggerEventHandler('blur', null);
    fixture.detectChanges();

    component.directive.position = 'top';
    button.triggerEventHandler('focus', null);
    fixture.detectChanges();
    expect(Object.keys(tooltipText.classes).includes('usa-tooltip__body--top')).toBe(true);
    button.triggerEventHandler('blur', null);
    fixture.detectChanges();
  });

  // ---------------------------------------------------------------------------
  // Viewport fallback branches
  //
  // When the primary position is not within the viewport the directive falls
  // back through the alternate positions. We force `isInViewport` to report
  // false so the fallback chains execute.
  // ---------------------------------------------------------------------------
  describe('viewport fallback', () => {
    it('falls back from top to bottom when top is off-screen', () => {
      vi.spyOn(component.directive, 'isInViewport').mockReturnValue(false);
      component.directive.position = 'top';
      component.directive.show();
      fixture.detectChanges();
      expect(Object.keys(tooltipText.classes).includes('usa-tooltip__body--bottom')).toBe(true);
    });

    it('falls back from bottom to top when bottom is off-screen', () => {
      vi.spyOn(component.directive, 'isInViewport').mockReturnValue(false);
      component.directive.position = 'bottom';
      component.directive.show();
      fixture.detectChanges();
      expect(Object.keys(tooltipText.classes).includes('usa-tooltip__body--top')).toBe(true);
    });

    it('falls back left → right → top when everything is off-screen', () => {
      vi.spyOn(component.directive, 'isInViewport').mockReturnValue(false);
      component.directive.position = 'left';
      component.directive.show();
      fixture.detectChanges();
      expect(Object.keys(tooltipText.classes).includes('usa-tooltip__body--top')).toBe(true);
    });

    it('falls back right → left → top when everything is off-screen', () => {
      vi.spyOn(component.directive, 'isInViewport').mockReturnValue(false);
      component.directive.position = 'right';
      component.directive.show();
      fixture.detectChanges();
      expect(Object.keys(tooltipText.classes).includes('usa-tooltip__body--top')).toBe(true);
    });

    it('keeps left position when the first placement fits', () => {
      vi.spyOn(component.directive, 'isInViewport').mockReturnValue(true);
      component.directive.position = 'left';
      component.directive.show();
      fixture.detectChanges();
      expect(Object.keys(tooltipText.classes).includes('usa-tooltip__body--left')).toBe(true);
    });
  });

  // ---------------------------------------------------------------------------
  // wrapper classes input
  // ---------------------------------------------------------------------------
  it('adds custom wrapper classes supplied via the classes input', () => {
    // Re-init with a classes input on a fresh directive instance.
    component.directive.classes = 'extra-a extra-b';
    component.directive.ngAfterViewInit();
    expect(component.directive.tooltipWrapper.classList.contains('extra-a')).toBe(true);
    expect(component.directive.tooltipWrapper.classList.contains('extra-b')).toBe(true);
  });
});
