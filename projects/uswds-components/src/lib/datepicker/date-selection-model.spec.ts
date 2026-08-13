import { NativeDateAdapter } from './dateadapter/native-date-adapter';
import {
  DateRange,
  UsaSingleDateSelectionModel,
  UsaRangeDateSelectionModel,
  USA_SINGLE_DATE_SELECTION_MODEL_FACTORY,
  USA_RANGE_DATE_SELECTION_MODEL_FACTORY,
} from './date-selection-model';

function makeAdapter(): NativeDateAdapter {
  return new NativeDateAdapter('en-US');
}

describe('DateRange', () => {
  it('stores start and end', () => {
    const start = new Date(2024, 0, 1);
    const end = new Date(2024, 0, 31);
    const range = new DateRange(start, end);
    expect(range.start).toBe(start);
    expect(range.end).toBe(end);
  });

  it('allows null start and end', () => {
    const range = new DateRange<Date>(null, null);
    expect(range.start).toBeNull();
    expect(range.end).toBeNull();
  });
});

describe('UsaSingleDateSelectionModel', () => {
  let adapter: NativeDateAdapter;
  let model: UsaSingleDateSelectionModel<Date>;

  beforeEach(() => {
    adapter = makeAdapter();
    model = new UsaSingleDateSelectionModel<Date>(adapter);
  });

  it('starts with null selection', () => {
    expect(model.selection).toBeNull();
  });

  describe('add', () => {
    it('sets the selection to the given date', () => {
      const d = new Date(2024, 0, 15);
      model.add(d);
      expect(model.selection).toBe(d);
    });

    it('replaces a previous selection', () => {
      model.add(new Date(2024, 0, 1));
      const d2 = new Date(2024, 5, 15);
      model.add(d2);
      expect(model.selection).toBe(d2);
    });

    it('accepts null to clear selection', () => {
      model.add(new Date(2024, 0, 1));
      model.add(null);
      expect(model.selection).toBeNull();
    });
  });

  describe('isValid', () => {
    it('returns false when selection is null', () => {
      expect(model.isValid()).toBe(false);
    });

    it('returns true when selection is a valid date', () => {
      model.add(new Date(2024, 0, 15));
      expect(model.isValid()).toBe(true);
    });

    it('returns false for an invalid date', () => {
      model.add(new Date(NaN));
      expect(model.isValid()).toBe(false);
    });
  });

  describe('isComplete', () => {
    it('returns false when selection is null', () => {
      expect(model.isComplete()).toBe(false);
    });

    it('returns true when a date is set', () => {
      model.add(new Date(2024, 0, 15));
      expect(model.isComplete()).toBe(true);
    });
  });

  describe('clone', () => {
    it('returns a new model with the same selection', () => {
      const d = new Date(2024, 0, 15);
      model.add(d);
      const clone = model.clone();
      expect(clone).not.toBe(model);
      expect(adapter.sameDate(clone.selection, d)).toBe(true);
    });
  });

  describe('updateSelection / selectionChanged', () => {
    it('emits on selectionChanged when updated', () => {
      let emitted = false;
      model.selectionChanged.subscribe(() => (emitted = true));
      model.updateSelection(new Date(2024, 0, 15), {});
      expect(emitted).toBe(true);
    });

    it('emits the new selection and source', () => {
      const d = new Date(2024, 0, 15);
      const source = {};
      let change: any;
      model.selectionChanged.subscribe((c) => (change = c));
      model.updateSelection(d, source);
      expect(adapter.sameDate(change.selection, d)).toBe(true);
      expect(change.source).toBe(source);
    });
  });

  describe('ngOnDestroy', () => {
    it('completes the selectionChanged subject', () => {
      let completed = false;
      model.selectionChanged.subscribe({ complete: () => (completed = true) });
      model.ngOnDestroy();
      expect(completed).toBe(true);
    });
  });
});

describe('UsaRangeDateSelectionModel', () => {
  let adapter: NativeDateAdapter;
  let model: UsaRangeDateSelectionModel<Date>;

  beforeEach(() => {
    adapter = makeAdapter();
    model = new UsaRangeDateSelectionModel<Date>(adapter);
  });

  it('starts with an empty range', () => {
    expect(model.selection.start).toBeNull();
    expect(model.selection.end).toBeNull();
  });

  describe('add', () => {
    it('sets start when both are null', () => {
      const d = new Date(2024, 0, 1);
      model.add(d);
      expect(adapter.sameDate(model.selection.start, d)).toBe(true);
      expect(model.selection.end).toBeNull();
    });

    it('sets end when start is set and end is null', () => {
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 0, 15);
      model.add(start);
      model.add(end);
      expect(adapter.sameDate(model.selection.end, end)).toBe(true);
    });

    it('resets to new start when both are already set', () => {
      model.add(new Date(2024, 0, 1));
      model.add(new Date(2024, 0, 15));
      const newStart = new Date(2024, 5, 1);
      model.add(newStart);
      expect(adapter.sameDate(model.selection.start, newStart)).toBe(true);
      expect(model.selection.end).toBeNull();
    });
  });

  describe('isValid', () => {
    it('returns true for an empty range', () => {
      expect(model.isValid()).toBe(true);
    });

    it('returns true for a complete valid range', () => {
      model.add(new Date(2024, 0, 1));
      model.add(new Date(2024, 0, 15));
      expect(model.isValid()).toBe(true);
    });

    it('returns false when start is after end', () => {
      model.updateSelection(new DateRange(new Date(2024, 0, 15), new Date(2024, 0, 1)), {});
      expect(model.isValid()).toBe(false);
    });

    it('returns true for a partial range with valid start', () => {
      model.add(new Date(2024, 0, 1));
      expect(model.isValid()).toBe(true);
    });
  });

  describe('isComplete', () => {
    it('returns false when range is empty', () => {
      expect(model.isComplete()).toBe(false);
    });

    it('returns false when only start is set', () => {
      model.add(new Date(2024, 0, 1));
      expect(model.isComplete()).toBe(false);
    });

    it('returns true when both start and end are set', () => {
      model.add(new Date(2024, 0, 1));
      model.add(new Date(2024, 0, 15));
      expect(model.isComplete()).toBe(true);
    });
  });

  describe('clone', () => {
    it('returns a new model with the same range', () => {
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 0, 15);
      model.add(start);
      model.add(end);
      const clone = model.clone();
      expect(clone).not.toBe(model);
      expect(adapter.sameDate(clone.selection.start, start)).toBe(true);
      expect(adapter.sameDate(clone.selection.end, end)).toBe(true);
    });
  });
});

describe('USA_SINGLE_DATE_SELECTION_MODEL_FACTORY', () => {
  it('returns the parent when parent is truthy', () => {
    const adapter = makeAdapter();
    const parent = new UsaSingleDateSelectionModel(adapter);
    const result = USA_SINGLE_DATE_SELECTION_MODEL_FACTORY(parent, adapter);
    expect(result).toBe(parent);
  });

  it('creates a new model when parent is falsy', () => {
    const adapter = makeAdapter();
    const result = USA_SINGLE_DATE_SELECTION_MODEL_FACTORY(null as any, adapter);
    expect(result).toBeInstanceOf(UsaSingleDateSelectionModel);
  });
});

describe('USA_RANGE_DATE_SELECTION_MODEL_FACTORY', () => {
  it('returns the parent when parent is truthy', () => {
    const adapter = makeAdapter();
    const parent = new UsaSingleDateSelectionModel(adapter);
    const result = USA_RANGE_DATE_SELECTION_MODEL_FACTORY(parent, adapter);
    expect(result).toBe(parent);
  });

  it('creates a new range model when parent is falsy', () => {
    const adapter = makeAdapter();
    const result = USA_RANGE_DATE_SELECTION_MODEL_FACTORY(null as any, adapter);
    expect(result).toBeInstanceOf(UsaRangeDateSelectionModel);
  });
});
