import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsaAffixModule } from './affix.module';

// ── Host helpers ─────────────────────────────────────────────────────────────

@Component({
  standalone: false,
  template: `<input input [prefix]="prefix" [suffix]="suffix" />`,
})
class StringAffixHostComponent {
  prefix: string | undefined;
  suffix: string | undefined;
}

@Component({
  standalone: false,
  template: `
    <ng-template #prefixTpl>prefix text</ng-template>
    <ng-template #suffixTpl>suffix text</ng-template>
    <input input [prefix]="useSuffix ? null : prefixTpl" [suffix]="useSuffix ? suffixTpl : null" />
  `,
})
class TemplateAffixHostComponent {
  useSuffix = false;
}

@Component({
  standalone: false,
  template: `
    <ng-template #elemTpl><span>icon</span></ng-template>
    <input input [prefix]="elemTpl" />
  `,
})
class ElementTemplateAffixHostComponent {}

@Component({
  standalone: false,
  template: `<input input [prefix]="prefix" [suffix]="suffix" />`,
})
class NoAffixHostComponent {
  prefix: string | null = null;
  suffix: string | null = null;
}

describe('UsaInputAffixDirective', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaAffixModule],
      declarations: [
        StringAffixHostComponent,
        TemplateAffixHostComponent,
        ElementTemplateAffixHostComponent,
        NoAffixHostComponent,
      ],
    }).compileComponents();
  }));

  // ── Slice 1: no-op when neither prefix nor suffix ─────────────────────────

  describe('no prefix or suffix', () => {
    it('does not wrap the input when neither prefix nor suffix is provided', () => {
      const fixture = TestBed.createComponent(NoAffixHostComponent);
      fixture.detectChanges();
      const group = fixture.nativeElement.querySelector('.usa-input-group');
      expect(group).toBeNull();
    });
  });

  // ── Slice 2: string prefix ────────────────────────────────────────────────

  describe('string prefix', () => {
    let fixture: ComponentFixture<StringAffixHostComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(StringAffixHostComponent);
      fixture.componentInstance.prefix = '$';
      fixture.detectChanges();
    });

    it('wraps the input in a usa-input-group div', () => {
      const group = fixture.nativeElement.querySelector('.usa-input-group');
      expect(group).toBeTruthy();
    });

    it('renders a .usa-input-prefix element', () => {
      const prefix = fixture.nativeElement.querySelector('.usa-input-prefix');
      expect(prefix).toBeTruthy();
    });

    it('does not render a .usa-input-suffix element', () => {
      const suffix = fixture.nativeElement.querySelector('.usa-input-suffix');
      expect(suffix).toBeNull();
    });

    it('adds usa-input class to the input', () => {
      const input = fixture.nativeElement.querySelector('input');
      expect(input.classList.contains('usa-input')).toBe(true);
    });
  });

  // ── Slice 3: string suffix ────────────────────────────────────────────────

  describe('string suffix', () => {
    let fixture: ComponentFixture<StringAffixHostComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(StringAffixHostComponent);
      fixture.componentInstance.suffix = 'lbs';
      fixture.detectChanges();
    });

    it('wraps the input in a usa-input-group div', () => {
      const group = fixture.nativeElement.querySelector('.usa-input-group');
      expect(group).toBeTruthy();
    });

    it('renders a .usa-input-suffix element', () => {
      const suffix = fixture.nativeElement.querySelector('.usa-input-suffix');
      expect(suffix).toBeTruthy();
    });

    it('does not render a .usa-input-prefix element', () => {
      const prefix = fixture.nativeElement.querySelector('.usa-input-prefix');
      expect(prefix).toBeNull();
    });
  });

  // ── Slice 4: both prefix and suffix ──────────────────────────────────────

  describe('prefix and suffix together', () => {
    let fixture: ComponentFixture<StringAffixHostComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(StringAffixHostComponent);
      fixture.componentInstance.prefix = '$';
      fixture.componentInstance.suffix = '.00';
      fixture.detectChanges();
    });

    it('renders both prefix and suffix', () => {
      expect(fixture.nativeElement.querySelector('.usa-input-prefix')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.usa-input-suffix')).toBeTruthy();
    });
  });

  // ── Slice 5: TemplateRef with text node ───────────────────────────────────

  describe('TemplateRef prefix with text node', () => {
    it('wraps text-node template content in a div', () => {
      const fixture = TestBed.createComponent(TemplateAffixHostComponent);
      fixture.detectChanges();
      const prefix = fixture.nativeElement.querySelector('.usa-input-prefix');
      expect(prefix).toBeTruthy();
      // The text "prefix text" should appear inside the prefix wrapper
      expect(prefix.textContent).toContain('prefix text');
    });
  });

  // ── Slice 6: TemplateRef with element node ────────────────────────────────

  describe('TemplateRef prefix with element node (span)', () => {
    it('uses the element node directly as the prefix element', () => {
      const fixture = TestBed.createComponent(ElementTemplateAffixHostComponent);
      fixture.detectChanges();
      const prefix = fixture.nativeElement.querySelector('.usa-input-prefix');
      expect(prefix).toBeTruthy();
      // The span is the prefix element itself (directive re-uses the root node)
      // — either the span IS the prefix or the span is a child of the prefix wrapper
      const spanInGroup = fixture.nativeElement.querySelector('.usa-input-group span');
      expect(spanInGroup).toBeTruthy();
    });
  });

  // ── Slice 7: TemplateRef suffix ───────────────────────────────────────────

  describe('TemplateRef suffix', () => {
    it('renders suffix from a template ref', () => {
      const fixture = TestBed.createComponent(TemplateAffixHostComponent);
      fixture.componentInstance.useSuffix = true;
      fixture.detectChanges();
      const suffix = fixture.nativeElement.querySelector('.usa-input-suffix');
      expect(suffix).toBeTruthy();
      expect(suffix.textContent).toContain('suffix text');
    });
  });
});
