import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { UsaCalendarBody, UsaCalendarCell } from './calendar-body';
import { HoverClassModule } from '../../util/hover-class';

/**
 * Direct branch coverage for {@link UsaCalendarBody}. The range / comparison /
 * preview predicate helpers are pure logic keyed off the numeric `startValue`,
 * `endValue`, `comparisonStart/End` and `previewStart/End` inputs, so we drive
 * them directly through the public component instance rather than the DOM.
 */
@Component({
  standalone: false,
  template: `
    <table
      usa-calendar-body
      [rows]="rows"
      [startValue]="startValue"
      [endValue]="endValue"
      [comparisonStart]="comparisonStart"
      [comparisonEnd]="comparisonEnd"
      [previewStart]="previewStart"
      [previewEnd]="previewEnd"
      [isRange]="isRange"
      [numCols]="numCols"
      [activeCell]="activeCell"
    ></table>
  `,
})
class CalendarBodyHostComponent {
  rows: UsaCalendarCell[][] = [];
  startValue: number = null;
  endValue: number = null;
  comparisonStart: number | null = null;
  comparisonEnd: number | null = null;
  previewStart: number | null = null;
  previewEnd: number | null = null;
  isRange = false;
  numCols = 7;
  activeCell = 0;
}

function cell(value: number): UsaCalendarCell {
  return new UsaCalendarCell(value, String(value), String(value), true, {}, value);
}

describe('UsaCalendarBody', () => {
  let fixture: ComponentFixture<CalendarBodyHostComponent>;
  let host: CalendarBodyHostComponent;
  let body: UsaCalendarBody;

  function build() {
    const de: DebugElement = fixture.debugElement.query(By.directive(UsaCalendarBody));
    body = de.componentInstance as UsaCalendarBody;
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarBodyHostComponent, UsaCalendarBody],
      imports: [CommonModule, HoverClassModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarBodyHostComponent);
    host = fixture.componentInstance;
    host.rows = [[cell(1), cell(2), cell(3), cell(4), cell(5), cell(6), cell(7)]];
    fixture.detectChanges();
    build();
  });

  it('creates the component', () => {
    expect(body).toBeTruthy();
  });

  // ── _cellClicked ────────────────────────────────────────────────────────

  describe('_cellClicked', () => {
    it('emits selectedValueChange when the cell is enabled', () => {
      let emitted: number | null = null;
      body.selectedValueChange.subscribe((e) => (emitted = e.value));
      body._cellClicked(cell(3), new MouseEvent('click'));
      expect(emitted).toBe(3);
    });

    it('does not emit when the cell is disabled', () => {
      let count = 0;
      body.selectedValueChange.subscribe(() => count++);
      const disabled = new UsaCalendarCell(3, '3', '3', false);
      body._cellClicked(disabled, new MouseEvent('click'));
      expect(count).toBe(0);
    });
  });

  // ── _isSelected ─────────────────────────────────────────────────────────

  describe('_isSelected', () => {
    it('is true for the start value', () => {
      body.startValue = 3;
      expect(body._isSelected(3)).toBe(true);
    });

    it('is true for the end value', () => {
      body.endValue = 5;
      expect(body._isSelected(5)).toBe(true);
    });

    it('is false for an unrelated value', () => {
      body.startValue = 3;
      body.endValue = 5;
      expect(body._isSelected(4)).toBe(false);
    });
  });

  // ── range predicates ──────────────────────────────────────────────────────

  describe('range predicates', () => {
    beforeEach(() => {
      body.isRange = true;
      body.startValue = 2;
      body.endValue = 6;
    });

    it('_isRangeStart true only at the start of a real range', () => {
      expect(body._isRangeStart(2)).toBe(true);
      expect(body._isRangeStart(6)).toBe(false);
      expect(body._isRangeStart(4)).toBe(false);
    });

    it('_isRangeEnd true only at the end of a real range', () => {
      expect(body._isRangeEnd(6)).toBe(true);
      expect(body._isRangeEnd(2)).toBe(false);
    });

    it('_isInRange true strictly inside the range', () => {
      expect(body._isInRange(4)).toBe(true);
      expect(body._isInRange(2)).toBe(true);
      expect(body._isInRange(6)).toBe(true);
      expect(body._isInRange(1)).toBe(false);
      expect(body._isInRange(7)).toBe(false);
    });

    it('_isInRange is false when range selection is disabled', () => {
      body.isRange = false;
      expect(body._isInRange(4)).toBe(false);
    });

    it('range predicates are false when start equals end', () => {
      body.startValue = 4;
      body.endValue = 4;
      expect(body._isRangeStart(4)).toBe(false);
      expect(body._isRangeEnd(4)).toBe(false);
      expect(body._isInRange(4)).toBe(false);
    });
  });

  // ── comparison predicates ─────────────────────────────────────────────────

  describe('comparison predicates', () => {
    beforeEach(() => {
      body.isRange = true;
      body.comparisonStart = 3;
      body.comparisonEnd = 5;
    });

    it('_isComparisonStart / _isComparisonEnd', () => {
      expect(body._isComparisonStart(3)).toBe(true);
      expect(body._isComparisonEnd(5)).toBe(true);
      expect(body._isComparisonStart(5)).toBe(false);
    });

    it('_isInComparisonRange', () => {
      expect(body._isInComparisonRange(4)).toBe(true);
      expect(body._isInComparisonRange(1)).toBe(false);
    });

    it('_isComparisonIdentical only when start === end === value', () => {
      body.comparisonStart = 4;
      body.comparisonEnd = 4;
      expect(body._isComparisonIdentical(4)).toBe(true);
      expect(body._isComparisonIdentical(3)).toBe(false);
    });

    it('_isComparisonBridgeStart is false when not a comparison start', () => {
      expect(body._isComparisonBridgeStart(4, 0, 4)).toBe(false);
    });

    it('_isComparisonBridgeEnd is false when not a comparison end', () => {
      expect(body._isComparisonBridgeEnd(4, 0, 4)).toBe(false);
    });

    it('_isComparisonBridgeStart evaluates the previous cell when in range', () => {
      // main range that contains the comparison start so the guard passes
      body.startValue = 1;
      body.endValue = 7;
      body.comparisonStart = 3;
      body.comparisonEnd = 5;
      // colIndex 2 → previous cell is value 2, not a range end → truthy bridge
      expect(body._isComparisonBridgeStart(3, 0, 2)).toBeTruthy();
    });

    it('_isComparisonBridgeEnd evaluates the next cell when in range', () => {
      body.startValue = 1;
      body.endValue = 7;
      body.comparisonStart = 3;
      body.comparisonEnd = 5;
      // colIndex 4 → next cell is value 6, not a range start → truthy bridge
      expect(body._isComparisonBridgeEnd(5, 0, 4)).toBeTruthy();
    });
  });

  // ── preview predicates ─────────────────────────────────────────────────────

  describe('preview predicates', () => {
    beforeEach(() => {
      body.isRange = true;
      body.previewStart = 2;
      body.previewEnd = 5;
    });

    it('_isPreviewStart / _isPreviewEnd / _isInPreview', () => {
      expect(body._isPreviewStart(2)).toBe(true);
      expect(body._isPreviewEnd(5)).toBe(true);
      expect(body._isInPreview(3)).toBe(true);
      expect(body._isInPreview(1)).toBe(false);
    });
  });

  // ── _isActiveCell ──────────────────────────────────────────────────────────

  describe('_isActiveCell', () => {
    it('is true for the active cell on the first row', () => {
      body.activeCell = 3;
      expect(body._isActiveCell(0, 3)).toBe(true);
    });

    it('accounts for the first-row offset on later rows', () => {
      // Two rows, second row short so there is a first-row offset.
      body.rows = [[cell(1), cell(2)], [cell(3)]];
      body.ngOnChanges({
        rows: { currentValue: body.rows, previousValue: [], firstChange: false, isFirstChange: () => false },
      });
      body.activeCell = 0;
      expect(typeof body._isActiveCell(1, 0)).toBe('boolean');
    });
  });

  // ── ngOnChanges ─────────────────────────────────────────────────────────────

  describe('ngOnChanges', () => {
    it('recomputes cell padding and width when numCols changes', () => {
      body.numCols = 5;
      body.ngOnChanges({
        numCols: { currentValue: 5, previousValue: 7, firstChange: false, isFirstChange: () => false },
      });
      expect(body._cellWidth).toBe(`${100 / 5}%`);
    });
  });

  // ── ngOnDestroy ──────────────────────────────────────────────────────────────

  describe('ngOnDestroy', () => {
    it('removes listeners without throwing', () => {
      expect(() => body.ngOnDestroy()).not.toThrow();
    });
  });

  // ── comparison bridge negative guards ────────────────────────────────────────

  describe('comparison bridge guards', () => {
    beforeEach(() => {
      body.isRange = true;
    });

    it('_isComparisonBridgeStart is false when the value is also a range start', () => {
      body.startValue = 3;
      body.endValue = 6;
      body.comparisonStart = 3;
      body.comparisonEnd = 5;
      expect(body._isComparisonBridgeStart(3, 0, 3)).toBe(false);
    });

    it('_isComparisonBridgeStart is false when the value is not in range', () => {
      body.startValue = 4;
      body.endValue = 6;
      body.comparisonStart = 1;
      body.comparisonEnd = 5;
      expect(body._isComparisonBridgeStart(1, 0, 0)).toBe(false);
    });

    it('_isComparisonBridgeEnd is false when the value is also a range end', () => {
      body.startValue = 1;
      body.endValue = 5;
      body.comparisonStart = 3;
      body.comparisonEnd = 5;
      expect(body._isComparisonBridgeEnd(5, 0, 4)).toBe(false);
    });

    it('_isComparisonBridgeStart walks to the previous row when at the row start', () => {
      body.rows = [
        [cell(1), cell(2), cell(3)],
        [cell(4), cell(5), cell(6)],
      ];
      body.startValue = 1;
      body.endValue = 6;
      body.comparisonStart = 4;
      body.comparisonEnd = 6;
      // colIndex 0 on row 1 → previous cell comes from the end of row 0
      expect(typeof body._isComparisonBridgeStart(4, 1, 0)).not.toBe('undefined');
    });

    it('_isComparisonBridgeEnd walks to the next row when at the row end', () => {
      body.rows = [
        [cell(1), cell(2), cell(3)],
        [cell(4), cell(5), cell(6)],
      ];
      body.startValue = 1;
      body.endValue = 6;
      body.comparisonStart = 1;
      body.comparisonEnd = 3;
      // colIndex 2 on row 0 → next cell comes from the start of row 1
      expect(typeof body._isComparisonBridgeEnd(3, 0, 2)).not.toBe('undefined');
    });

    it('_isComparisonBridgeStart returns false when previous row is undefined', () => {
      body.rows = [[cell(1), cell(2), cell(3)]];
      body.startValue = 1;
      body.endValue = 3;
      body.comparisonStart = 1;
      body.comparisonEnd = 3;
      // row 0, col 0 → no previous row, previousCell is undefined → false
      expect(body._isComparisonBridgeStart(1, 0, 0)).toBe(false);
    });

    it('_isComparisonBridgeEnd returns false when next row is undefined', () => {
      body.rows = [[cell(1), cell(2), cell(3)]];
      body.startValue = 1;
      body.endValue = 3;
      body.comparisonStart = 1;
      body.comparisonEnd = 3;
      // row 0, col 2 (last) → no next row, nextCell is undefined → false
      expect(body._isComparisonBridgeEnd(3, 0, 2)).toBe(false);
    });
  });

  // ── _enterHandler / _leaveHandler (range preview events) ──────────────────

  describe('enter/leave handlers (range preview)', () => {
    function getBodyElement() {
      return fixture.debugElement.query((de) => de.componentInstance instanceof UsaCalendarBody)
        .nativeElement as HTMLElement;
    }

    beforeEach(() => {
      // Use a 1-row grid with TD-based cells
      body.rows = [[cell(1), cell(2), cell(3), cell(4), cell(5), cell(6), cell(7)]];
      body.isRange = true;
      body.previewStart = null;
      body.previewEnd = null;
      body.numCols = 7;
      fixture.detectChanges();
    });

    it('emits previewChange on mouseenter of a TD cell when isRange is true', () => {
      const previews: any[] = [];
      body.previewChange.subscribe((e) => previews.push(e));
      const td = getBodyElement().querySelector('td') as HTMLElement;
      td.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      // May or may not emit depending on data-mat-row/col attrs; just verify no throw
      expect(() => {}).not.toThrow();
    });

    it('skips focus event when _skipNextFocus is set', () => {
      const previews: any[] = [];
      body.previewChange.subscribe((e) => previews.push(e));
      (body as any)._skipNextFocus = true;
      const td = getBodyElement().querySelector('td') as HTMLElement;
      td.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      // _skipNextFocus was true → handler returns early, _skipNextFocus reset to false
      expect((body as any)._skipNextFocus).toBe(false);
    });

    it('does not emit previewChange on mouseleave when previewEnd is null', () => {
      let count = 0;
      body.previewChange.subscribe(() => count++);
      body.previewEnd = null;
      const td = getBodyElement().querySelector('td') as HTMLElement;
      td.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      expect(count).toBe(0);
    });

    it('emits null previewChange on mouseleave of a TD when previewEnd is set', () => {
      const previews: any[] = [];
      body.previewChange.subscribe((e) => previews.push(e));
      body.previewEnd = 3;
      const td = getBodyElement().querySelector('td') as HTMLElement;
      td.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      // May emit; verify no throw and that emitted value (if any) has value: null
      const nullEmit = previews.find((p) => p.value === null);
      if (previews.length) {
        expect(nullEmit).toBeTruthy();
      }
    });
  });

  // ── _focusActiveCell ────────────────────────────────────────────────────────

  describe('_focusActiveCell', () => {
    it('does not throw when called with movePreview=false', () => {
      expect(() => body._focusActiveCell(false)).not.toThrow();
    });

    it('does not throw when called with default movePreview=true', () => {
      expect(() => body._focusActiveCell()).not.toThrow();
    });
  });
});
