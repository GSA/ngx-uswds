import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UsaSidenavModule } from './sidenav.module';
import { SidenavModel } from './sidenav.model';
import { UsaNavigationMode } from '../util/navigation';
import { RouterTestingModule } from '@angular/router/testing';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeLinks(count: number): SidenavModel[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `link-${i}`,
    text: `Link ${i}`,
    mode: UsaNavigationMode.EVENT,
  }));
}

function makeLabelWithChildren(): SidenavModel[] {
  return [
    {
      id: 'label-1',
      text: 'Label 1',
      mode: UsaNavigationMode.LABEL,
      children: [
        { id: 'child-1', text: 'Child 1', mode: UsaNavigationMode.EVENT },
        { id: 'child-2', text: 'Child 2', mode: UsaNavigationMode.EVENT },
      ],
    },
    {
      id: 'label-2',
      text: 'Label 2',
      mode: UsaNavigationMode.LABEL,
      children: [{ id: 'child-3', text: 'Child 3', mode: UsaNavigationMode.EVENT }],
    },
  ];
}

// ---------------------------------------------------------------------------
// Host component
// ---------------------------------------------------------------------------

@Component({
  standalone: false,
  template: `
    <usa-sidenav
      [sidenavContent]="items"
      [expandType]="expandType"
      [autoCollapseLabels]="autoCollapseLabels"
      [enableLabelCollapse]="enableLabelCollapse"
      [selectFirstLabelChild]="selectFirstLabelChild"
      (sidenavClicked)="onClicked($event)"
    ></usa-sidenav>
  `,
})
class HostComponent {
  items: SidenavModel[] = makeLinks(3);
  expandType: 'single' | 'multiple' | undefined = undefined;
  autoCollapseLabels = true;
  enableLabelCollapse = false;
  selectFirstLabelChild = false;
  lastClicked: SidenavModel | null = null;
  onClicked(item: SidenavModel) {
    this.lastClicked = item;
  }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('UsaSidenavComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [UsaSidenavModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  // --- Construction & rendering ---

  it('should create the sidenav component', () => {
    const el = fixture.debugElement.query(By.css('usa-sidenav'));
    expect(el).toBeTruthy();
  });

  it('renders the correct number of top-level items', () => {
    const items = fixture.debugElement.queryAll(By.css('ul.usa-sidenav > li.usa-sidenav__item'));
    expect(items.length).toBe(3);
  });

  // --- Click & selection ---

  it('emits sidenavClicked when an item is clicked', () => {
    const sidenavComp = fixture.debugElement.query(By.css('usa-sidenav')).componentInstance;
    const target = host.items[0];
    sidenavComp.onSidenavItemClicked(target);
    expect(host.lastClicked).toBe(target);
  });

  it('marks clicked item as selected', () => {
    const sidenavComp = fixture.debugElement.query(By.css('usa-sidenav')).componentInstance;
    const target = host.items[1];
    sidenavComp.onSidenavItemClicked(target);
    expect(target.selected).toBe(true);
  });

  it('deselects previously selected item on new click', () => {
    const sidenavComp = fixture.debugElement.query(By.css('usa-sidenav')).componentInstance;
    sidenavComp.onSidenavItemClicked(host.items[0]);
    sidenavComp.onSidenavItemClicked(host.items[1]);
    expect(host.items[0].selected).toBe(false);
    expect(host.items[1].selected).toBe(true);
  });

  // --- expandType: 'single' ---

  it('collapses non-selected items when expandType is single', () => {
    host.items = makeLabelWithChildren();
    host.expandType = 'single';
    fixture.detectChanges();

    const sidenavComp = fixture.debugElement.query(By.css('usa-sidenav')).componentInstance;
    sidenavComp.onSidenavItemClicked(host.items[0].children![0]);
    fixture.detectChanges();

    // label-2 (not in the selected path) should be collapsed
    expect(host.items[1].collapsed).toBe(true);
  });

  it('expands selected branch when expandType is single', () => {
    host.items = makeLabelWithChildren();
    host.expandType = 'single';
    fixture.detectChanges();

    const sidenavComp = fixture.debugElement.query(By.css('usa-sidenav')).componentInstance;
    sidenavComp.onSidenavItemClicked(host.items[0].children![0]);
    fixture.detectChanges();

    expect(host.items[0].collapsed).toBe(false);
  });

  // --- expandType: 'multiple' ---

  it('leaves other branches expanded when expandType is multiple', () => {
    host.items = makeLabelWithChildren();
    host.expandType = 'multiple';
    fixture.detectChanges();

    const sidenavComp = fixture.debugElement.query(By.css('usa-sidenav')).componentInstance;
    // expand first label manually
    host.items[0].collapsed = false;
    // click a child of label-2
    sidenavComp.onSidenavItemClicked(host.items[1].children![0]);
    fixture.detectChanges();

    // label-1 should remain at whatever collapsed state it was in
    expect(host.items[0].collapsed).toBe(false);
  });

  // --- enableLabelCollapse ---

  it('does not collapse LABEL items when enableLabelCollapse is false', () => {
    host.items = makeLabelWithChildren();
    host.expandType = 'multiple';
    host.enableLabelCollapse = false;
    fixture.detectChanges();

    const sidenavComp = fixture.debugElement.query(By.css('usa-sidenav')).componentInstance;
    const label = host.items[0];
    const beforeCollapsed = label.collapsed;
    sidenavComp.onSidenavItemClicked(label);
    fixture.detectChanges();
    // collapsed state should not have toggled
    expect(label.collapsed).toBe(beforeCollapsed);
  });

  it('collapses LABEL items when enableLabelCollapse is true', () => {
    host.items = makeLabelWithChildren();
    host.expandType = 'multiple';
    host.enableLabelCollapse = true;
    fixture.detectChanges();

    const sidenavComp = fixture.debugElement.query(By.css('usa-sidenav')).componentInstance;
    const label = host.items[0];
    label.collapsed = false; // start expanded
    sidenavComp.onSidenavItemClicked(label);
    fixture.detectChanges();
    expect(label.collapsed).toBe(true);
  });

  // --- expandAll / collapseAll ---

  it('expandAll expands all children when expandType is multiple', () => {
    host.items = makeLabelWithChildren();
    host.expandType = 'multiple';
    fixture.detectChanges();

    const sidenavComp = fixture.debugElement.query(By.css('usa-sidenav')).componentInstance;
    sidenavComp.expandAll();
    host.items.forEach((item) => {
      if (item.children) {
        expect(item.collapsed).toBe(false);
      }
    });
  });

  it('expandAll does nothing when expandType is not multiple', () => {
    host.items = makeLabelWithChildren();
    host.expandType = 'single';
    fixture.detectChanges();

    const sidenavComp = fixture.debugElement.query(By.css('usa-sidenav')).componentInstance;
    // host.items was just set above, but the fixture was already created with the original
    // makeLinks(3) items, so ngOnInit already ran. Record the current collapsed state.
    const collapsedBefore = host.items[0].collapsed;
    sidenavComp.expandAll();
    expect(host.items[0].collapsed).toBe(collapsedBefore);
  });

  it('collapseAll collapses all items', () => {
    host.items = makeLabelWithChildren();
    host.expandType = 'multiple';
    fixture.detectChanges();

    const sidenavComp = fixture.debugElement.query(By.css('usa-sidenav')).componentInstance;
    sidenavComp.expandAll();
    sidenavComp.collapseAll();
    host.items.forEach((item) => {
      if (item.children) {
        expect(item.collapsed).toBe(true);
      }
    });
  });

  // --- urlBuilder ---

  it('urlBuilder returns the path when no queryParams', () => {
    const sidenavComp = fixture.debugElement.query(By.css('usa-sidenav')).componentInstance;
    const item: SidenavModel = { id: 'x', text: 'X', path: '/home' };
    expect(sidenavComp.urlBuilder(item)).toBe('/home');
  });

  it('urlBuilder appends query params', () => {
    const sidenavComp = fixture.debugElement.query(By.css('usa-sidenav')).componentInstance;
    const item: SidenavModel = { id: 'x', text: 'X', path: '/search', queryParams: { q: 'hello', page: '1' } };
    const url = sidenavComp.urlBuilder(item);
    expect(url).toContain('/search?');
    expect(url).toContain('q=hello');
    expect(url).toContain('page=1');
  });

  it('urlBuilder appends params with & when path already has ?', () => {
    const sidenavComp = fixture.debugElement.query(By.css('usa-sidenav')).componentInstance;
    const item: SidenavModel = { id: 'x', text: 'X', path: '/search?existing=1', queryParams: { q: 'test' } };
    const url = sidenavComp.urlBuilder(item);
    expect(url).toContain('&q=test');
  });

  it('urlBuilder handles path ending with ? correctly', () => {
    const sidenavComp = fixture.debugElement.query(By.css('usa-sidenav')).componentInstance;
    const item: SidenavModel = { id: 'x', text: 'X', path: '/search?', queryParams: { q: 'test' } };
    const url = sidenavComp.urlBuilder(item);
    expect(url).toContain('/search?q=test');
  });

  // --- ngOnInit with expandType ---

  it('sets collapsed=true on non-label items when expandType is provided', () => {
    const items: SidenavModel[] = [
      {
        id: 'a',
        text: 'A',
        mode: UsaNavigationMode.EVENT,
        children: [{ id: 'a1', text: 'A1', mode: UsaNavigationMode.EVENT }],
      },
    ];
    // A fresh fixture ensures ngOnInit fires with expandType set from the start.
    const f2 = TestBed.createComponent(HostComponent);
    f2.componentInstance.items = items;
    f2.componentInstance.expandType = 'single';
    f2.detectChanges();
    expect(items[0].collapsed).toBe(true);
  });

  it('respects pre-set collapsed value on items', () => {
    const items: SidenavModel[] = [{ id: 'a', text: 'A', mode: UsaNavigationMode.EVENT, collapsed: false }];
    const f2 = TestBed.createComponent(HostComponent);
    f2.componentInstance.items = items;
    f2.componentInstance.expandType = 'single';
    f2.detectChanges();
    expect(items[0].collapsed).toBe(false);
  });
});
