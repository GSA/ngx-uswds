import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { getFocusableBoundaryElements, usaFocusTrap } from './focus-trap';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Run callbacks immediately, simulating Zone.runOutsideAngular in jsdom */
const zone = {
  runOutsideAngular: (fn: () => void) => fn(),
} as unknown as NgZone;

function makeButton(tabIndex?: number): HTMLButtonElement {
  const btn = document.createElement('button');
  if (tabIndex !== undefined) btn.tabIndex = tabIndex;
  return btn;
}

// ─── getFocusableBoundaryElements ─────────────────────────────────────────────
describe('getFocusableBoundaryElements', () => {
  it('returns the first and last focusable elements', () => {
    const container = document.createElement('div');
    const first = makeButton();
    const middle = makeButton();
    const last = makeButton();
    container.appendChild(first);
    container.appendChild(middle);
    container.appendChild(last);
    document.body.appendChild(container);

    const [f, l] = getFocusableBoundaryElements(container);
    expect(f).toBe(first);
    expect(l).toBe(last);

    document.body.removeChild(container);
  });

  it('excludes elements with tabIndex -1', () => {
    const container = document.createElement('div');
    const excluded = makeButton(-1);
    const included = makeButton();
    container.appendChild(excluded);
    container.appendChild(included);
    document.body.appendChild(container);

    const [f, l] = getFocusableBoundaryElements(container);
    expect(f).toBe(included);
    expect(l).toBe(included);

    document.body.removeChild(container);
  });
});

// ─── usaFocusTrap ─────────────────────────────────────────────────────────────
describe('usaFocusTrap', () => {
  let container: HTMLDivElement;
  let first: HTMLButtonElement;
  let last: HTMLButtonElement;
  let stop$: Subject<void>;

  beforeEach(() => {
    container = document.createElement('div');
    first = makeButton();
    last = makeButton();
    container.appendChild(first);
    container.appendChild(last);
    document.body.appendChild(container);
    stop$ = new Subject<void>();
  });

  afterEach(() => {
    stop$.complete();
    document.body.removeChild(container);
  });

  it('wraps focus from first to last on Shift+Tab', () => {
    usaFocusTrap(zone, container, stop$);

    // Simulate focus on first element, then shift+tab
    first.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: null }));

    const lastFocusSpy = vi.spyOn(last, 'focus');
    const shiftTab = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
    });
    vi.spyOn(shiftTab, 'preventDefault');
    first.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    container.dispatchEvent(shiftTab);

    expect(lastFocusSpy).toHaveBeenCalled();
  });

  it('wraps focus from last to first on Tab', () => {
    usaFocusTrap(zone, container, stop$);

    last.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

    const firstFocusSpy = vi.spyOn(first, 'focus');
    const tab = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: false,
      bubbles: true,
    });
    container.dispatchEvent(tab);

    expect(firstFocusSpy).toHaveBeenCalled();
  });

  it('does not trap focus after stop$ emits', () => {
    // Wire up the trap, let it see a focusin so withLatestFrom has a seed
    usaFocusTrap(zone, container, stop$);
    last.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

    // Complete the stop signal — trap should unsubscribe
    stop$.next();
    stop$.complete();

    // Now any Tab should be a no-op from the trap's perspective
    const firstFocusSpy = vi.spyOn(first, 'focus');
    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));

    expect(firstFocusSpy).not.toHaveBeenCalled();
  });

  it('refocuses last focused element on click when refocusOnClick=true', () => {
    usaFocusTrap(zone, container, stop$, true);

    first.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    const firstFocusSpy = vi.spyOn(first, 'focus');
    container.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(firstFocusSpy).toHaveBeenCalled();
  });

  it('does not set up click handler when refocusOnClick=false', () => {
    usaFocusTrap(zone, container, stop$, false);

    first.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    const firstFocusSpy = vi.spyOn(first, 'focus');
    container.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    // focus should not have been called by the trap
    expect(firstFocusSpy).not.toHaveBeenCalled();
  });
});
