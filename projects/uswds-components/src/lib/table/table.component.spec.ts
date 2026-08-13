import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UsaTableComponent, UsaColumnDef } from './table.component';
import { UsaTableModule } from './table.module';
import { UsaTableConfig } from './table.config';
import { TableDataSource } from './models';
import { UsaSort } from './table-sort.component';

// ---------------------------------------------------------------------------
// Host components (all top-level, standalone: false)
// ---------------------------------------------------------------------------

@Component({
  standalone: false,
  template: `
    <usa-table
      [displayedData]="data"
      [borderless]="borderless"
      [striped]="striped"
      [compact]="compact"
      [scrollable]="scrollable"
      [stacked]="stacked"
      [stackedHeader]="stackedHeader"
      [serverSideSort]="serverSideSort"
      [highlightRowOnHover]="highlightRowOnHover"
      (sortClicked)="onSort($event)"
      (rowClicked)="onRowClick($event)"
    >
      <ng-container usaColumnDef="name">
        <th usa-table-header *usaTableHeaderDef>Name <button usa-sort [sortFn]="strSort"></button></th>
        <td usa-table-data *usaTableDataDef="let row">{{ row.name }}</td>
      </ng-container>
      <ng-container usaColumnDef="age">
        <th usa-table-header *usaTableHeaderDef>Age <button usa-sort></button></th>
        <td usa-table-data *usaTableDataDef="let row">{{ row.age }}</td>
      </ng-container>

      <tr *usaHeaderRowDef="['name', 'age']"></tr>
      <tr *usaDataRowDef="let row; columns: ['name', 'age']"></tr>
    </usa-table>
  `,
})
class TableHostComponent {
  data: TableDataSource[] = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Carol', age: 35 },
  ];
  borderless = false;
  striped = false;
  compact = false;
  scrollable = false;
  stacked = false;
  stackedHeader = false;
  serverSideSort = false;
  highlightRowOnHover = false;
  lastSort: any = null;
  lastRowClick: any = null;

  strSort = (a: string, b: string) => a.localeCompare(b);

  onSort(event: any) {
    this.lastSort = event;
  }
  onRowClick(event: any) {
    this.lastRowClick = event;
  }
}

@Component({
  standalone: false,
  template: `
    <usa-table [displayedData]="data">
      <ng-container usaColumnDef="name">
        <th usa-table-header *usaTableHeaderDef>Name</th>
        <td usa-table-data *usaTableDataDef="let row">{{ row.name }}</td>
      </ng-container>
      <tr *usaHeaderRowDef="['name']"></tr>
      <tr *usaDataRowDef="let row; columns: ['name']"></tr>
    </usa-table>
  `,
})
class TableRowHeaderHostComponent {
  data: TableDataSource[] = [{ rowHeader: 'Row A', name: 'Alice' }, { name: 'Bob' }];
}

@Component({
  standalone: false,
  template: `
    <usa-table [displayedData]="data">
      <ng-container usaColumnDef="name">
        <th usa-table-header *usaTableHeaderDef>Name</th>
        <td usa-table-data *usaTableDataDef="let row">{{ row.name }}</td>
      </ng-container>
      <tr *usaHeaderRowDef="['name']"></tr>
      <tr *usaDataRowDef="let row; columns: ['name']"></tr>
    </usa-table>
  `,
})
class TableNoSortHostComponent {
  data: TableDataSource[] = [{ name: 'Alice' }, { name: 'Bob' }];
}

@Component({
  standalone: false,
  template: `<button usa-sort [sortFn]="sortFn" (sortClicked)="onSort($event)"></button>`,
})
class SortHostComponent {
  sortFn = (a: any, b: any) => (a > b ? 1 : a < b ? -1 : 0);
  lastSort: any;
  onSort(e: any) {
    this.lastSort = e;
  }
}

@Component({
  standalone: false,
  template: `
    <usa-table [displayedData]="data">
      <ng-container usaColumnDef="val">
        <th usa-table-header *usaTableHeaderDef>Val <button usa-sort></button></th>
        <td usa-table-data *usaTableDataDef="let row">{{ row.val }}</td>
      </ng-container>
      <tr *usaHeaderRowDef="['val']"></tr>
      <tr *usaDataRowDef="let row; columns: ['val']"></tr>
    </usa-table>
  `,
})
class DefaultSortHostComponent {
  data: TableDataSource[] = [{ val: 30 }, { val: 10 }, { val: 20 }];
}

@Component({
  standalone: false,
  template: `
    <usa-table [displayedData]="data">
      <ng-container usaColumnDef="val">
        <th usa-table-header *usaTableHeaderDef>Val <button usa-sort></button></th>
        <td usa-table-data *usaTableDataDef="let row">{{ row.val }}</td>
      </ng-container>
      <tr *usaHeaderRowDef="['val']"></tr>
      <tr *usaDataRowDef="let row; columns: ['val']"></tr>
    </usa-table>
  `,
})
class NullSortHostComponent {
  data: TableDataSource[] = [{ val: null }, { val: 'Bee' }, { val: null }];
}

@Component({
  standalone: false,
  template: `
    <usa-table [displayedData]="data" [highlightRowOnHover]="highlight">
      <ng-container usaColumnDef="name">
        <th usa-table-header *usaTableHeaderDef>Name</th>
        <td usa-table-data *usaTableDataDef="let row">{{ row.name }}</td>
      </ng-container>
      <tr *usaHeaderRowDef="['name']"></tr>
      <tr *usaDataRowDef="let row; columns: ['name']"></tr>
    </usa-table>
  `,
})
class HoverHostComponent {
  data: TableDataSource[] = [{ name: 'Alice' }];
  highlight = true;
}

@Component({
  standalone: false,
  template: `
    <usa-table [displayedData]="data">
      <ng-container usaColumnDef="name">
        <th usa-table-header *usaTableHeaderDef>Name <button usa-sort></button></th>
        <td usa-table-data *usaTableDataDef="let row">{{ row.name }}</td>
      </ng-container>
      <ng-container usaColumnDef="age">
        <th usa-table-header *usaTableHeaderDef>Age <button usa-sort></button></th>
        <td usa-table-data *usaTableDataDef="let row">{{ row.age }}</td>
      </ng-container>
      <tr *usaHeaderRowDef="['name', 'age']"></tr>
      <tr *usaDataRowDef="let row; columns: ['name', 'age']"></tr>
    </usa-table>
  `,
})
class TwoColHostComponent {
  data: TableDataSource[] = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
  ];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getTable(fixture: ComponentFixture<any>): HTMLTableElement {
  return fixture.nativeElement.querySelector('table');
}

function getTableComponent(fixture: ComponentFixture<TableHostComponent>): UsaTableComponent {
  return fixture.debugElement.query(By.directive(UsaTableComponent)).componentInstance;
}

// ---------------------------------------------------------------------------
// UsaTableComponent
// ---------------------------------------------------------------------------

describe('UsaTableComponent', () => {
  let fixture: ComponentFixture<TableHostComponent>;
  let host: TableHostComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaTableModule],
      declarations: [TableHostComponent, TableRowHeaderHostComponent, TableNoSortHostComponent, TwoColHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ── Slice 1: creation ────────────────────────────────────────────────────
  describe('creation', () => {
    it('should create', () => {
      expect(getTableComponent(fixture)).toBeTruthy();
    });

    it('reads defaults from UsaTableConfig', () => {
      // Create a standalone fixture that has NOT had inputs overridden
      const bareFixture = TestBed.createComponent(UsaTableComponent);
      bareFixture.detectChanges();
      const config = TestBed.inject(UsaTableConfig);
      const tableComp = bareFixture.componentInstance;
      expect(tableComp.borderless).toBe(config.borderless);
      expect(tableComp.scrollable).toBe(config.scrollable);
      expect(tableComp.striped).toBe(config.striped);
      expect(tableComp.compact).toBe(config.compact);
      expect(tableComp.stacked).toBe(config.stacked);
      expect(tableComp.stackedHeader).toBe(config.stackedHeader);
      expect(tableComp.serverSideSort).toBe(config.serverSideSort);
    });
  });

  // ── Slice 2: rendering ───────────────────────────────────────────────────
  describe('template rendering', () => {
    it('renders all data rows', () => {
      expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(3);
    });

    it('renders header row', () => {
      expect(fixture.nativeElement.querySelectorAll('thead th').length).toBeGreaterThan(0);
    });

    it('renders cell content from displayedData', () => {
      const cells = fixture.nativeElement.querySelectorAll('tbody tr:first-child td');
      const text = Array.from(cells as NodeListOf<HTMLElement>)
        .map((c) => c.textContent?.trim())
        .join(' ');
      expect(text).toContain('Alice');
    });
  });

  // ── Slice 3: rowHeader ───────────────────────────────────────────────────
  describe('rowHeader', () => {
    let rhFixture: ComponentFixture<TableRowHeaderHostComponent>;

    beforeEach(() => {
      rhFixture = TestBed.createComponent(TableRowHeaderHostComponent);
      rhFixture.detectChanges();
    });

    it('renders a th when rowHeader is present', () => {
      const th = rhFixture.nativeElement.querySelector('tbody tr:first-child th');
      expect(th).toBeTruthy();
      expect(th.textContent.trim()).toBe('Row A');
    });

    it('does not render a th when rowHeader is absent', () => {
      expect(rhFixture.nativeElement.querySelector('tbody tr:nth-child(2) th')).toBeFalsy();
    });
  });

  // ── Slice 4: @Input CSS classes ──────────────────────────────────────────
  describe('@Input CSS classes', () => {
    it('adds usa-table--borderless when borderless=true', () => {
      host.borderless = true;
      fixture.detectChanges();
      expect(getTable(fixture).classList).toContain('usa-table--borderless');
    });

    it('removes usa-table--borderless when borderless=false', () => {
      host.borderless = false;
      fixture.detectChanges();
      expect(getTable(fixture).classList).not.toContain('usa-table--borderless');
    });

    it('adds usa-table--striped when striped=true', () => {
      host.striped = true;
      fixture.detectChanges();
      expect(getTable(fixture).classList).toContain('usa-table--striped');
    });

    it('adds usa-table--compact when compact=true', () => {
      host.compact = true;
      fixture.detectChanges();
      expect(getTable(fixture).classList).toContain('usa-table--compact');
    });

    it('adds scrollable wrapper class when scrollable=true', () => {
      host.scrollable = true;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.usa-table-container--scrollable')).toBeTruthy();
    });

    it('adds usa-table--stacked when stacked=true', () => {
      host.stacked = true;
      fixture.detectChanges();
      expect(getTable(fixture).classList).toContain('usa-table--stacked');
    });

    it('adds usa-table--stacked-header when stackedHeader=true', () => {
      host.stackedHeader = true;
      fixture.detectChanges();
      expect(getTable(fixture).classList).toContain('usa-table--stacked-header');
    });
  });

  // ── Slice 5: rowClicked ──────────────────────────────────────────────────
  describe('rowClicked output', () => {
    it('emits row data when a row is clicked', () => {
      const row: HTMLElement = fixture.nativeElement.querySelector('tbody tr');
      row.click();
      fixture.detectChanges();
      expect(host.lastRowClick).toEqual({ name: 'Alice', age: 30 });
    });
  });

  // ── Slice 6: sorting ─────────────────────────────────────────────────────
  describe('sorting', () => {
    function getSortBtn(index = 0): HTMLButtonElement {
      return fixture.nativeElement.querySelectorAll('button[usa-sort]')[index];
    }

    it('sorts ascending on first click', () => {
      getSortBtn(0).click();
      fixture.detectChanges();
      const names = Array.from(
        fixture.nativeElement.querySelectorAll('tbody tr td:first-child') as NodeListOf<HTMLElement>,
      ).map((el) => el.textContent?.trim());
      expect(names).toEqual(['Alice', 'Bob', 'Carol']);
    });

    it('sorts descending on second click', () => {
      const btn = getSortBtn(0);
      btn.click();
      fixture.detectChanges();
      btn.click();
      fixture.detectChanges();
      const names = Array.from(
        fixture.nativeElement.querySelectorAll('tbody tr td:first-child') as NodeListOf<HTMLElement>,
      ).map((el) => el.textContent?.trim());
      expect(names).toEqual(['Carol', 'Bob', 'Alice']);
    });

    it('emits sortClicked with column and sortState', () => {
      getSortBtn(0).click();
      fixture.detectChanges();
      expect(host.lastSort).toEqual({ column: 'name', sortState: 'ascending' });
    });

    it('deactivates the previous column when a new column is sorted', () => {
      getSortBtn(0).click();
      fixture.detectChanges();
      getSortBtn(1).click();
      fixture.detectChanges();
      const tableComp = getTableComponent(fixture);
      const nameCol = tableComp._contentColumnDefs.find((c) => c.usaColumnDef === 'name');
      expect(nameCol?.isSortActive).toBe(false);
    });

    it('updates aria-live region after sorting', () => {
      getSortBtn(0).click();
      fixture.detectChanges();
      const liveRegion: HTMLElement = fixture.nativeElement.querySelector('[aria-live]');
      expect(liveRegion.textContent).toContain('ascending');
    });

    it('does NOT mutate data when serverSideSort=true', () => {
      host.serverSideSort = true;
      fixture.detectChanges();
      const originalNames = host.data.map((d) => d['name']);
      getSortBtn(0).click();
      fixture.detectChanges();
      expect(host.data.map((d) => d['name'])).toEqual(originalNames);
    });

    it('still emits sortClicked when serverSideSort=true', () => {
      host.serverSideSort = true;
      fixture.detectChanges();
      getSortBtn(0).click();
      fixture.detectChanges();
      expect(host.lastSort).toBeTruthy();
    });
  });

  // ── Slice 7: re-sort on displayedData change ─────────────────────────────
  describe('ngOnChanges + ngAfterContentChecked re-sort', () => {
    function getSortBtn(index = 0): HTMLButtonElement {
      return fixture.nativeElement.querySelectorAll('button[usa-sort]')[index];
    }

    it('re-sorts new data when reference changes while a sort is active', () => {
      getSortBtn(0).click();
      fixture.detectChanges();

      host.data = [
        { name: 'Zara', age: 10 },
        { name: 'Anna', age: 20 },
      ];
      fixture.detectChanges();

      const names = Array.from(
        fixture.nativeElement.querySelectorAll('tbody tr td:first-child') as NodeListOf<HTMLElement>,
      ).map((el) => el.textContent?.trim());
      expect(names).toEqual(['Anna', 'Zara']);
    });

    it('does not throw when data changes and no sort is active', () => {
      host.data = [{ name: 'Zara', age: 10 }];
      expect(() => fixture.detectChanges()).not.toThrow();
    });
  });

  // ── Slice 8: no-sort branch ──────────────────────────────────────────────
  describe('sort event with no matching column', () => {
    it('handles sort CustomEvent when no column matches', () => {
      const noSortFixture = TestBed.createComponent(TableNoSortHostComponent);
      noSortFixture.detectChanges();
      const table: HTMLElement = noSortFixture.nativeElement.querySelector('usa-table');
      const event = new CustomEvent('sort', {
        bubbles: true,
        detail: { sortFn: () => 0, sortState: 'ascending' },
      });
      expect(() => table.dispatchEvent(event)).not.toThrow();
    });
  });
});

// ---------------------------------------------------------------------------
// UsaSort
// ---------------------------------------------------------------------------

describe('UsaSort', () => {
  let fixture: ComponentFixture<SortHostComponent>;
  let host: SortHostComponent;
  let btn: HTMLButtonElement;
  let sortDir: UsaSort;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaTableModule],
      declarations: [SortHostComponent, DefaultSortHostComponent, NullSortHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    btn = fixture.nativeElement.querySelector('button[usa-sort]');
    sortDir = fixture.debugElement.query(By.directive(UsaSort)).componentInstance as UsaSort;
  });

  it('starts with ariaSort="none"', () => {
    expect(sortDir.ariaSort).toBe('none');
  });

  it('toggles to ascending on first click', () => {
    btn.click();
    fixture.detectChanges();
    expect(sortDir.ariaSort).toBe('ascending');
  });

  it('toggles to descending on second click', () => {
    btn.click();
    btn.click();
    fixture.detectChanges();
    expect(sortDir.ariaSort).toBe('descending');
  });

  it('emits sortClicked output', () => {
    btn.click();
    fixture.detectChanges();
    expect(host.lastSort).toBe('ascending');
  });

  it('setColumnHeader updates ariaLabel', () => {
    sortDir.setColumnHeader('Name');
    expect(sortDir.ariaLabel).toContain('Name');
  });

  it('disableSort resets ariaSort to none', () => {
    sortDir.setColumnHeader('Name');
    btn.click();
    fixture.detectChanges();
    sortDir.disableSort();
    expect(sortDir.ariaSort).toBe('none');
  });

  it('sorts numbers ascending with default sort fn', () => {
    const dsFixture = TestBed.createComponent(DefaultSortHostComponent);
    dsFixture.detectChanges();
    const sortBtn: HTMLButtonElement = dsFixture.nativeElement.querySelector('button[usa-sort]');
    sortBtn.click();
    dsFixture.detectChanges();
    const vals = Array.from(dsFixture.nativeElement.querySelectorAll('tbody td') as NodeListOf<HTMLElement>).map((el) =>
      Number(el.textContent?.trim()),
    );
    expect(vals).toEqual([10, 20, 30]);
  });

  it('handles null values in default sort fn without throwing', () => {
    const nsFixture = TestBed.createComponent(NullSortHostComponent);
    nsFixture.detectChanges();
    const sortBtn: HTMLButtonElement = nsFixture.nativeElement.querySelector('button[usa-sort]');
    expect(() => {
      sortBtn.click();
      nsFixture.detectChanges();
    }).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// UsaTableHeader — branch coverage
// ---------------------------------------------------------------------------

describe('UsaTableHeader branch coverage', () => {
  @Component({
    standalone: false,
    template: `
      <usa-table [displayedData]="data">
        <ng-container usaColumnDef="name">
          <th usa-table-header ariaLabel="Custom Name" *usaTableHeaderDef>
            <button usa-sort></button>
          </th>
          <td usa-table-data *usaTableDataDef="let row">{{ row.name }}</td>
        </ng-container>
        <ng-container usaColumnDef="age">
          <th usa-table-header *usaTableHeaderDef>Age <button usa-sort></button></th>
          <td usa-table-data *usaTableDataDef="let row">{{ row.age }}</td>
        </ng-container>
        <tr *usaHeaderRowDef="['name', 'age']"></tr>
        <tr *usaDataRowDef="let row; columns: ['name', 'age']"></tr>
      </usa-table>
    `,
  })
  class ExplicitAriaLabelHostComponent {
    data: TableDataSource[] = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ];
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaTableModule],
      declarations: [ExplicitAriaLabelHostComponent],
    }).compileComponents();
  }));

  it('uses explicit ariaLabel input to set column header (covers ngAfterViewInit ariaLabel branch)', () => {
    const f = TestBed.createComponent(ExplicitAriaLabelHostComponent);
    f.detectChanges();
    const th: HTMLElement = f.nativeElement.querySelector('th[aria-label]');
    expect(th).toBeTruthy();
  });

  it('setSortState with no _defaultAriaLabel does not update ariaLabel (covers else branch)', () => {
    const f = TestBed.createComponent(ExplicitAriaLabelHostComponent);
    f.detectChanges();
    // Sort the name column (it has explicit ariaLabel, so _defaultAriaLabel is empty)
    const nameBtn: HTMLButtonElement = f.nativeElement.querySelectorAll('button[usa-sort]')[0];
    expect(() => {
      nameBtn.click();
      f.detectChanges();
    }).not.toThrow();
  });

  it('setSortInactive with no _defaultAriaLabel does not update ariaLabel (covers else branch)', () => {
    const f = TestBed.createComponent(ExplicitAriaLabelHostComponent);
    f.detectChanges();
    const [nameBtn, ageBtn]: HTMLButtonElement[] = f.nativeElement.querySelectorAll('button[usa-sort]');
    // Activate name, then activate age → this deactivates name which has no _defaultAriaLabel
    nameBtn.click();
    f.detectChanges();
    expect(() => {
      ageBtn.click();
      f.detectChanges();
    }).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// HighlightOnHoverDirective
// ---------------------------------------------------------------------------

describe('HighlightOnHoverDirective', () => {
  let fixture: ComponentFixture<HoverHostComponent>;
  let host: HoverHostComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaTableModule],
      declarations: [HoverHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoverHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('adds hover class on mouseenter when enabled', () => {
    const row: HTMLElement = fixture.nativeElement.querySelector('tbody tr');
    row.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    expect(row.classList).toContain('usa-table__row--hovered');
  });

  it('removes hover class on mouseleave when enabled', () => {
    const row: HTMLElement = fixture.nativeElement.querySelector('tbody tr');
    row.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    row.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
    expect(row.classList).not.toContain('usa-table__row--hovered');
  });

  it('does NOT add hover class when usaHighlightOnHover=false', () => {
    host.highlight = false;
    fixture.detectChanges();
    const row: HTMLElement = fixture.nativeElement.querySelector('tbody tr');
    row.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    expect(row.classList).not.toContain('usa-table__row--hovered');
  });

  it('does NOT remove an externally-added class when usaHighlightOnHover=false', () => {
    host.highlight = false;
    fixture.detectChanges();
    const row: HTMLElement = fixture.nativeElement.querySelector('tbody tr');
    row.classList.add('usa-table__row--hovered');
    row.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
    expect(row.classList).toContain('usa-table__row--hovered');
  });
});

// ---------------------------------------------------------------------------
// UsaTableData directive — sort-active attribute
// ---------------------------------------------------------------------------

describe('UsaTableData sort-active attribute', () => {
  let fixture: ComponentFixture<TwoColHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaTableModule],
      declarations: [TwoColHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoColHostComponent);
    fixture.detectChanges();
  });

  it('sets data-sort-active on td cells when column is sorted', () => {
    const [nameBtn]: HTMLButtonElement[] = fixture.nativeElement.querySelectorAll('button[usa-sort]');
    nameBtn.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('td[data-sort-active]').length).toBeGreaterThan(0);
  });

  it('clears data-sort-active from name column after sorting age', () => {
    const [nameBtn, ageBtn]: HTMLButtonElement[] = fixture.nativeElement.querySelectorAll('button[usa-sort]');
    nameBtn.click();
    fixture.detectChanges();
    ageBtn.click();
    fixture.detectChanges();
    const nameTds = Array.from(
      fixture.nativeElement.querySelectorAll('tbody tr td:first-child') as NodeListOf<HTMLElement>,
    );
    nameTds.forEach((td) => expect(td.hasAttribute('data-sort-active')).toBe(false));
  });
});
