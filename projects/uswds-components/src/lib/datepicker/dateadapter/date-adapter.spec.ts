import { DateAdapter } from './date-adapter';
import { NativeDateAdapter } from './native-date-adapter';

/**
 * A minimal concrete subclass so we can test the abstract base-class methods
 * (compareDate, sameDate, clampDate, getValidDateOrNull, deserialize).
 * We delegate everything to NativeDateAdapter and only expose the inherited
 * base methods under test.
 */
class TestDateAdapter extends NativeDateAdapter {
  constructor() {
    super('en-US');
  }
}

describe('DateAdapter (base class methods)', () => {
  let adapter: TestDateAdapter;

  beforeEach(() => {
    adapter = new TestDateAdapter();
  });

  // -----------------------------------------------------------------------
  // setLocale / localeChanges
  // -----------------------------------------------------------------------

  describe('setLocale', () => {
    it('emits on localeChanges when locale is changed', () => {
      let emitted = false;
      adapter.localeChanges.subscribe(() => (emitted = true));
      adapter.setLocale('fr-FR');
      expect(emitted).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // compareDate
  // -----------------------------------------------------------------------

  describe('compareDate', () => {
    it('returns 0 for equal dates', () => {
      expect(adapter.compareDate(new Date(2024, 0, 15), new Date(2024, 0, 15))).toBe(0);
    });

    it('returns negative when first is earlier (same year+month, earlier day)', () => {
      expect(adapter.compareDate(new Date(2024, 0, 10), new Date(2024, 0, 15))).toBeLessThan(0);
    });

    it('returns positive when first is later (same year+month, later day)', () => {
      expect(adapter.compareDate(new Date(2024, 0, 20), new Date(2024, 0, 15))).toBeGreaterThan(0);
    });

    it('compares by year first', () => {
      expect(adapter.compareDate(new Date(2023, 11, 31), new Date(2024, 0, 1))).toBeLessThan(0);
    });

    it('compares by month second', () => {
      expect(adapter.compareDate(new Date(2024, 2, 1), new Date(2024, 5, 1))).toBeLessThan(0);
    });
  });

  // -----------------------------------------------------------------------
  // sameDate
  // -----------------------------------------------------------------------

  describe('sameDate', () => {
    it('returns true for two equal dates', () => {
      expect(adapter.sameDate(new Date(2024, 0, 15), new Date(2024, 0, 15))).toBe(true);
    });

    it('returns false for different dates', () => {
      expect(adapter.sameDate(new Date(2024, 0, 15), new Date(2024, 0, 16))).toBe(false);
    });

    it('returns true when both are null', () => {
      expect(adapter.sameDate(null, null)).toBe(true);
    });

    it('returns false when only first is null', () => {
      expect(adapter.sameDate(null, new Date(2024, 0, 1))).toBe(false);
    });

    it('returns false when only second is null', () => {
      expect(adapter.sameDate(new Date(2024, 0, 1), null)).toBe(false);
    });

    it('returns false when first is invalid, second is valid', () => {
      expect(adapter.sameDate(new Date(NaN), new Date(2024, 0, 1))).toBe(false);
    });

    it('returns true when both are invalid dates', () => {
      expect(adapter.sameDate(new Date(NaN), new Date(NaN))).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // clampDate
  // -----------------------------------------------------------------------

  describe('clampDate', () => {
    it('returns the date when within min and max', () => {
      const d = new Date(2024, 5, 15);
      const result = adapter.clampDate(d, new Date(2024, 0, 1), new Date(2024, 11, 31));
      expect(adapter.sameDate(result, d)).toBe(true);
    });

    it('returns min when date is before min', () => {
      const min = new Date(2024, 5, 1);
      const result = adapter.clampDate(new Date(2024, 0, 1), min, null);
      expect(adapter.sameDate(result, min)).toBe(true);
    });

    it('returns max when date is after max', () => {
      const max = new Date(2024, 5, 1);
      const result = adapter.clampDate(new Date(2024, 11, 1), null, max);
      expect(adapter.sameDate(result, max)).toBe(true);
    });

    it('handles null min and max — returns the date unchanged', () => {
      const d = new Date(2024, 5, 15);
      expect(adapter.sameDate(adapter.clampDate(d, null, null), d)).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // getValidDateOrNull
  // -----------------------------------------------------------------------

  describe('getValidDateOrNull', () => {
    it('returns the date when valid', () => {
      const d = new Date(2024, 0, 15);
      expect(adapter.getValidDateOrNull(d)).toBe(d);
    });

    it('returns null for an invalid Date', () => {
      expect(adapter.getValidDateOrNull(new Date(NaN))).toBeNull();
    });

    it('returns null for a non-Date value', () => {
      expect(adapter.getValidDateOrNull('2024-01-01')).toBeNull();
    });

    it('returns null for null', () => {
      expect(adapter.getValidDateOrNull(null)).toBeNull();
    });
  });

  // -----------------------------------------------------------------------
  // deserialize (base-class path — delegates to NativeDateAdapter override)
  // -----------------------------------------------------------------------

  describe('deserialize', () => {
    it('returns null for null input', () => {
      expect(adapter.deserialize(null)).toBeNull();
    });

    it('returns the same Date when given a valid Date', () => {
      const d = new Date(2024, 0, 15);
      expect(adapter.deserialize(d)).toBe(d);
    });
  });
});
