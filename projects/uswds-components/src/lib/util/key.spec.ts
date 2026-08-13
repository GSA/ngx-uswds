import { describe, it, expect } from 'vitest';
import {
  Key,
  MicrosfotKeys,
  KeyCode,
  isArrowDown,
  isArrowUp,
  isArrowRight,
  isArrowLeft,
  isHome,
  isEnd,
  isEscape,
  isPageDown,
  isPageUp,
  isEnter,
  isTab,
  isSpace,
  hasModifierKey,
} from './key';

function makeEvent(overrides: Partial<KeyboardEvent>): KeyboardEvent {
  return {
    key: '',
    keyCode: 0,
    altKey: false,
    shiftKey: false,
    ctrlKey: false,
    metaKey: false,
    ...overrides,
  } as unknown as KeyboardEvent;
}

describe('key utilities', () => {
  // ─── isArrowDown ───────────────────────────────────────────────────────────
  describe('isArrowDown', () => {
    it('returns true for Key.ArrowDown', () => {
      expect(isArrowDown(makeEvent({ key: Key.ArrowDown }))).toBe(true);
    });
    it('returns true for MicrosfotKeys.ArrowDown (legacy IE value "Down")', () => {
      expect(isArrowDown(makeEvent({ key: MicrosfotKeys.ArrowDown }))).toBe(true);
    });
    it('returns true for KeyCode.ArrowDown (keyCode 40)', () => {
      expect(isArrowDown(makeEvent({ keyCode: KeyCode.ArrowDown }))).toBe(true);
    });
    it('returns false for unrelated key', () => {
      expect(isArrowDown(makeEvent({ key: 'a' }))).toBe(false);
    });
  });

  // ─── isArrowUp ─────────────────────────────────────────────────────────────
  describe('isArrowUp', () => {
    it('returns true for Key.ArrowUp', () => {
      expect(isArrowUp(makeEvent({ key: Key.ArrowUp }))).toBe(true);
    });
    it('returns true for MicrosfotKeys.ArrowUp ("Up")', () => {
      expect(isArrowUp(makeEvent({ key: MicrosfotKeys.ArrowUp }))).toBe(true);
    });
    it('returns true for KeyCode.ArrowUp (38)', () => {
      expect(isArrowUp(makeEvent({ keyCode: KeyCode.ArrowUp }))).toBe(true);
    });
    it('returns false for unrelated key', () => {
      expect(isArrowUp(makeEvent({ key: 'b' }))).toBe(false);
    });
  });

  // ─── isArrowRight ──────────────────────────────────────────────────────────
  describe('isArrowRight', () => {
    it('returns true for Key.ArrowRight', () => {
      expect(isArrowRight(makeEvent({ key: Key.ArrowRight }))).toBe(true);
    });
    it('returns true for MicrosfotKeys.ArrowRight ("Right")', () => {
      expect(isArrowRight(makeEvent({ key: MicrosfotKeys.ArrowRight }))).toBe(true);
    });
    it('returns true for KeyCode.ArrowRight (39)', () => {
      expect(isArrowRight(makeEvent({ keyCode: KeyCode.ArrowRight }))).toBe(true);
    });
    it('returns false for unrelated key', () => {
      expect(isArrowRight(makeEvent({ key: 'c' }))).toBe(false);
    });
  });

  // ─── isArrowLeft ───────────────────────────────────────────────────────────
  describe('isArrowLeft', () => {
    it('returns true for Key.ArrowLeft', () => {
      expect(isArrowLeft(makeEvent({ key: Key.ArrowLeft }))).toBe(true);
    });
    it('returns true for MicrosfotKeys.ArrowLeft ("Left")', () => {
      expect(isArrowLeft(makeEvent({ key: MicrosfotKeys.ArrowLeft }))).toBe(true);
    });
    it('returns true for KeyCode.ArrowLeft (37)', () => {
      expect(isArrowLeft(makeEvent({ keyCode: KeyCode.ArrowLeft }))).toBe(true);
    });
    it('returns false for unrelated key', () => {
      expect(isArrowLeft(makeEvent({ key: 'd' }))).toBe(false);
    });
  });

  // ─── isHome ────────────────────────────────────────────────────────────────
  describe('isHome', () => {
    it('returns true for Key.Home', () => {
      expect(isHome(makeEvent({ key: Key.Home }))).toBe(true);
    });
    it('returns true for MicrosfotKeys.Home', () => {
      expect(isHome(makeEvent({ key: MicrosfotKeys.Home }))).toBe(true);
    });
    it('returns true for KeyCode.Home (36)', () => {
      expect(isHome(makeEvent({ keyCode: KeyCode.Home }))).toBe(true);
    });
    it('returns false for unrelated key', () => {
      expect(isHome(makeEvent({ key: 'e' }))).toBe(false);
    });
  });

  // ─── isEnd ─────────────────────────────────────────────────────────────────
  describe('isEnd', () => {
    it('returns true for Key.End', () => {
      expect(isEnd(makeEvent({ key: Key.End }))).toBe(true);
    });
    it('returns true for MicrosfotKeys.End', () => {
      expect(isEnd(makeEvent({ key: MicrosfotKeys.End }))).toBe(true);
    });
    it('returns true for KeyCode.End (35)', () => {
      expect(isEnd(makeEvent({ keyCode: KeyCode.End }))).toBe(true);
    });
    it('returns false for unrelated key', () => {
      expect(isEnd(makeEvent({ key: 'f' }))).toBe(false);
    });
  });

  // ─── isEscape ──────────────────────────────────────────────────────────────
  describe('isEscape', () => {
    it('returns true for Key.Escape', () => {
      expect(isEscape(makeEvent({ key: Key.Escape }))).toBe(true);
    });
    it('returns true for MicrosfotKeys.Escape ("Esc")', () => {
      expect(isEscape(makeEvent({ key: MicrosfotKeys.Escape }))).toBe(true);
    });
    it('returns true for KeyCode.Escape (27)', () => {
      expect(isEscape(makeEvent({ keyCode: KeyCode.Escape }))).toBe(true);
    });
    it('returns false for unrelated key', () => {
      expect(isEscape(makeEvent({ key: 'g' }))).toBe(false);
    });
  });

  // ─── isPageDown ────────────────────────────────────────────────────────────
  describe('isPageDown', () => {
    it('returns true for Key.PageDown', () => {
      expect(isPageDown(makeEvent({ key: Key.PageDown }))).toBe(true);
    });
    it('returns true for MicrosfotKeys.PageDown', () => {
      expect(isPageDown(makeEvent({ key: MicrosfotKeys.PageDown }))).toBe(true);
    });
    it('returns true for KeyCode.PageDown (34)', () => {
      expect(isPageDown(makeEvent({ keyCode: KeyCode.PageDown }))).toBe(true);
    });
    it('returns false for unrelated key', () => {
      expect(isPageDown(makeEvent({ key: 'h' }))).toBe(false);
    });
  });

  // ─── isPageUp ──────────────────────────────────────────────────────────────
  describe('isPageUp', () => {
    it('returns true for Key.PageUp', () => {
      expect(isPageUp(makeEvent({ key: Key.PageUp }))).toBe(true);
    });
    it('returns true for MicrosfotKeys.PageUp', () => {
      expect(isPageUp(makeEvent({ key: MicrosfotKeys.PageUp }))).toBe(true);
    });
    it('returns true for KeyCode.PageUp (33)', () => {
      expect(isPageUp(makeEvent({ keyCode: KeyCode.PageUp }))).toBe(true);
    });
    it('returns false for unrelated key', () => {
      expect(isPageUp(makeEvent({ key: 'i' }))).toBe(false);
    });
  });

  // ─── isEnter ───────────────────────────────────────────────────────────────
  describe('isEnter', () => {
    it('returns true for Key.Enter', () => {
      expect(isEnter(makeEvent({ key: Key.Enter }))).toBe(true);
    });
    it('returns true for MicrosfotKeys.Enter', () => {
      expect(isEnter(makeEvent({ key: MicrosfotKeys.Enter }))).toBe(true);
    });
    it('returns true for KeyCode.Enter (13)', () => {
      expect(isEnter(makeEvent({ keyCode: KeyCode.Enter }))).toBe(true);
    });
    it('returns false for unrelated key', () => {
      expect(isEnter(makeEvent({ key: 'j' }))).toBe(false);
    });
  });

  // ─── isTab ─────────────────────────────────────────────────────────────────
  describe('isTab', () => {
    it('returns true for Key.Tab with no modifiers', () => {
      expect(isTab(makeEvent({ key: Key.Tab }))).toBe(true);
    });
    it('returns true for MicrosfotKeys.Tab with no modifiers', () => {
      expect(isTab(makeEvent({ key: MicrosfotKeys.Tab }))).toBe(true);
    });
    it('returns true for KeyCode.Tab (9) with no modifiers', () => {
      expect(isTab(makeEvent({ keyCode: KeyCode.Tab }))).toBe(true);
    });
    it('returns false when modifier key (shift) is held', () => {
      expect(isTab(makeEvent({ key: Key.Tab, shiftKey: true }))).toBe(false);
    });
    it('returns false when modifier key (ctrl) is held', () => {
      expect(isTab(makeEvent({ key: Key.Tab, ctrlKey: true }))).toBe(false);
    });
    it('returns false for unrelated key', () => {
      expect(isTab(makeEvent({ key: 'k' }))).toBe(false);
    });
  });

  // ─── isSpace ───────────────────────────────────────────────────────────────
  describe('isSpace', () => {
    it('returns true for Key.Space', () => {
      expect(isSpace(makeEvent({ key: Key.Space }))).toBe(true);
    });
    it('returns true for MicrosfotKeys.Space ("Spacebar")', () => {
      expect(isSpace(makeEvent({ key: MicrosfotKeys.Space }))).toBe(true);
    });
    it('returns true for KeyCode.Space (32)', () => {
      expect(isSpace(makeEvent({ keyCode: KeyCode.Space }))).toBe(true);
    });
    it('returns false for unrelated key', () => {
      expect(isSpace(makeEvent({ key: 'l' }))).toBe(false);
    });
  });

  // ─── hasModifierKey ────────────────────────────────────────────────────────
  describe('hasModifierKey', () => {
    it('returns false when no modifier keys are pressed', () => {
      expect(hasModifierKey(makeEvent({}))).toBe(false);
    });
    it('returns true when altKey is pressed', () => {
      expect(hasModifierKey(makeEvent({ altKey: true }))).toBe(true);
    });
    it('returns true when shiftKey is pressed', () => {
      expect(hasModifierKey(makeEvent({ shiftKey: true }))).toBe(true);
    });
    it('returns true when ctrlKey is pressed', () => {
      expect(hasModifierKey(makeEvent({ ctrlKey: true }))).toBe(true);
    });
    it('returns true when metaKey is pressed', () => {
      expect(hasModifierKey(makeEvent({ metaKey: true }))).toBe(true);
    });
    it('checks only specified modifiers when list provided — match', () => {
      expect(hasModifierKey(makeEvent({ shiftKey: true }), 'shiftKey')).toBe(true);
    });
    it('checks only specified modifiers when list provided — no match', () => {
      expect(hasModifierKey(makeEvent({ altKey: true }), 'shiftKey', 'ctrlKey')).toBe(false);
    });
  });
});
