import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UsaAccordionChangeEvent } from './accordion-items';
import { UsaAccordionComponent } from './accordion.component';
import { UsaAccordionConfig } from './accordion.config';
import { UsaAccordionModule } from './accordion.module';

// ---------------------------------------------------------------------------
// Shared host component used across all describe blocks
// ---------------------------------------------------------------------------

@Component({
  standalone: false,
  selector: 'test-cmp',
  template: '',
})
class TestComponent {
  activeIds: string | string[] = [];
  singleSelect = false;
  animation = true;
  bordered = false;
  headerLevel: 2 | 3 | 4 | 5 | 6 = 4;
  panels = [
    { id: 'one', disabled: false, header: 'Panel 1', content: 'foo' },
    { id: 'two', disabled: false, header: 'Panel 2', content: 'bar' },
    { id: 'three', disabled: false, header: 'Panel 3', content: 'baz' },
  ];
  changeCallback = (_event: UsaAccordionChangeEvent) => {};
  shownCallback = (_panelId: string) => {};
  hiddenCallback = (_panelId: string) => {};
}

// ---------------------------------------------------------------------------
// Helper to spin up a fixture with a custom template
// ---------------------------------------------------------------------------

function buildFixture(template: string): {
  fixture: ComponentFixture<TestComponent>;
  accordion: UsaAccordionComponent;
  nativeEl: HTMLElement;
} {
  TestBed.overrideComponent(TestComponent, { set: { template } });
  const fixture = TestBed.createComponent(TestComponent);
  fixture.detectChanges();
  const accordionDe: DebugElement = fixture.debugElement.query(By.directive(UsaAccordionComponent));
  return {
    fixture,
    accordion: accordionDe.componentInstance as UsaAccordionComponent,
    nativeEl: fixture.nativeElement as HTMLElement,
  };
}

// Standard template wiring up all inputs & outputs
const ACCORDION_TEMPLATE = `
  <usa-accordion
    #acc="usaAccordion"
    [singleSelect]="singleSelect"
    [activeIds]="activeIds"
    [bordered]="bordered"
    [headerLevel]="headerLevel"
    [animation]="animation"
    (panelChange)="changeCallback($event)"
    (shown)="shownCallback($event)"
    (hidden)="hiddenCallback($event)">
    <usa-accordion-item *ngFor="let p of panels" [id]="p.id" [disabled]="p.disabled">
      <ng-template UsaAccordionHeader>{{p.header}}</ng-template>
      <ng-template UsaAccordionContent>{{p.content}}</ng-template>
    </usa-accordion-item>
  </usa-accordion>
`;

// ---------------------------------------------------------------------------
// Helper queries
// ---------------------------------------------------------------------------

function buttons(el: HTMLElement): HTMLButtonElement[] {
  return Array.from(el.querySelectorAll<HTMLButtonElement>('.usa-accordion__button'));
}

function headings(el: HTMLElement): Element[] {
  return Array.from(el.querySelectorAll('.usa-accordion__heading'));
}

// ---------------------------------------------------------------------------
// 1. Default values
// ---------------------------------------------------------------------------

describe('UsaAccordionComponent — default values', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [UsaAccordionModule, NoopAnimationsModule],
    });
  });

  it('should initialise with config defaults', () => {
    const defaults = new UsaAccordionConfig();
    // Create the component directly so no host @Input bindings override config values
    TestBed.overrideComponent(TestComponent, { set: { template: ACCORDION_TEMPLATE } });
    const fixture = TestBed.createComponent(UsaAccordionComponent);
    fixture.detectChanges();
    const acc = fixture.componentInstance;
    expect(acc.bordered).toBe(defaults.bordered);
    expect(acc.singleSelect).toBe(defaults.singleSelect);
    expect(acc.animation).toBe(defaults.animation);
    expect(acc.headerLevel).toBe(defaults.headerLevel);
  });
});

// ---------------------------------------------------------------------------
// 2. @Input bindings & template rendering
// ---------------------------------------------------------------------------

describe('UsaAccordionComponent — @Input bindings', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [UsaAccordionModule, NoopAnimationsModule],
    });
  });

  it('bordered=true adds usa-accordion--bordered class', () => {
    const { fixture, nativeEl } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.bordered = true;
    fixture.detectChanges();
    expect(nativeEl.querySelector('.usa-accordion--bordered')).toBeTruthy();
  });

  it('bordered=false omits usa-accordion--bordered class', () => {
    const { nativeEl } = buildFixture(ACCORDION_TEMPLATE);
    expect(nativeEl.querySelector('.usa-accordion--bordered')).toBeFalsy();
  });

  it('headerLevel sets aria-level on heading wrappers', () => {
    const { fixture, nativeEl } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.headerLevel = 3;
    fixture.detectChanges();
    headings(nativeEl).forEach((h) => {
      expect(h.getAttribute('aria-level')).toBe('3');
    });
  });

  it('singleSelect=true sets aria-multiselectable', () => {
    const { fixture, nativeEl } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.singleSelect = true;
    fixture.detectChanges();
    const acc = nativeEl.querySelector('usa-accordion > div') as HTMLElement;
    expect(acc.getAttribute('aria-multiselectable')).toBe('true');
  });

  it('renders one button per panel with the header text', () => {
    const { nativeEl } = buildFixture(ACCORDION_TEMPLATE);
    const btns = buttons(nativeEl);
    expect(btns.length).toBe(3);
    expect(btns[0].textContent!.trim()).toBe('Panel 1');
    expect(btns[1].textContent!.trim()).toBe('Panel 2');
    expect(btns[2].textContent!.trim()).toBe('Panel 3');
  });

  it('activeIds as array pre-expands the listed panels', () => {
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.activeIds = ['one', 'three'];
    fixture.detectChanges();
    // ngAfterContentChecked runs on next cycle
    fixture.detectChanges();
    expect(accordion.isExpanded('one')).toBe(true);
    expect(accordion.isExpanded('two')).toBe(false);
    expect(accordion.isExpanded('three')).toBe(true);
  });

  it('activeIds as comma-separated string pre-expands the listed panels', () => {
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.activeIds = 'one, three' as any;
    fixture.detectChanges();
    fixture.detectChanges();
    expect(accordion.isExpanded('one')).toBe(true);
    expect(accordion.isExpanded('three')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 3. expand / collapse / toggle / expandAll / collapseAll / isExpanded
// ---------------------------------------------------------------------------

describe('UsaAccordionComponent — state methods', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [UsaAccordionModule, NoopAnimationsModule],
    });
  });

  it('expand() opens a panel', () => {
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    accordion.expand('two');
    fixture.detectChanges();
    expect(accordion.isExpanded('two')).toBe(true);
  });

  it('expand() is a no-op on a disabled panel', () => {
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.panels[0].disabled = true;
    fixture.detectChanges();
    accordion.expand('one');
    fixture.detectChanges();
    expect(accordion.isExpanded('one')).toBe(false);
  });

  it('collapse() closes an open panel', () => {
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    accordion.expand('one');
    fixture.detectChanges();
    accordion.collapse('one');
    fixture.detectChanges();
    expect(accordion.isExpanded('one')).toBe(false);
  });

  it('toggle() opens a collapsed panel', () => {
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    accordion.toggle('one');
    fixture.detectChanges();
    expect(accordion.isExpanded('one')).toBe(true);
  });

  it('toggle() closes an expanded panel', () => {
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    accordion.toggle('one');
    fixture.detectChanges();
    accordion.toggle('one');
    fixture.detectChanges();
    expect(accordion.isExpanded('one')).toBe(false);
  });

  it('toggle() is a no-op on a disabled panel', () => {
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.panels[1].disabled = true;
    fixture.detectChanges();
    accordion.toggle('two');
    fixture.detectChanges();
    expect(accordion.isExpanded('two')).toBe(false);
  });

  it('toggle() is a no-op for an unknown panel id', () => {
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    expect(() => {
      accordion.toggle('nonexistent');
      fixture.detectChanges();
    }).not.toThrow();
  });

  it('expandAll() opens all panels when singleSelect=false', () => {
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    accordion.expandAll();
    fixture.detectChanges();
    expect(accordion.isExpanded('one')).toBe(true);
    expect(accordion.isExpanded('two')).toBe(true);
    expect(accordion.isExpanded('three')).toBe(true);
  });

  it('expandAll() with singleSelect=true opens only the first panel when none open', () => {
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.singleSelect = true;
    fixture.detectChanges();
    accordion.expandAll();
    fixture.detectChanges();
    expect(accordion.isExpanded('one')).toBe(true);
    expect(accordion.isExpanded('two')).toBe(false);
  });

  it('expandAll() with singleSelect=true is a no-op when a panel is already open', () => {
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.singleSelect = true;
    fixture.detectChanges();
    accordion.expand('two');
    fixture.detectChanges();
    accordion.expandAll();
    fixture.detectChanges();
    // 'one' should not have been opened
    expect(accordion.isExpanded('one')).toBe(false);
    expect(accordion.isExpanded('two')).toBe(true);
  });

  it('collapseAll() closes all open panels', () => {
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    accordion.expandAll();
    fixture.detectChanges();
    accordion.collapseAll();
    fixture.detectChanges();
    expect(accordion.isExpanded('one')).toBe(false);
    expect(accordion.isExpanded('two')).toBe(false);
    expect(accordion.isExpanded('three')).toBe(false);
  });

  it('isExpanded() returns false for an unknown panel id', () => {
    const { accordion } = buildFixture(ACCORDION_TEMPLATE);
    expect(accordion.isExpanded('ghost')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 4. singleSelect mode
// ---------------------------------------------------------------------------

describe('UsaAccordionComponent — singleSelect mode', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [UsaAccordionModule, NoopAnimationsModule],
    });
  });

  it('opening a second panel closes the first in singleSelect mode', () => {
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.singleSelect = true;
    fixture.detectChanges();
    accordion.expand('one');
    fixture.detectChanges();
    accordion.expand('two');
    fixture.detectChanges();
    expect(accordion.isExpanded('one')).toBe(false);
    expect(accordion.isExpanded('two')).toBe(true);
  });

  it('singleSelect=false allows multiple open panels', () => {
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    accordion.expand('one');
    fixture.detectChanges();
    accordion.expand('two');
    fixture.detectChanges();
    expect(accordion.isExpanded('one')).toBe(true);
    expect(accordion.isExpanded('two')).toBe(true);
  });

  it('singleSelect collapses extras when multiple activeIds provided', () => {
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.singleSelect = true;
    fixture.componentInstance.activeIds = ['one', 'two', 'three'];
    fixture.detectChanges();
    fixture.detectChanges();
    const openCount = ['one', 'two', 'three'].filter((id) => accordion.isExpanded(id)).length;
    expect(openCount).toBeLessThanOrEqual(1);
  });
});

// ---------------------------------------------------------------------------
// 5. @Output — panelChange event
// ---------------------------------------------------------------------------

describe('UsaAccordionComponent — @Output panelChange', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [UsaAccordionModule, NoopAnimationsModule],
    });
  });

  it('emits panelChange with correct payload when panel is opened', () => {
    const events: UsaAccordionChangeEvent[] = [];
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.changeCallback = (e) => events.push(e);
    accordion.expand('one');
    fixture.detectChanges();
    expect(events.length).toBe(1);
    expect(events[0].panelId).toBe('one');
    expect(events[0].nextState).toBe(true);
  });

  it('emits panelChange with nextState=false when panel is closed', () => {
    const events: UsaAccordionChangeEvent[] = [];
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.changeCallback = (e) => events.push(e);
    accordion.expand('one');
    fixture.detectChanges();
    accordion.collapse('one');
    fixture.detectChanges();
    expect(events[1].nextState).toBe(false);
  });

  it('preventDefault() on panelChange prevents the toggle', () => {
    const { fixture, accordion } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.changeCallback = (e) => e.preventDefault();
    accordion.expand('one');
    fixture.detectChanges();
    expect(accordion.isExpanded('one')).toBe(false);
  });

  it('clicking the button emits panelChange', () => {
    const events: UsaAccordionChangeEvent[] = [];
    const { fixture, nativeEl } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.changeCallback = (e) => events.push(e);
    fixture.detectChanges();
    const btn = buttons(nativeEl)[0];
    btn.click();
    fixture.detectChanges();
    expect(events.length).toBe(1);
    expect(events[0].panelId).toBe('one');
  });
});

// ---------------------------------------------------------------------------
// 6. aria attributes & button state in DOM
// ---------------------------------------------------------------------------

describe('UsaAccordionComponent — aria & DOM state', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [UsaAccordionModule, NoopAnimationsModule],
    });
  });

  it('collapsed button has aria-expanded=false and collapsed class', () => {
    const { nativeEl } = buildFixture(ACCORDION_TEMPLATE);
    const btn = buttons(nativeEl)[0];
    expect(btn.getAttribute('aria-expanded')).toBe('false');
    expect(btn.classList.contains('collapsed')).toBe(true);
  });

  it('expanded button has aria-expanded=true and no collapsed class', () => {
    const { fixture, accordion, nativeEl } = buildFixture(ACCORDION_TEMPLATE);
    accordion.expand('one');
    fixture.detectChanges();
    const btn = buttons(nativeEl)[0];
    expect(btn.getAttribute('aria-expanded')).toBe('true');
    expect(btn.classList.contains('collapsed')).toBe(false);
  });

  it('disabled button carries the disabled attribute', () => {
    const { fixture, nativeEl } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.panels[0].disabled = true;
    fixture.detectChanges();
    const btn = buttons(nativeEl)[0];
    expect(btn.disabled).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 7. Keyboard navigation
// ---------------------------------------------------------------------------

describe('UsaAccordionComponent — keyboard navigation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [UsaAccordionModule, NoopAnimationsModule],
    });
  });

  function dispatchKey(btn: HTMLButtonElement, key: string): void {
    btn.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
  }

  it('ArrowDown moves focus to the next panel button', () => {
    const { fixture, nativeEl } = buildFixture(ACCORDION_TEMPLATE);
    fixture.detectChanges();
    const btns = buttons(nativeEl);
    btns[0].focus();
    dispatchKey(btns[0], 'ArrowDown');
    fixture.detectChanges();
    expect(document.activeElement).toBe(btns[1]);
  });

  it('ArrowUp moves focus to the previous panel button', () => {
    const { fixture, nativeEl } = buildFixture(ACCORDION_TEMPLATE);
    fixture.detectChanges();
    const btns = buttons(nativeEl);
    btns[1].focus();
    dispatchKey(btns[1], 'ArrowUp');
    fixture.detectChanges();
    expect(document.activeElement).toBe(btns[0]);
  });

  it('Home moves focus to the first panel button', () => {
    const { fixture, nativeEl } = buildFixture(ACCORDION_TEMPLATE);
    fixture.detectChanges();
    const btns = buttons(nativeEl);
    btns[2].focus();
    dispatchKey(btns[2], 'Home');
    fixture.detectChanges();
    expect(document.activeElement).toBe(btns[0]);
  });

  it('End moves focus to the last panel button', () => {
    const { fixture, nativeEl } = buildFixture(ACCORDION_TEMPLATE);
    fixture.detectChanges();
    const btns = buttons(nativeEl);
    btns[0].focus();
    dispatchKey(btns[0], 'End');
    fixture.detectChanges();
    expect(document.activeElement).toBe(btns[2]);
  });

  it('Home skips disabled panels to first non-disabled', () => {
    const { fixture, nativeEl } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.panels[0].disabled = true;
    fixture.detectChanges();
    const btns = buttons(nativeEl);
    btns[2].focus();
    dispatchKey(btns[2], 'Home');
    fixture.detectChanges();
    // first non-disabled is index 1 ('two')
    expect(document.activeElement).toBe(btns[1]);
  });

  it('End skips disabled panels to last non-disabled', () => {
    const { fixture, nativeEl } = buildFixture(ACCORDION_TEMPLATE);
    fixture.componentInstance.panels[2].disabled = true;
    fixture.detectChanges();
    const btns = buttons(nativeEl);
    btns[0].focus();
    dispatchKey(btns[0], 'End');
    fixture.detectChanges();
    // last non-disabled is index 1 ('two')
    expect(document.activeElement).toBe(btns[1]);
  });
});

// ---------------------------------------------------------------------------
// 8. Animation event callbacks (onBodyExpansionStart / onBodyExpansionEnd)
// ---------------------------------------------------------------------------

describe('UsaAccordionComponent — animation callbacks', () => {
  let accordion: UsaAccordionComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [UsaAccordionModule, NoopAnimationsModule],
    });
    ({ fixture, accordion } = buildFixture(ACCORDION_TEMPLATE));
  });

  it('onBodyExpansionStart removes display style when expanding', () => {
    const panel = document.createElement('div');
    panel.style.display = 'none';
    accordion.onBodyExpansionStart(
      {
        fromState: 'collapsed',
        toState: 'expanded',
        totalTime: 0,
        phaseName: 'start',
        element: panel,
        triggerName: 'bodyExpansion',
        disabled: false,
      },
      panel,
    );
    expect(panel.style.display).toBe('');
  });

  it('onBodyExpansionStart does nothing when not expanding', () => {
    const panel = document.createElement('div');
    panel.style.display = 'none';
    accordion.onBodyExpansionStart(
      {
        fromState: 'expanded',
        toState: 'collapsed',
        totalTime: 0,
        phaseName: 'start',
        element: panel,
        triggerName: 'bodyExpansion',
        disabled: false,
      },
      panel,
    );
    expect(panel.style.display).toBe('none');
  });

  it('onBodyExpansionEnd emits shown when expanded', () => {
    const shown: string[] = [];
    accordion.shown.subscribe((id: string) => shown.push(id));
    const panel = document.createElement('div');
    panel.id = 'one';
    accordion.onBodyExpansionEnd(
      {
        fromState: 'collapsed',
        toState: 'expanded',
        totalTime: 0,
        phaseName: 'done',
        element: panel,
        triggerName: 'bodyExpansion',
        disabled: false,
      },
      panel,
    );
    expect(shown).toEqual(['one']);
  });

  it('onBodyExpansionEnd emits hidden and sets display:none when collapsed', () => {
    const hidden: string[] = [];
    accordion.hidden.subscribe((id: string) => hidden.push(id));
    const panel = document.createElement('div');
    panel.id = 'two';
    accordion.onBodyExpansionEnd(
      {
        fromState: 'expanded',
        toState: 'collapsed',
        totalTime: 0,
        phaseName: 'done',
        element: panel,
        triggerName: 'bodyExpansion',
        disabled: false,
      },
      panel,
    );
    expect(hidden).toEqual(['two']);
    expect(panel.style.display).toBe('none');
  });

  it('onBodyExpansionEnd does nothing when fromState is void', () => {
    const shown: string[] = [];
    const hidden: string[] = [];
    accordion.shown.subscribe((id: string) => shown.push(id));
    accordion.hidden.subscribe((id: string) => hidden.push(id));
    const panel = document.createElement('div');
    panel.id = 'three';
    accordion.onBodyExpansionEnd(
      {
        fromState: 'void',
        toState: 'expanded',
        totalTime: 0,
        phaseName: 'done',
        element: panel,
        triggerName: 'bodyExpansion',
        disabled: false,
      },
      panel,
    );
    expect(shown).toEqual([]);
    expect(hidden).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 9. UsaAccordionConfig customisation
// ---------------------------------------------------------------------------

describe('UsaAccordionComponent — custom UsaAccordionConfig', () => {
  it('accepts overrides from UsaAccordionConfig', () => {
    const customConfig = new UsaAccordionConfig();
    customConfig.singleSelect = true;
    (customConfig as any).bordered = true;
    customConfig.headerLevel = 3;
    TestBed.configureTestingModule({
      imports: [UsaAccordionModule, NoopAnimationsModule],
      providers: [{ provide: UsaAccordionConfig, useValue: customConfig }],
    });
    // Create the accordion directly so no host @Input bindings override config values
    const fixture = TestBed.createComponent(UsaAccordionComponent);
    fixture.detectChanges();
    const acc = fixture.componentInstance;
    expect(acc.singleSelect).toBe(true);
    expect(acc.bordered).toBe(true);
    expect(acc.headerLevel).toBe(3);
  });
});
