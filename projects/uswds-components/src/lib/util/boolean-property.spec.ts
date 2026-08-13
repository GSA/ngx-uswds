import { describe, it, expect } from 'vitest';
import { coerceBooleanProperty } from './boolean-property';

describe('coerceBooleanProperty', () => {
  it('returns true for boolean true', () => {
    expect(coerceBooleanProperty(true)).toBe(true);
  });

  it('returns false for boolean false', () => {
    expect(coerceBooleanProperty(false)).toBe(false);
  });

  it('returns true for non-empty string "true"', () => {
    expect(coerceBooleanProperty('true')).toBe(true);
  });

  it('returns false for string "false"', () => {
    expect(coerceBooleanProperty('false')).toBe(false);
  });

  it('returns true for empty string (attribute present with no value)', () => {
    expect(coerceBooleanProperty('')).toBe(true);
  });

  it('returns true for arbitrary non-false string', () => {
    expect(coerceBooleanProperty('yes')).toBe(true);
  });

  it('returns false for null', () => {
    expect(coerceBooleanProperty(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(coerceBooleanProperty(undefined)).toBe(false);
  });

  it('returns true for number 1', () => {
    expect(coerceBooleanProperty(1)).toBe(true);
  });

  it('returns true for number 0 (not null/undefined, and "0" !== "false")', () => {
    expect(coerceBooleanProperty(0)).toBe(true);
  });
});
