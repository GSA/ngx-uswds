import { describe, it, expect, vi } from 'vitest';
import { NgZone } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  toInteger,
  toString,
  getValueInRange,
  isString,
  isNumber,
  isInteger,
  isDefined,
  padNumber,
  regExpEscape,
  hasClassName,
  closest,
  reflow,
  runInZone,
  removeAccents,
  findLast,
  findLastIndex,
  getNextItemInList,
  getNextItemIndexInList,
  coerceStringArray,
} from './util';
import { of } from 'rxjs';

// ─── toInteger ───────────────────────────────────────────────────────────────
describe('toInteger', () => {
  it('parses an integer string', () => expect(toInteger('42')).toBe(42));
  it('parses a float string to integer part', () => expect(toInteger('3.9')).toBe(3));
  it('parses a number', () => expect(toInteger(7)).toBe(7));
  it('returns NaN for non-numeric string', () => expect(toInteger('abc')).toBeNaN());
});

// ─── toString ────────────────────────────────────────────────────────────────
describe('toString', () => {
  it('converts number to string', () => expect(toString(5)).toBe('5'));
  it('converts string to string', () => expect(toString('hi')).toBe('hi'));
  it('returns empty string for null', () => expect(toString(null)).toBe(''));
  it('returns empty string for undefined', () => expect(toString(undefined)).toBe(''));
});

// ─── getValueInRange ─────────────────────────────────────────────────────────
describe('getValueInRange', () => {
  it('returns value when within range', () => expect(getValueInRange(5, 10, 0)).toBe(5));
  it('clamps to max', () => expect(getValueInRange(15, 10, 0)).toBe(10));
  it('clamps to min', () => expect(getValueInRange(-5, 10, 0)).toBe(0));
  it('uses 0 as default min', () => expect(getValueInRange(-1, 10)).toBe(0));
});

// ─── isString ────────────────────────────────────────────────────────────────
describe('isString', () => {
  it('returns true for a string', () => expect(isString('hello')).toBe(true));
  it('returns false for a number', () => expect(isString(42)).toBe(false));
  it('returns false for null', () => expect(isString(null)).toBe(false));
});

// ─── isNumber ────────────────────────────────────────────────────────────────
describe('isNumber', () => {
  it('returns true for "42"', () => expect(isNumber('42')).toBe(true));
  it('returns true for number 7', () => expect(isNumber(7)).toBe(true));
  it('returns false for non-numeric string', () => expect(isNumber('abc')).toBe(false));
  it('returns false for null', () => expect(isNumber(null)).toBe(false));
});

// ─── isInteger ───────────────────────────────────────────────────────────────
describe('isInteger', () => {
  it('returns true for integer 3', () => expect(isInteger(3)).toBe(true));
  it('returns false for float 3.5', () => expect(isInteger(3.5)).toBe(false));
  it('returns false for Infinity', () => expect(isInteger(Infinity)).toBe(false));
  it('returns false for string', () => expect(isInteger('3' as any)).toBe(false));
});

// ─── isDefined ───────────────────────────────────────────────────────────────
describe('isDefined', () => {
  it('returns true for 0', () => expect(isDefined(0)).toBe(true));
  it('returns true for empty string', () => expect(isDefined('')).toBe(true));
  it('returns false for null', () => expect(isDefined(null)).toBe(false));
  it('returns false for undefined', () => expect(isDefined(undefined)).toBe(false));
});

// ─── padNumber ───────────────────────────────────────────────────────────────
describe('padNumber', () => {
  it('pads single digit', () => expect(padNumber(5)).toBe('05'));
  it('does not pad two-digit number', () => expect(padNumber(12)).toBe('12'));
  it('returns empty string for non-numeric value', () => expect(padNumber(NaN)).toBe(''));
});

// ─── regExpEscape ────────────────────────────────────────────────────────────
describe('regExpEscape', () => {
  it('escapes special regex characters', () => {
    expect(regExpEscape('(hello.world)')).toBe('\\(hello\\.world\\)');
  });
  it('leaves plain text unchanged', () => expect(regExpEscape('abc')).toBe('abc'));
});

// ─── hasClassName ────────────────────────────────────────────────────────────
describe('hasClassName', () => {
  it('returns true when class is present', () => {
    expect(hasClassName({ className: 'foo bar baz' }, 'bar')).toBe(true);
  });
  it('returns false when class is absent', () => {
    expect(hasClassName({ className: 'foo baz' }, 'bar')).toBe(false);
  });
  it('returns falsy for falsy element', () => {
    expect(hasClassName(null, 'bar')).toBeFalsy();
  });
});

// ─── closest ─────────────────────────────────────────────────────────────────
describe('closest', () => {
  it('returns null when selector is undefined', () => {
    const el = document.createElement('div');
    expect(closest(el, undefined)).toBeNull();
  });

  it('returns the matching ancestor', () => {
    const parent = document.createElement('section');
    parent.className = 'container';
    const child = document.createElement('span');
    parent.appendChild(child);
    document.body.appendChild(parent);
    expect(closest(child, '.container')).toBe(parent);
    document.body.removeChild(parent);
  });

  it('returns null when no ancestor matches', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    expect(closest(el, '.nonexistent')).toBeNull();
    document.body.removeChild(el);
  });
});

// ─── reflow ───────────────────────────────────────────────────────────────────
describe('reflow', () => {
  it('returns a DOMRect-like object for a real element', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const rect = reflow(el);
    expect(rect).toBeDefined();
    expect(typeof rect.width).toBe('number');
    document.body.removeChild(el);
  });

  it('falls back to document.body when passed a falsy value', () => {
    const rect = reflow(null as any);
    expect(rect).toBeDefined();
  });
});

// ─── runInZone ───────────────────────────────────────────────────────────────
describe('runInZone', () => {
  it('pipes values through the zone and emits them', async () => {
    // Use a minimal NgZone stub that runs callbacks synchronously
    const zone = { run: (fn: () => any) => fn() } as unknown as NgZone;
    const result = await firstValueFrom(of(42).pipe(runInZone(zone)));
    expect(result).toBe(42);
  });
});

// ─── removeAccents ───────────────────────────────────────────────────────────
describe('removeAccents', () => {
  it('strips diacritics from accented characters', () => {
    expect(removeAccents('café')).toBe('cafe');
    expect(removeAccents('naïve')).toBe('naive');
    expect(removeAccents('résumé')).toBe('resume');
  });
  it('leaves plain ASCII unchanged', () => expect(removeAccents('abc')).toBe('abc'));
});

// ─── findLast ─────────────────────────────────────────────────────────────────
describe('findLast', () => {
  it('returns the last element matching predicate', () => {
    expect(findLast([1, 2, 3, 2], (x) => x === 2)).toBe(2);
  });
  it('returns last matching when multiple matches exist (scans from end)', () => {
    const arr = [{ id: 1 }, { id: 2 }, { id: 1 }];
    expect(findLast(arr, (x) => x.id === 1)).toBe(arr[2]);
  });
  it('returns null when no element matches', () => {
    expect(findLast([1, 2, 3], (x) => x === 99)).toBeNull();
  });
});

// ─── findLastIndex ────────────────────────────────────────────────────────────
describe('findLastIndex', () => {
  it('returns index of the last matching element', () => {
    expect(findLastIndex([1, 2, 3, 2], (x) => x === 2)).toBe(3);
  });
  it('returns -1 when no element matches', () => {
    expect(findLastIndex([1, 2, 3], (x) => x === 99)).toBe(-1);
  });
});

// ─── getNextItemInList ────────────────────────────────────────────────────────
describe('getNextItemInList', () => {
  const items = [{ disabled: false }, { disabled: true }, { disabled: false }];

  it('returns next enabled item in positive direction', () => {
    expect(getNextItemInList(0, items, 1)).toBe(items[2]);
  });

  it('wraps around from end to start', () => {
    expect(getNextItemInList(2, items, 1)).toBe(items[0]);
  });

  it('returns next enabled item in negative direction', () => {
    expect(getNextItemInList(2, items, -1)).toBe(items[0]);
  });

  it('skips disabled items', () => {
    // index 0 → delta 1 → index 1 (disabled) → index 2 (enabled)
    expect(getNextItemInList(0, items, 1)).toBe(items[2]);
  });
});

// ─── getNextItemIndexInList ───────────────────────────────────────────────────
describe('getNextItemIndexInList', () => {
  const items = [{ disabled: false }, { disabled: true }, { disabled: false }];

  it('returns index of next enabled item', () => {
    expect(getNextItemIndexInList(0, items, 1)).toBe(2);
  });

  it('returns index wrapping around list end', () => {
    expect(getNextItemIndexInList(2, items, 1)).toBe(0);
  });

  it('returns index in negative direction', () => {
    expect(getNextItemIndexInList(2, items, -1)).toBe(0);
  });
});

// ─── coerceStringArray ────────────────────────────────────────────────────────
describe('coerceStringArray', () => {
  it('returns empty array for null', () => expect(coerceStringArray(null)).toEqual([]));
  it('returns empty array for undefined', () => expect(coerceStringArray(undefined)).toEqual([]));
  it('splits a string by whitespace by default', () => expect(coerceStringArray('a b c')).toEqual(['a', 'b', 'c']));
  it('trims and filters empty strings from array', () => {
    expect(coerceStringArray(['a', ' b ', '  '])).toEqual(['a', 'b']);
  });
  it('passes through an array of strings', () => {
    expect(coerceStringArray(['foo', 'bar'])).toEqual(['foo', 'bar']);
  });
  it('converts non-array value with custom separator', () => {
    expect(coerceStringArray('a,b,c', ',')).toEqual(['a', 'b', 'c']);
  });
  it('stringifies non-string array entries', () => {
    expect(coerceStringArray([1, [2, 3]])).toEqual(['1', '2,3']);
  });
  it('returns empty array for array with only whitespace strings', () => {
    expect(coerceStringArray(['  ', '  '])).toEqual([]);
  });
});
