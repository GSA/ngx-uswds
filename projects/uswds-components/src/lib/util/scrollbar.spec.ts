import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { ScrollBar } from './scrollbar';

describe('ScrollBar', () => {
  let scrollBar: ScrollBar;
  let doc: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ScrollBar] });
    scrollBar = TestBed.inject(ScrollBar);
    doc = TestBed.inject(DOCUMENT);
  });

  afterEach(() => {
    // Restore all mocks and globals reliably, even if a test assertion throws
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    // Reset any padding applied to body
    doc.body.style.paddingRight = '';
  });

  describe('compensate()', () => {
    it('returns a noop when no scrollbar is present', () => {
      // When window width equals body bounding rect, no scrollbar is present
      vi.spyOn(doc.body, 'getBoundingClientRect').mockReturnValue({
        left: 0,
        right: 1024,
        width: 1024,
        height: 768,
        top: 0,
        bottom: 768,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect);

      // Mock innerWidth to equal rect.left + rect.right so gap = 0 (no scrollbar)
      vi.stubGlobal('innerWidth', 1024);

      // Stub _getWidth to return 15 (a typical scrollbar width)
      const measurer = doc.createElement('div');
      vi.spyOn(measurer, 'getBoundingClientRect').mockReturnValue({
        width: 15,
        height: 0,
        left: 0,
        right: 15,
        top: 0,
        bottom: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect);
      Object.defineProperty(measurer, 'clientWidth', { value: 0, configurable: true });
      vi.spyOn(doc, 'createElement').mockReturnValue(measurer);

      const reverter = scrollBar.compensate();
      // noop: calling it should not throw and body padding should be unchanged
      reverter();
      expect(doc.body.style.paddingRight).toBe('');
    });

    it('adds padding to body when a scrollbar is present, and reverts it', () => {
      const scrollbarWidth = 15;

      // Simulate a scrollbar present: gap >= scrollbarWidth
      vi.spyOn(doc.body, 'getBoundingClientRect').mockReturnValue({
        left: 0,
        right: 1009,
        width: 1009,
        height: 768,
        top: 0,
        bottom: 768,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect);
      vi.stubGlobal('innerWidth', 1024); // gap = 1024 - 1009 = 15 >= scrollbarWidth

      const measurer = doc.createElement('div');
      vi.spyOn(measurer, 'getBoundingClientRect').mockReturnValue({
        width: scrollbarWidth,
        height: 0,
        left: 0,
        right: scrollbarWidth,
        top: 0,
        bottom: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect);
      Object.defineProperty(measurer, 'clientWidth', { value: 0, configurable: true });
      vi.spyOn(doc, 'createElement').mockReturnValue(measurer);

      // Also stub getComputedStyle so padding-right starts at 0
      vi.spyOn(window, 'getComputedStyle').mockReturnValue({
        'padding-right': '0',
        transitionProperty: 'none',
        transitionDelay: '0s',
        transitionDuration: '0s',
      } as unknown as CSSStyleDeclaration);

      const originalPadding = doc.body.style.paddingRight;
      const reverter = scrollBar.compensate();
      expect(doc.body.style.paddingRight).toBe(`${scrollbarWidth}px`);

      reverter();
      expect(doc.body.style.paddingRight).toBe(originalPadding);
    });
  });
});
