import { NativeDateAdapter } from './dateadapter/native-date-adapter';
import {
  DefaultUsaCalendarRangeStrategy,
  USA_CALENDAR_RANGE_STRATEGY_PROVIDER_FACTORY,
} from './date-range-selection-strategy';
import { DateRange } from './date-selection-model';

function makeAdapter(): NativeDateAdapter {
  return new NativeDateAdapter('en-US');
}

describe('DefaultUsaCalendarRangeStrategy', () => {
  let adapter: NativeDateAdapter;
  let strategy: DefaultUsaCalendarRangeStrategy<Date>;

  beforeEach(() => {
    adapter = makeAdapter();
    strategy = new DefaultUsaCalendarRangeStrategy(adapter);
  });

  // -----------------------------------------------------------------------
  // selectionFinished
  // -----------------------------------------------------------------------

  describe('selectionFinished', () => {
    it('sets start when both start and end are null', () => {
      const d = new Date(2024, 0, 10);
      const range = strategy.selectionFinished(d, new DateRange<Date>(null, null));
      expect(adapter.sameDate(range.start, d)).toBe(true);
      expect(range.end).toBeNull();
    });

    it('sets end when start is set and date >= start', () => {
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 0, 15);
      const range = strategy.selectionFinished(end, new DateRange(start, null));
      expect(adapter.sameDate(range.start, start)).toBe(true);
      expect(adapter.sameDate(range.end!, end)).toBe(true);
    });

    it('resets to new start when date < start (end would be before start)', () => {
      const start = new Date(2024, 0, 15);
      const earlier = new Date(2024, 0, 5);
      const range = strategy.selectionFinished(earlier, new DateRange(start, null));
      expect(adapter.sameDate(range.start, earlier)).toBe(true);
      expect(range.end).toBeNull();
    });

    it('resets when both start and end are already set', () => {
      const newDate = new Date(2024, 5, 1);
      const range = strategy.selectionFinished(newDate, new DateRange(new Date(2024, 0, 1), new Date(2024, 0, 31)));
      expect(adapter.sameDate(range.start, newDate)).toBe(true);
      expect(range.end).toBeNull();
    });
  });

  // -----------------------------------------------------------------------
  // createPreview
  // -----------------------------------------------------------------------

  describe('createPreview', () => {
    it('returns empty range when currentRange has no start', () => {
      const preview = strategy.createPreview(new Date(2024, 0, 15), new DateRange<Date>(null, null));
      expect(preview.start).toBeNull();
      expect(preview.end).toBeNull();
    });

    it('returns empty range when currentRange already has an end', () => {
      const preview = strategy.createPreview(
        new Date(2024, 0, 20),
        new DateRange(new Date(2024, 0, 1), new Date(2024, 0, 10)),
      );
      expect(preview.start).toBeNull();
      expect(preview.end).toBeNull();
    });

    it('returns preview range from start to activeDate when start is set and end is null', () => {
      const start = new Date(2024, 0, 1);
      const active = new Date(2024, 0, 15);
      const preview = strategy.createPreview(active, new DateRange(start, null));
      expect(adapter.sameDate(preview.start, start)).toBe(true);
      expect(adapter.sameDate(preview.end!, active)).toBe(true);
    });

    it('returns empty range when activeDate is null', () => {
      const preview = strategy.createPreview(null, new DateRange(new Date(2024, 0, 1), null));
      expect(preview.start).toBeNull();
      expect(preview.end).toBeNull();
    });
  });
});

describe('USA_CALENDAR_RANGE_STRATEGY_PROVIDER_FACTORY', () => {
  it('returns the parent when truthy', () => {
    const adapter = makeAdapter();
    const parent = new DefaultUsaCalendarRangeStrategy(adapter);
    expect(USA_CALENDAR_RANGE_STRATEGY_PROVIDER_FACTORY(parent, adapter)).toBe(parent);
  });

  it('creates a new strategy when parent is falsy', () => {
    const adapter = makeAdapter();
    const result = USA_CALENDAR_RANGE_STRATEGY_PROVIDER_FACTORY(null as any, adapter);
    expect(result).toBeInstanceOf(DefaultUsaCalendarRangeStrategy);
  });
});
