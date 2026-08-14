import { NativeDateAdapter } from './native-date-adapter';

function makeAdapter(locale = 'en-US'): NativeDateAdapter {
  // NativeDateAdapter constructor takes an optional locale token value
  return new NativeDateAdapter(locale);
}

describe('NativeDateAdapter', () => {
  let adapter: NativeDateAdapter;

  beforeEach(() => {
    adapter = makeAdapter('en-US');
  });

  // -----------------------------------------------------------------------
  // Basic date accessors
  // -----------------------------------------------------------------------

  describe('getYear', () => {
    it('returns the full year', () => {
      expect(adapter.getYear(new Date(2024, 0, 15))).toBe(2024);
    });
  });

  describe('getMonth', () => {
    it('returns 0-indexed month', () => {
      expect(adapter.getMonth(new Date(2024, 5, 1))).toBe(5);
    });
  });

  describe('getDate', () => {
    it('returns the day of the month', () => {
      expect(adapter.getDate(new Date(2024, 0, 20))).toBe(20);
    });
  });

  describe('getDayOfWeek', () => {
    it('returns 0 for Sunday', () => {
      // Jan 7 2024 is a Sunday
      expect(adapter.getDayOfWeek(new Date(2024, 0, 7))).toBe(0);
    });
  });

  describe('getFirstDayOfWeek', () => {
    it('always returns 0 (Sunday)', () => {
      expect(adapter.getFirstDayOfWeek()).toBe(0);
    });
  });

  // -----------------------------------------------------------------------
  // Month / date name lists
  // -----------------------------------------------------------------------

  describe('getMonthNames', () => {
    it('returns 12 long month names', () => {
      const names = adapter.getMonthNames('long');
      expect(names.length).toBe(12);
      expect(names[0]).toMatch(/January/i);
    });

    it('returns 12 short month names', () => {
      const names = adapter.getMonthNames('short');
      expect(names.length).toBe(12);
    });

    it('returns 12 narrow month names', () => {
      expect(adapter.getMonthNames('narrow').length).toBe(12);
    });
  });

  describe('getDateNames', () => {
    it('returns 31 date name strings', () => {
      const names = adapter.getDateNames();
      expect(names.length).toBe(31);
      expect(names[0]).toBe('1');
    });
  });

  describe('getDayOfWeekNames', () => {
    it('returns 7 long weekday names', () => {
      const names = adapter.getDayOfWeekNames('long');
      expect(names.length).toBe(7);
    });

    it('returns 7 short weekday names', () => {
      expect(adapter.getDayOfWeekNames('short').length).toBe(7);
    });

    it('returns 7 narrow weekday names', () => {
      expect(adapter.getDayOfWeekNames('narrow').length).toBe(7);
    });
  });

  describe('getYearName', () => {
    it('returns the year as a string', () => {
      expect(adapter.getYearName(new Date(2024, 0, 1))).toContain('2024');
    });
  });

  // -----------------------------------------------------------------------
  // Days in month
  // -----------------------------------------------------------------------

  describe('getNumDaysInMonth', () => {
    it('returns 31 for January', () => {
      expect(adapter.getNumDaysInMonth(new Date(2024, 0, 1))).toBe(31);
    });

    it('returns 29 for February in a leap year', () => {
      expect(adapter.getNumDaysInMonth(new Date(2024, 1, 1))).toBe(29);
    });

    it('returns 28 for February in a non-leap year', () => {
      expect(adapter.getNumDaysInMonth(new Date(2023, 1, 1))).toBe(28);
    });

    it('returns 30 for April', () => {
      expect(adapter.getNumDaysInMonth(new Date(2024, 3, 1))).toBe(30);
    });
  });

  // -----------------------------------------------------------------------
  // clone
  // -----------------------------------------------------------------------

  describe('clone', () => {
    it('returns a new Date equal to the original', () => {
      const d = new Date(2024, 5, 15);
      const c = adapter.clone(d);
      expect(c).not.toBe(d);
      expect(c.getTime()).toBe(d.getTime());
    });
  });

  // -----------------------------------------------------------------------
  // createDate
  // -----------------------------------------------------------------------

  describe('createDate', () => {
    it('creates a date for the given year/month/day', () => {
      const d = adapter.createDate(2024, 5, 15);
      expect(adapter.getYear(d)).toBe(2024);
      expect(adapter.getMonth(d)).toBe(5);
      expect(adapter.getDate(d)).toBe(15);
    });

    it('throws for invalid month (< 0) in dev mode', () => {
      expect(() => adapter.createDate(2024, -1, 1)).toThrow();
    });

    it('throws for invalid month (> 11) in dev mode', () => {
      expect(() => adapter.createDate(2024, 12, 1)).toThrow();
    });

    it('throws for date < 1 in dev mode', () => {
      expect(() => adapter.createDate(2024, 0, 0)).toThrow();
    });
  });

  // -----------------------------------------------------------------------
  // today
  // -----------------------------------------------------------------------

  describe('today', () => {
    it('returns a valid Date', () => {
      expect(adapter.isValid(adapter.today())).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // parse
  // -----------------------------------------------------------------------

  describe('parse', () => {
    it('parses a numeric timestamp', () => {
      const ts = new Date(2024, 0, 15).getTime();
      const result = adapter.parse(ts);
      expect(result).not.toBeNull();
      expect(result!.getFullYear()).toBe(2024);
    });

    it('parses an ISO string', () => {
      const result = adapter.parse('2024-06-15');
      expect(result).not.toBeNull();
    });

    it('returns null for empty string', () => {
      expect(adapter.parse('')).toBeNull();
    });

    it('returns null for null/undefined', () => {
      expect(adapter.parse(null)).toBeNull();
    });
  });

  // -----------------------------------------------------------------------
  // format
  // -----------------------------------------------------------------------

  describe('format', () => {
    it('formats a date with display options', () => {
      const d = new Date(2024, 0, 15);
      const result = adapter.format(d, { year: 'numeric', month: '2-digit', day: '2-digit' });
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('throws when formatting an invalid date', () => {
      expect(() => adapter.format(new Date(NaN), {})).toThrow();
    });
  });

  // -----------------------------------------------------------------------
  // addCalendarDays
  // -----------------------------------------------------------------------

  describe('addCalendarDays', () => {
    it('adds positive days', () => {
      const d = new Date(2024, 0, 15);
      const result = adapter.addCalendarDays(d, 10);
      expect(adapter.getDate(result)).toBe(25);
    });

    it('subtracts days with negative value', () => {
      const d = new Date(2024, 0, 15);
      const result = adapter.addCalendarDays(d, -5);
      expect(adapter.getDate(result)).toBe(10);
    });

    it('wraps across month boundaries', () => {
      const d = new Date(2024, 0, 31);
      const result = adapter.addCalendarDays(d, 1);
      expect(adapter.getMonth(result)).toBe(1);
      expect(adapter.getDate(result)).toBe(1);
    });
  });

  // -----------------------------------------------------------------------
  // addCalendarMonths
  // -----------------------------------------------------------------------

  describe('addCalendarMonths', () => {
    it('adds months forward', () => {
      const d = new Date(2024, 0, 15);
      const result = adapter.addCalendarMonths(d, 2);
      expect(adapter.getMonth(result)).toBe(2);
    });

    it('wraps across year boundary', () => {
      const d = new Date(2024, 11, 15);
      const result = adapter.addCalendarMonths(d, 1);
      expect(adapter.getYear(result)).toBe(2025);
      expect(adapter.getMonth(result)).toBe(0);
    });

    it('clamps day when target month has fewer days', () => {
      // Jan 31 + 1 month → Feb (should not overflow to March)
      const d = new Date(2024, 0, 31);
      const result = adapter.addCalendarMonths(d, 1);
      expect(adapter.getMonth(result)).toBe(1);
    });
  });

  // -----------------------------------------------------------------------
  // addCalendarYears
  // -----------------------------------------------------------------------

  describe('addCalendarYears', () => {
    it('adds years', () => {
      const d = new Date(2024, 0, 15);
      const result = adapter.addCalendarYears(d, 3);
      expect(adapter.getYear(result)).toBe(2027);
    });

    it('subtracts years', () => {
      const d = new Date(2024, 0, 15);
      const result = adapter.addCalendarYears(d, -4);
      expect(adapter.getYear(result)).toBe(2020);
    });
  });

  // -----------------------------------------------------------------------
  // toIso8601
  // -----------------------------------------------------------------------

  describe('toIso8601', () => {
    it('produces YYYY-MM-DD format', () => {
      const d = new Date(2024, 0, 5);
      expect(adapter.toIso8601(d)).toBe('2024-01-05');
    });

    it('zero-pads month and day', () => {
      expect(adapter.toIso8601(new Date(2024, 8, 9))).toBe('2024-09-09');
    });
  });

  // -----------------------------------------------------------------------
  // deserialize
  // -----------------------------------------------------------------------

  describe('deserialize', () => {
    it('returns null for empty string', () => {
      expect(adapter.deserialize('')).toBeNull();
    });

    it('deserializes a valid ISO 8601 string', () => {
      const result = adapter.deserialize('2024-06-15');
      expect(result).not.toBeNull();
      expect(adapter.isValid(result!)).toBe(true);
    });

    it('returns invalid date for a non-ISO string', () => {
      const result = adapter.deserialize('not-a-date');
      // super.deserialize returns invalid() for non-Date non-null values
      expect(result === null || !adapter.isValid(result!)).toBe(true);
    });

    it('returns the same Date instance when given a valid Date', () => {
      const d = new Date(2024, 0, 15);
      expect(adapter.deserialize(d)).toBe(d);
    });

    it('returns null when given null', () => {
      expect(adapter.deserialize(null)).toBeNull();
    });

    it('deserializes ISO string with time component', () => {
      const result = adapter.deserialize('2024-06-15T10:30:00Z');
      expect(result).not.toBeNull();
      expect(adapter.isValid(result!)).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // isDateInstance / isValid / invalid
  // -----------------------------------------------------------------------

  describe('isDateInstance', () => {
    it('returns true for a Date', () => {
      expect(adapter.isDateInstance(new Date())).toBe(true);
    });

    it('returns false for a string', () => {
      expect(adapter.isDateInstance('2024-01-01')).toBe(false);
    });

    it('returns false for a number', () => {
      expect(adapter.isDateInstance(123456)).toBe(false);
    });
  });

  describe('isValid', () => {
    it('returns true for a valid Date', () => {
      expect(adapter.isValid(new Date(2024, 0, 15))).toBe(true);
    });

    it('returns false for an invalid Date', () => {
      expect(adapter.isValid(new Date(NaN))).toBe(false);
    });
  });

  describe('invalid', () => {
    it('returns a Date that isValid returns false for', () => {
      expect(adapter.isValid(adapter.invalid())).toBe(false);
    });
  });

  describe('createDate guard branches', () => {
    it('throws when month is out of range (< 0)', () => {
      expect(() => adapter.createDate(2024, -1, 1)).toThrow();
    });

    it('throws when month is out of range (> 11)', () => {
      expect(() => adapter.createDate(2024, 12, 1)).toThrow();
    });

    it('throws when date is < 1', () => {
      expect(() => adapter.createDate(2024, 0, 0)).toThrow();
    });

    it('throws when date overflows the month', () => {
      // Feb 31 overflows; month would be March
      expect(() => adapter.createDate(2024, 1, 31)).toThrow();
    });
  });

  describe('deserialize guard branches', () => {
    it('returns null for a non-ISO string', () => {
      // A non-ISO-8601 string should fail the regex and return null/invalid
      const result = adapter.deserialize('not-a-date');
      expect(adapter.isValid(result as Date)).toBe(false);
    });
  });
});
