import { vi } from 'vitest';
import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { UsaComboBoxComponent } from './combo-box.component';
import { UsaComboboxModule } from './combo-box.module';
import { UsaComboboxList } from '../combo-box-list/combo-box-list.component';

const ITEMS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

/** Stub DOM methods jsdom doesn't implement. */
function stubDom() {
  if (!HTMLElement.prototype.scrollIntoView) {
    HTMLElement.prototype.scrollIntoView = () => {};
  }
  vi.spyOn(HTMLElement.prototype, 'scrollIntoView').mockImplementation(() => {});
  vi.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue({
    item: () => ({ height: 0, top: 0 }) as DOMRect,
    length: 1,
    [Symbol.iterator]: function* () {
      yield { height: 0, top: 0 } as DOMRect;
    },
  } as unknown as DOMRectList);
}

/** Build a fixture with items pre-set so the component is ready to interact. */
function createFixture(overrides: Partial<UsaComboBoxComponent> = {}): ComponentFixture<UsaComboBoxComponent> {
  stubDom();
  const f = TestBed.createComponent(UsaComboBoxComponent);
  const c = f.componentInstance;
  c.items = ITEMS;
  c.labelField = 'label';
  c.valueField = 'value';
  Object.assign(c, overrides);
  f.detectChanges();
  return f;
}

// ── Host component for integration-style tests ───────────────────────────────
@Component({
  standalone: false,
  template: `
    <usa-combobox
      [items]="items"
      labelField="label"
      valueField="value"
      [id]="id"
      [listId]="listId"
      [disabled]="disabled"
      [readonly]="readonly"
      [value]="value"
      [virtualScroll]="virtualScroll"
      (change)="onChange($event)"
      (selected)="onSelected($event)"
      (scrollEnd)="onScrollEnd()"
    ></usa-combobox>
  `,
})
class HostComponent {
  items = ITEMS;
  id = 'test-combo';
  listId = 'test-list';
  disabled = false;
  readonly: boolean = undefined;
  value = '';
  virtualScroll = true;
  changeEvents: any[] = [];
  selectedEvents: any[] = [];
  scrollEndEvents: any[] = [];
  onChange(v: any) {
    this.changeEvents.push(v);
  }
  onSelected(v: any) {
    this.selectedEvents.push(v);
  }
  onScrollEnd() {
    this.scrollEndEvents.push(true);
  }
}

describe('UsaComboBoxComponent', () => {
  let component: UsaComboBoxComponent;
  let fixture: ComponentFixture<UsaComboBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaComboboxModule, FormsModule],
      declarations: [HostComponent],
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
  describe('default inputs', () => {
    it('defaults value to empty string', () => {
      expect(component.value).toBe('');
    });

    it('defaults disabled to false', () => {
      expect(component.disabled).toBe(false);
    });

    it('defaults virtualScroll to true', () => {
      expect(component.virtualScroll).toBe(true);
    });

    it('defaults _displayDropdown to false', () => {
      expect(component._displayDropdown).toBe(false);
    });

    it('auto-generates an id if none provided', () => {
      expect(component.id).toMatch(/^usa-combo-box-\d+$/);
    });

    it('auto-generates a listId if none provided', () => {
      expect(component.listId).toMatch(/^usa-combo-box__list-\d+$/);
    });
  });

  // ── ControlValueAccessor ─────────────────────────────────────────────────
  describe('ControlValueAccessor', () => {
    it('writeValue sets this.value', () => {
      component.writeValue('Banana');
      expect(component.value).toBe('Banana');
    });

    it('registerOnChange stores the callback', () => {
      const spy = vi.fn();
      component.registerOnChange(spy);
      // Trigger via onValueChange which calls updateValue → _onChange
      component.value = ''; // ensure different value
      component.onValueChange('Apple');
      expect(spy).toHaveBeenCalledWith('Apple');
    });

    it('registerOnTouched stores the callback', () => {
      const spy = vi.fn();
      component.registerOnTouched(spy);
      component.onFocus();
      expect(spy).toHaveBeenCalledOnce();
    });

    it('setDisabledState sets disabled', () => {
      component.setDisabledState(true);
      expect(component.disabled).toBe(true);
      component.setDisabledState(false);
      expect(component.disabled).toBe(false);
    });
  });

  // ── onFocus ──────────────────────────────────────────────────────────────
  describe('onFocus', () => {
    it('calls _onTouched', () => {
      const spy = vi.fn();
      component.registerOnTouched(spy);
      component.onFocus();
      expect(spy).toHaveBeenCalledOnce();
    });
  });

  // ── onValueChange ────────────────────────────────────────────────────────
  describe('onValueChange', () => {
    it('updates value and opens the dropdown', () => {
      component.value = '';
      component.onValueChange('Ban');
      expect(component.value).toBe('Ban');
      expect(component._displayDropdown).toBe(true);
    });

    it('emits change event with new value', () => {
      const emitted: any[] = [];
      component.changeEvent.subscribe((v) => emitted.push(v));
      component.value = '';
      component.onValueChange('Cherry');
      expect(emitted).toEqual(['Cherry']);
    });
  });

  // ── selectItem ───────────────────────────────────────────────────────────
  describe('selectItem', () => {
    it('closes the dropdown', () => {
      component._displayDropdown = true;
      component.selectItem(ITEMS[0]);
      expect(component._displayDropdown).toBe(false);
    });

    it('sets _selectedItem to the chosen item', () => {
      component.selectItem(ITEMS[1]);
      expect(component._selectedItem).toBe(ITEMS[1]);
    });

    it('updates value to labelField of selected item', () => {
      component.value = '';
      component.selectItem(ITEMS[0]);
      expect(component.value).toBe('Apple');
    });

    it('emits the selected output', () => {
      const emitted: any[] = [];
      component.selected.subscribe((v) => emitted.push(v));
      component.selectItem(ITEMS[0]);
      expect(emitted).toHaveLength(1);
    });

    it('is a no-op when same item is selected again', () => {
      component.selectItem(ITEMS[0]);
      const changespy = vi.fn();
      component.changeEvent.subscribe(changespy);
      const selectedSpy = vi.fn();
      component.selected.subscribe(selectedSpy);
      // select same item again — selectItem returns early when _selectedItem === item
      component.selectItem(ITEMS[0]);
      expect(changespy).not.toHaveBeenCalled();
      expect(selectedSpy).not.toHaveBeenCalled();
    });
  });

  // ── clearInput ───────────────────────────────────────────────────────────
  describe('clearInput', () => {
    it('resets value to empty string', () => {
      component.value = 'Apple';
      component.clearInput();
      expect(component.value).toBe('');
    });

    it('clears _selectedItem', () => {
      component._selectedItem = ITEMS[0];
      component.clearInput();
      expect(component._selectedItem).toBeUndefined();
    });

    it('emits change with empty string', () => {
      component.value = 'Apple';
      const emitted: any[] = [];
      component.changeEvent.subscribe((v) => emitted.push(v));
      component.clearInput();
      expect(emitted).toContain('');
    });
  });

  // ── onScrollEnd ──────────────────────────────────────────────────────────
  describe('onScrollEnd', () => {
    it('emits scrollEnd output', () => {
      const emitted: any[] = [];
      component.scrollEnd.subscribe(() => emitted.push(true));
      component.onScrollEnd();
      expect(emitted).toHaveLength(1);
    });
  });

  // ── focusInput ───────────────────────────────────────────────────────────
  describe('focusInput', () => {
    it('sets _displayDropdown to false', () => {
      component._displayDropdown = true;
      component.focusInput();
      expect(component._displayDropdown).toBe(false);
    });

    it('focuses the native input element', () => {
      const focusSpy = vi.spyOn(component.comboBoxInput.nativeElement, 'focus');
      component.focusInput();
      expect(focusSpy).toHaveBeenCalled();
    });
  });

  // ── onInputKeyDown ───────────────────────────────────────────────────────
  describe('onInputKeyDown', () => {
    function keyEvent(key: string): KeyboardEvent {
      return new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
    }

    it('ArrowDown opens dropdown when it is closed', () => {
      component._displayDropdown = false;
      component.onInputKeyDown(keyEvent('ArrowDown'));
      expect(component._displayDropdown).toBe(true);
    });

    it('ArrowDown delegates to comboBoxDropdown.focusHighlightedElement when dropdown is open', fakeAsync(() => {
      // Open the dropdown so comboBoxDropdown ViewChild is rendered.
      // OnPush: must flush via the component's own ChangeDetectorRef.
      component._displayDropdown = true;
      component.cdr.detectChanges();
      tick();
      component.cdr.detectChanges();

      expect(component.comboBoxDropdown).toBeTruthy();
      const spy = vi.spyOn(component.comboBoxDropdown, 'focusHighlightedElement').mockImplementation(() => {});
      component.onInputKeyDown(keyEvent('ArrowDown'));
      expect(spy).toHaveBeenCalled();
    }));

    it('ArrowDown when dropdown already open does not toggle it closed', () => {
      component._displayDropdown = true;
      fixture.detectChanges();
      component.onInputKeyDown(keyEvent('ArrowDown'));
      expect(component._displayDropdown).toBe(true);
    });

    it('ArrowUp closes the dropdown', () => {
      component._displayDropdown = true;
      component.onInputKeyDown(keyEvent('ArrowUp'));
      expect(component._displayDropdown).toBe(false);
    });

    it('unrecognised key does nothing', () => {
      component._displayDropdown = false;
      component.onInputKeyDown(keyEvent('a'));
      expect(component._displayDropdown).toBe(false);
    });

    it('ArrowDown prevents default', () => {
      const event = keyEvent('ArrowDown');
      const spy = vi.spyOn(event, 'preventDefault');
      component.onInputKeyDown(event);
      expect(spy).toHaveBeenCalled();
    });

    it('ArrowUp prevents default', () => {
      const event = keyEvent('ArrowUp');
      const spy = vi.spyOn(event, 'preventDefault');
      component.onInputKeyDown(event);
      expect(spy).toHaveBeenCalled();
    });

    it('handles legacy keyCode for ArrowDown (40)', () => {
      // Use a plain object cast so keyCode is guaranteed — jsdom does not
      // reliably propagate keyCode through the KeyboardEvent constructor.
      const event = { keyCode: 40, key: '', preventDefault: () => {} } as unknown as KeyboardEvent;
      component._displayDropdown = false;
      component.onInputKeyDown(event);
      expect(component._displayDropdown).toBe(true);
    });

    it('handles legacy keyCode for ArrowUp (38)', () => {
      const event = { keyCode: 38, key: '', preventDefault: () => {} } as unknown as KeyboardEvent;
      component._displayDropdown = true;
      component.onInputKeyDown(event);
      expect(component._displayDropdown).toBe(false);
    });
  });

  // ── onDocumentClick ──────────────────────────────────────────────────────
  describe('onDocumentClick', () => {
    it('does nothing when click is inside the component', () => {
      component._displayDropdown = true;
      const internalEvent = { target: component.el.nativeElement } as unknown as MouseEvent;
      component.onDocumentClick(internalEvent);
      expect(component._displayDropdown).toBe(true);
    });

    it('closes dropdown on outside click', () => {
      component._displayDropdown = true;
      const outsideEl = document.createElement('div');
      document.body.appendChild(outsideEl);
      const outsideEvent = { target: outsideEl } as unknown as MouseEvent;
      component.onDocumentClick(outsideEvent);
      expect(component._displayDropdown).toBe(false);
      document.body.removeChild(outsideEl);
    });

    it('restores selected item value on outside click when item is selected', () => {
      component.value = '';
      component._selectedItem = ITEMS[1];
      const outsideEl = document.createElement('div');
      document.body.appendChild(outsideEl);
      component.onDocumentClick({ target: outsideEl } as unknown as MouseEvent);
      expect(component.value).toBe('Banana');
      document.body.removeChild(outsideEl);
    });

    it('clears value on outside click when no item is selected', () => {
      component.value = 'part';
      component._selectedItem = undefined;
      const outsideEl = document.createElement('div');
      document.body.appendChild(outsideEl);
      component.onDocumentClick({ target: outsideEl } as unknown as MouseEvent);
      expect(component.value).toBe('');
      document.body.removeChild(outsideEl);
    });
  });

  // ── Template rendering ───────────────────────────────────────────────────
  describe('template rendering', () => {
    it('binds the id input to the html input element', () => {
      const f = createFixture({ id: 'my-combo' });
      const input = f.debugElement.query(By.css('input'));
      expect(input.nativeElement.id).toBe('my-combo');
      f.destroy();
    });

    it('disables the native input when disabled=true', () => {
      const f = createFixture({ disabled: true });
      const input = f.debugElement.query(By.css('input'));
      expect(input.nativeElement.disabled).toBe(true);
      f.destroy();
    });

    it('sets readonly attribute when readonly=true', () => {
      const f = createFixture({ readonly: true });
      const input = f.debugElement.query(By.css('input'));
      expect(input.nativeElement.hasAttribute('readonly')).toBe(true);
      f.destroy();
    });

    it('does not set readonly attribute when readonly is undefined', () => {
      const input = fixture.debugElement.query(By.css('input'));
      expect(input.nativeElement.hasAttribute('readonly')).toBe(false);
    });

    it('toggle button click opens dropdown when closed', () => {
      component._displayDropdown = false;
      fixture.detectChanges();
      const toggleBtn = fixture.debugElement.query(By.css('.usa-combo-box__toggle-list'));
      toggleBtn.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component._displayDropdown).toBe(true);
    });

    it('toggle button click closes dropdown when open', () => {
      component._displayDropdown = true;
      fixture.detectChanges();
      const toggleBtn = fixture.debugElement.query(By.css('.usa-combo-box__toggle-list'));
      toggleBtn.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component._displayDropdown).toBe(false);
    });

    it('input click opens dropdown when not disabled', () => {
      component._displayDropdown = false;
      component.disabled = false;
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('input'));
      input.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component._displayDropdown).toBe(true);
    });

    it('clear button click calls clearInput', () => {
      component.value = 'Apple';
      component._selectedItem = ITEMS[0];
      fixture.detectChanges();
      const clearBtn = fixture.debugElement.query(By.css('.usa-combo-box__clear-input'));
      clearBtn.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.value).toBe('');
      expect(component._selectedItem).toBeUndefined();
    });

    it('shows dropdown list when _displayDropdown is true', () => {
      stubDom();
      component._displayDropdown = true;
      component['cdr'].markForCheck();
      fixture.detectChanges();
      const list = fixture.debugElement.query(By.css('usa-combo-box-list'));
      expect(list).toBeTruthy();
    });

    it('hides dropdown list when _displayDropdown is false', () => {
      component._displayDropdown = false;
      fixture.detectChanges();
      const list = fixture.debugElement.query(By.directive(UsaComboboxList));
      expect(list).toBeNull();
    });

    it('applies usa-combo-box--pristine class when value is non-empty', () => {
      // OnPush: must trigger CD via the component's own detector
      component.onValueChange('Apple');
      component['cdr'].detectChanges();
      const wrapper = fixture.debugElement.query(By.css('.usa-combo-box'));
      expect(wrapper.nativeElement.classList).toContain('usa-combo-box--pristine');
    });

    it('does not apply usa-combo-box--pristine when value is empty', () => {
      component.value = '';
      fixture.detectChanges();
      const wrapper = fixture.debugElement.query(By.css('.usa-combo-box'));
      expect(wrapper.nativeElement.classList).not.toContain('usa-combo-box--pristine');
    });
  });

  // ── updateValue (private) — exercised through public API ─────────────────
  describe('updateValue (via public API)', () => {
    it('does not emit change when value is already the same string', () => {
      component.value = 'Apple';
      const spy = vi.fn();
      component.changeEvent.subscribe(spy);
      component.onValueChange('Apple');
      expect(spy).not.toHaveBeenCalled();
    });

    it('extracts labelField when passed an object', () => {
      component.value = '';
      component.onValueChange(ITEMS[0] as any);
      expect(component.value).toBe('Apple');
    });

    it('sets value directly when passed a primitive', () => {
      component.value = '';
      component.onValueChange('Cherry');
      expect(component.value).toBe('Cherry');
    });
  });
});
