import { vi } from 'vitest';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UsaComboBoxListModule } from './combo-box-list.module';
import { UsaComboboxList, UsaComboBoxItemTemplate } from './combo-box-list.component';

// Minimal items for tests
const ITEMS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

/** Stub getClientRects so jsdom doesn't throw in ngAfterViewInit. */
function stubClientRects() {
  vi.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue({
    item: () => ({ height: 0, top: 0 } as DOMRect),
    length: 1,
    [Symbol.iterator]: function* () {
      yield { height: 0, top: 0 } as DOMRect;
    },
  } as unknown as DOMRectList);
  // jsdom doesn't implement scrollIntoView
  if (!HTMLElement.prototype.scrollIntoView) {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  } else {
    vi.spyOn(HTMLElement.prototype, 'scrollIntoView').mockImplementation(() => {});
  }
}

/** Create and initialise a UsaComboboxList fixture with default test inputs. */
function createFixture(overrides: Partial<UsaComboboxList> = {}): ComponentFixture<UsaComboboxList> {
  stubClientRects();
  const f = TestBed.createComponent(UsaComboboxList);
  const c = f.componentInstance;
  c.items = ITEMS;
  c.labelField = 'label';
  c.valueField = 'value';
  c.listId = 'test-list';
  Object.assign(c, overrides);
  f.detectChanges();
  return f;
}

describe('UsaComboboxList', () => {
  let component: UsaComboboxList;
  let fixture: ComponentFixture<UsaComboboxList>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaComboBoxListModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = createFixture();
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ── Tracer bullet ────────────────────────────────────────────────────────
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ── Default inputs ───────────────────────────────────────────────────────
  it('should default virtualScroll to true', () => {
    expect(component.virtualScroll).toBe(true);
  });

  // ── trackByFn ────────────────────────────────────────────────────────────
  it('trackByFn returns the index', () => {
    expect(component.trackByFn(0)).toBe(0);
    expect(component.trackByFn(5)).toBe(5);
  });

  // ── getRenderValue ───────────────────────────────────────────────────────
  describe('getRenderValue', () => {
    it('returns the labelField property when item is an object', () => {
      expect(component.getRenderValue({ label: 'Apple', value: 'apple' })).toBe('Apple');
    });

    it('returns the item itself when it is a primitive', () => {
      expect(component.getRenderValue('plain string')).toBe('plain string');
    });
  });

  // ── Template rendering ───────────────────────────────────────────────────
  describe('template rendering', () => {
    it('renders one list item per item in the items array', () => {
      const lis = fixture.debugElement.queryAll(By.css('li'));
      expect(lis.length).toBe(ITEMS.length);
    });

    it('sets the listbox id to listId', () => {
      const ul = fixture.debugElement.query(By.css('ul'));
      expect(ul.nativeElement.id).toBe('test-list');
    });

    it('sets aria-labelledby on the listbox', () => {
      const f2 = createFixture({ ariaLabelledBy: 'my-label', listId: 'aria-list' });
      const ul = f2.debugElement.query(By.css('ul'));
      expect(ul.nativeElement.getAttribute('aria-labelledby')).toBe('my-label');
      f2.destroy();
    });

    it('assigns unique id to each list item', () => {
      const lis = fixture.debugElement.queryAll(By.css('li'));
      lis.forEach((li, i) => {
        expect(li.nativeElement.id).toBe(`test-list-${i}`);
      });
    });

    it('marks the selected item with aria-selected=true', () => {
      const f2 = createFixture({ selectedItem: ITEMS[1], listId: 'sel-list' });
      const lis = f2.debugElement.queryAll(By.css('li'));
      expect(lis[1].nativeElement.getAttribute('aria-selected')).toBe('true');
      expect(lis[0].nativeElement.getAttribute('aria-selected')).toBe('false');
      f2.destroy();
    });

    it('shows the focused/highlighted css class on the highlighted item', () => {
      component.highlightItem(0);
      fixture.detectChanges();
      const lis = fixture.debugElement.queryAll(By.css('li'));
      expect(lis[0].nativeElement.classList).toContain('usa-combo-box__list-option--focused');
    });
  });

  // ── selectItem ───────────────────────────────────────────────────────────
  describe('selectItem', () => {
    it('emits the selected item via the selected output', () => {
      const emitted: any[] = [];
      component.selected.subscribe((v) => emitted.push(v));
      component.selectItem(ITEMS[0]);
      expect(emitted).toEqual([ITEMS[0]]);
    });

    it('does not emit when item is disabled', () => {
      const emitted: any[] = [];
      component.selected.subscribe((v) => emitted.push(v));
      component.selectItem({ label: 'X', value: 'x', disabled: true });
      expect(emitted).toHaveLength(0);
    });

    it('emits when user clicks a list item', () => {
      const emitted: any[] = [];
      component.selected.subscribe((v) => emitted.push(v));
      const firstLi = fixture.debugElement.query(By.css('li'));
      firstLi.triggerEventHandler('click', null);
      expect(emitted).toEqual([ITEMS[0]]);
    });
  });

  // ── onFocus ──────────────────────────────────────────────────────────────
  describe('onFocus', () => {
    it('sets _focusedItem to the focused element', () => {
      const fakeEl = {} as HTMLDataListElement;
      component.onFocus(ITEMS[1], 1, fakeEl);
      expect(component._focusedItem).toEqual({ item: ITEMS[1], index: 1, itemHtml: fakeEl });
    });
  });

  // ── highlightItem ────────────────────────────────────────────────────────
  describe('highlightItem', () => {
    it('sets _highlightedItem for a valid index', () => {
      component.highlightItem(1);
      expect(component._highlightedItem.item).toBe(ITEMS[1]);
      expect(component._highlightedItem.index).toBe(1);
    });

    it('does nothing when index is negative', () => {
      component.highlightItem(-1);
      expect(component._highlightedItem).toBeUndefined();
    });

    it('does nothing when index is too large', () => {
      component.highlightItem(999);
      expect(component._highlightedItem).toBeUndefined();
    });
  });

  // ── focusFirstElement / focusLastElement ─────────────────────────────────
  describe('focusFirstElement / focusLastElement', () => {
    it('focusFirstElement sets _focusedItem index to 0', () => {
      component.focusFirstElement();
      expect(component._focusedItem.index).toBe(0);
    });

    it('focusLastElement sets _focusedItem index to last item', () => {
      component.focusLastElement();
      expect(component._focusedItem.index).toBe(ITEMS.length - 1);
    });
  });

  // ── focusHighlightedElement ──────────────────────────────────────────────
  describe('focusHighlightedElement', () => {
    it('focuses first element when no item is highlighted', () => {
      component._highlightedItem = undefined;
      component.focusHighlightedElement();
      expect(component._focusedItem.index).toBe(0);
    });

    it('focuses the highlighted element when one exists', () => {
      component.highlightItem(2);
      component.focusHighlightedElement();
      expect(component._focusedItem.index).toBe(2);
    });
  });

  // ── onKeyDown ────────────────────────────────────────────────────────────
  describe('onKeyDown', () => {
    function keyEvent(key: string): KeyboardEvent {
      return new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
    }

    beforeEach(() => {
      // Put focus on item 1 to give Arrow keys a context
      const lis = fixture.debugElement.queryAll(By.css('li'));
      component.onFocus(ITEMS[1], 1, lis[1].nativeElement);
    });

    it('ArrowDown moves focus to next item', () => {
      const event = keyEvent('ArrowDown');
      component.onKeyDown(event);
      expect(component._focusedItem.index).toBe(2);
    });

    it('ArrowDown does nothing on last item', () => {
      const lis = fixture.debugElement.queryAll(By.css('li'));
      component.onFocus(ITEMS[2], 2, lis[2].nativeElement);
      component.onKeyDown(keyEvent('ArrowDown'));
      expect(component._focusedItem.index).toBe(2);
    });

    it('ArrowUp moves focus to previous item', () => {
      component.onKeyDown(keyEvent('ArrowUp'));
      expect(component._focusedItem.index).toBe(0);
    });

    it('ArrowUp on first item emits focusInput', () => {
      const lis = fixture.debugElement.queryAll(By.css('li'));
      component.onFocus(ITEMS[0], 0, lis[0].nativeElement);
      const emitted: any[] = [];
      component.focusInput.subscribe(() => emitted.push(true));
      component.onKeyDown(keyEvent('ArrowUp'));
      expect(emitted).toHaveLength(1);
    });

    it('Home moves focus to first item', () => {
      component.onKeyDown(keyEvent('Home'));
      expect(component._focusedItem.index).toBe(0);
    });

    it('End moves focus to last item', () => {
      component.onKeyDown(keyEvent('End'));
      expect(component._focusedItem.index).toBe(ITEMS.length - 1);
    });

    it('PageDown moves focus forward by a page of items', () => {
      const lis = fixture.debugElement.queryAll(By.css('li'));
      component.onFocus(ITEMS[0], 0, lis[0].nativeElement);

      // Give the UL and first LI non-zero clientHeight so the PageDown branch fires
      const ul = lis[0].nativeElement.parentElement as HTMLUListElement;
      Object.defineProperty(ul, 'clientHeight', { value: 60, configurable: true });
      Object.defineProperty(lis[0].nativeElement, 'clientHeight', { value: 30, configurable: true });

      component.onKeyDown(keyEvent('PageDown'));
      // numItemsToScrollPast = ceil(60/30) = 2; newIndex = min(0+2, 2) = 2
      expect(component._focusedItem.index).toBe(2);
    });

    it('PageDown does nothing when firstElementChild has no clientHeight', () => {
      const lis = fixture.debugElement.queryAll(By.css('li'));
      component.onFocus(ITEMS[0], 0, lis[0].nativeElement);

      const ul = lis[0].nativeElement.parentElement as HTMLUListElement;
      Object.defineProperty(ul, 'clientHeight', { value: 60, configurable: true });
      Object.defineProperty(lis[0].nativeElement, 'clientHeight', { value: 0, configurable: true });

      component.onKeyDown(keyEvent('PageDown'));
      // Guard returns early — focused item unchanged
      expect(component._focusedItem.index).toBe(0);
    });

    it('PageUp moves focus backward by a page of items', () => {
      const lis = fixture.debugElement.queryAll(By.css('li'));
      component.onFocus(ITEMS[2], 2, lis[2].nativeElement);

      const ul = lis[0].nativeElement.parentElement as HTMLUListElement;
      Object.defineProperty(ul, 'clientHeight', { value: 60, configurable: true });
      Object.defineProperty(lis[0].nativeElement, 'clientHeight', { value: 30, configurable: true });

      component.onKeyDown(keyEvent('PageUp'));
      // numItemsToScrollPast = 2; newIndex = max(2-2, 0) = 0
      expect(component._focusedItem.index).toBe(0);
    });

    it('Enter selects the focused item', () => {
      const emitted: any[] = [];
      component.selected.subscribe((v) => emitted.push(v));
      component.onKeyDown(keyEvent('Enter'));
      expect(emitted).toEqual([ITEMS[1]]);
    });

    it('Tab selects the focused item', () => {
      const emitted: any[] = [];
      component.selected.subscribe((v) => emitted.push(v));
      component.onKeyDown(keyEvent('Tab'));
      expect(emitted).toEqual([ITEMS[1]]);
    });
  });

  // ── mouseover listener ─────────────────────────────────────────────────
  describe('mouseover listener', () => {
    it('updates focused item on mouseover when the element does not have focus', () => {
      const lis = fixture.debugElement.queryAll(By.css('li'));
      // Ensure active element is NOT the target li
      const li2 = lis[2].nativeElement as HTMLElement;
      li2.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      expect(component._focusedItem?.index).toBe(2);
    });

    it('does not change focused item on mouseover when element already has focus', () => {
      const lis = fixture.debugElement.queryAll(By.css('li'));
      const li0 = lis[0].nativeElement as HTMLElement;
      // Simulate activeElement === the target
      Object.defineProperty(document, 'activeElement', { value: li0, configurable: true });
      component.onFocus(ITEMS[2], 2, lis[2].nativeElement);
      li0.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      // Index stays 2 (not changed to 0)
      expect(component._focusedItem.index).toBe(2);
      // Reset
      Object.defineProperty(document, 'activeElement', { value: document.body, configurable: true });
    });
  });

  // ── setDropdownDirection ─────────────────────────────────────────────────
  describe('setDropdownDirection', () => {
    it('positions dropdown above input when direction=top and there is no room below', () => {
      // Create fixture with direction='top' - setDropdownDirection applies bottom=100%
      vi.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue({
        item: () => ({ height: 100, top: 500 } as DOMRect),
        length: 1,
        [Symbol.iterator]: function* () { yield { height: 100, top: 500 } as DOMRect; },
      } as unknown as DOMRectList);
      vi.spyOn(HTMLElement.prototype, 'scrollIntoView').mockImplementation(() => {});
      // window.innerHeight defaults to 768 in jsdom; height+top=600 < 768, so top branch:
      const f2 = TestBed.createComponent(UsaComboboxList);
      const c2 = f2.componentInstance;
      c2.items = ITEMS;
      c2.labelField = 'label';
      c2.valueField = 'value';
      c2.listId = 'dir-list';
      c2.direction = 'top';
      f2.detectChanges();
      const ul = f2.debugElement.query(By.css('ul')).nativeElement as HTMLUListElement;
      expect(ul.style.bottom).toBe('100%');
      f2.destroy();
    });

    it('positions dropdown above when bottom of dropdown exceeds viewport height', () => {
      // dropdownY = height + top >= innerHeight -> apply top style
      vi.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue({
        item: () => ({ height: 400, top: 400 } as DOMRect),
        length: 1,
        [Symbol.iterator]: function* () { yield { height: 400, top: 400 } as DOMRect; },
      } as unknown as DOMRectList);
      vi.spyOn(HTMLElement.prototype, 'scrollIntoView').mockImplementation(() => {});
      const f2 = TestBed.createComponent(UsaComboboxList);
      const c2 = f2.componentInstance;
      c2.items = ITEMS;
      c2.labelField = 'label';
      c2.valueField = 'value';
      c2.listId = 'dir-list2';
      f2.detectChanges();
      const ul = f2.debugElement.query(By.css('ul')).nativeElement as HTMLUListElement;
      // dropdownY(800) >= innerHeight(768) -> style applied
      expect(ul.style.bottom).toBe('100%');
      f2.destroy();
    });
  });

  // ── ngOnChanges ──────────────────────────────────────────────────────────
  describe('ngOnChanges', () => {
    it('re-registers event handlers when items input changes', () => {
      const newItems = [{ label: 'Dragonfruit', value: 'dragonfruit' }];
      component.items = newItems;
      component.ngOnChanges({
        items: {
          currentValue: newItems,
          previousValue: ITEMS,
          firstChange: false,
          isFirstChange: () => false,
        },
      });
      fixture.detectChanges();
      expect(component.items).toBe(newItems);
      expect(component._eventListeners).toBeDefined();
    });

    it('does nothing when items is not in changes', () => {
      const listenersBefore = component._eventListeners.length;
      component.ngOnChanges({
        selectedItem: {
          currentValue: ITEMS[0],
          previousValue: null,
          firstChange: false,
          isFirstChange: () => false,
        },
      });
      expect(component._eventListeners.length).toBe(listenersBefore);
    });
  });

  // ── ngOnDestroy ──────────────────────────────────────────────────────────
  describe('ngOnDestroy', () => {
    it('calls all registered event listener unlisteners on destroy', () => {
      let called = 0;
      component._eventListeners = [() => called++, () => called++];
      component.ngOnDestroy();
      expect(called).toBe(2);
    });
  });

  // ── virtualScroll / scrollEnd ────────────────────────────────────────────
  describe('scrollEnd output', () => {
    it('emits scrollEnd when scrolled to the bottom (virtualScroll=true)', () => {
      const emitted: any[] = [];
      component.scrollEnd.subscribe(() => emitted.push(true));

      const ul: HTMLUListElement = fixture.debugElement.query(By.css('ul')).nativeElement;
      Object.defineProperty(ul, 'offsetHeight', { value: 100, configurable: true });
      Object.defineProperty(ul, 'scrollTop', { value: 100, configurable: true });
      Object.defineProperty(ul, 'scrollHeight', { value: 200, configurable: true });

      ul.dispatchEvent(new Event('scroll'));
      expect(emitted).toHaveLength(1);
    });

    it('does not register a scroll listener when virtualScroll=false', () => {
      const fixture2 = createFixture({ virtualScroll: false, listId: 'test-list-2' });
      const comp2 = fixture2.componentInstance;

      const emitted: any[] = [];
      comp2.scrollEnd.subscribe(() => emitted.push(true));

      const ul: HTMLUListElement = fixture2.debugElement.query(By.css('ul')).nativeElement;
      Object.defineProperty(ul, 'offsetHeight', { value: 100, configurable: true });
      Object.defineProperty(ul, 'scrollTop', { value: 100, configurable: true });
      Object.defineProperty(ul, 'scrollHeight', { value: 200, configurable: true });
      ul.dispatchEvent(new Event('scroll'));

      expect(emitted).toHaveLength(0);
      fixture2.destroy();
    });
  });

  // ── selectedItem highlight on init ───────────────────────────────────────
  describe('selectedItem on init', () => {
    it('highlights the selected item when provided at init time', () => {
      const f2 = createFixture({ selectedItem: ITEMS[1], listId: 'init-list' });
      const c2 = f2.componentInstance;
      expect(c2._highlightedItem?.item).toBe(ITEMS[1]);
      f2.destroy();
    });
  });
});

// ── UsaComboBoxItemTemplate directive ────────────────────────────────────────
@Component({
  standalone: false,
  template: `<ng-template usa-combo-box-item-template let-item>{{ item.label }}</ng-template>`,
})
class TestHostComponent {
  @ViewChild(UsaComboBoxItemTemplate) itemTemplate: UsaComboBoxItemTemplate;
}

describe('UsaComboBoxItemTemplate directive', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaComboBoxListModule],
      declarations: [TestHostComponent],
    }).compileComponents();
  }));

  it('exposes the templateRef', () => {
    const f = TestBed.createComponent(TestHostComponent);
    f.detectChanges();
    expect(f.componentInstance.itemTemplate.templateRef).toBeInstanceOf(TemplateRef);
  });
});
