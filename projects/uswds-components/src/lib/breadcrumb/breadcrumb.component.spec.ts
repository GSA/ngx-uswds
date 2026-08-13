import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UsaBreadcrumbModule } from './breadcrumb.module';
import { UsaNavigationLink, UsaNavigationMode } from '../util/navigation';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeItems(count: number): UsaNavigationLink[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i}`,
    text: `Item ${i}`,
    mode: UsaNavigationMode.EVENT,
  }));
}

// ---------------------------------------------------------------------------
// Host components
// ---------------------------------------------------------------------------

@Component({
  standalone: false,
  template: `
    <usa-breadcrumb
      [items]="items"
      [wrap]="wrap"
      [hideSingleCrumb]="hideSingleCrumb"
      (selected)="onSelected($event)"
    ></usa-breadcrumb>
  `,
})
class HostComponent {
  items: UsaNavigationLink[] = makeItems(3);
  wrap = false;
  hideSingleCrumb = false;
  lastSelected: UsaNavigationLink | null = null;
  onSelected(item: UsaNavigationLink) {
    this.lastSelected = item;
  }
}

@Component({
  standalone: false,
  template: `
    <usa-breadcrumb [items]="items">
      <a *usaBreadcrumbLinkTemplate="let bc" class="custom-link" href="#">{{ bc.text }}</a>
    </usa-breadcrumb>
  `,
})
class CustomTemplateHostComponent {
  items: UsaNavigationLink[] = makeItems(3);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('UsaBreadcrumbComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, CustomTemplateHostComponent],
      imports: [UsaBreadcrumbModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the breadcrumb component', () => {
    const bc = fixture.debugElement.query(By.css('usa-breadcrumb'));
    expect(bc).toBeTruthy();
  });

  it('renders the nav element when items are provided', () => {
    const nav = fixture.debugElement.query(By.css('nav.usa-breadcrumb'));
    expect(nav).toBeTruthy();
  });

  it('hides the nav when items array is empty', () => {
    host.items = [];
    fixture.detectChanges();
    const nav = fixture.debugElement.query(By.css('nav.usa-breadcrumb'));
    expect(nav).toBeNull();
  });

  it('hides the nav when items is null', () => {
    host.items = null as any;
    fixture.detectChanges();
    const nav = fixture.debugElement.query(By.css('nav.usa-breadcrumb'));
    expect(nav).toBeNull();
  });

  it('auto-selects the last item when none is pre-selected', () => {
    const items = makeItems(3);
    host.items = items;
    fixture.detectChanges();
    expect(items[2].selected).toBe(true);
  });

  it('respects a pre-selected item in the middle', () => {
    const items = makeItems(4);
    items[1].selected = true;
    host.items = items;
    fixture.detectChanges();
    const currentEl = fixture.debugElement.query(By.css('.usa-current span'));
    expect(currentEl.nativeElement.textContent.trim()).toBe('Item 1');
  });

  it('renders the correct number of breadcrumb list items (including current)', () => {
    // 3 items → 2 displayed crumbs + 1 current = 3 total list items
    const listItems = fixture.debugElement.queryAll(By.css('.usa-breadcrumb__list-item'));
    expect(listItems.length).toBe(3);
  });

  it('adds usa-breadcrumb--wrap class when wrap is true', () => {
    host.wrap = true;
    fixture.detectChanges();
    const nav = fixture.debugElement.query(By.css('nav.usa-breadcrumb'));
    expect(nav.nativeElement.classList).toContain('usa-breadcrumb--wrap');
  });

  it('does not add wrap class when wrap is false', () => {
    const nav = fixture.debugElement.query(By.css('nav.usa-breadcrumb'));
    expect(nav.nativeElement.classList).not.toContain('usa-breadcrumb--wrap');
  });

  it('hides breadcrumb when hideSingleCrumb is true and only one item', () => {
    host.items = makeItems(1);
    host.hideSingleCrumb = true;
    fixture.detectChanges();
    const nav = fixture.debugElement.query(By.css('nav.usa-breadcrumb'));
    expect(nav).toBeNull();
  });

  it('shows breadcrumb when hideSingleCrumb is true but multiple items', () => {
    host.hideSingleCrumb = true;
    fixture.detectChanges();
    const nav = fixture.debugElement.query(By.css('nav.usa-breadcrumb'));
    expect(nav).toBeTruthy();
  });

  it('emits selected event when updateSelectedBreadcrumb is called', () => {
    const bcDe = fixture.debugElement.query(By.css('usa-breadcrumb'));
    const bcComp = bcDe.componentInstance;
    // _selectedBreadcrumb is the last item; click on the first displayed crumb
    const target = host.items[0];
    bcComp._selectedBreadcrumb = host.items[2];
    bcComp.updateSelectedBreadcrumb(target);
    fixture.detectChanges();
    expect(host.lastSelected).toBe(target);
  });

  it('ngOnChanges updates crumbs when items change', () => {
    const newItems = makeItems(5);
    host.items = newItems;
    fixture.detectChanges();
    const listItems = fixture.debugElement.queryAll(By.css('.usa-breadcrumb__list-item'));
    // 4 displayed + 1 current = 5
    expect(listItems.length).toBe(5);
  });

  it('ngOnChanges updates crumbs when hideSingleCrumb changes', () => {
    host.items = makeItems(1);
    fixture.detectChanges();
    // Currently showing (hideSingleCrumb false)
    expect(fixture.debugElement.query(By.css('nav.usa-breadcrumb'))).toBeTruthy();

    host.hideSingleCrumb = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('nav.usa-breadcrumb'))).toBeNull();
  });

  it('renders custom link template when provided', () => {
    const customFixture = TestBed.createComponent(CustomTemplateHostComponent);
    customFixture.detectChanges();
    const customLinks = customFixture.debugElement.queryAll(By.css('a.custom-link'));
    // 3 items → 2 non-current displayed crumbs get the template
    expect(customLinks.length).toBe(2);
  });
});
