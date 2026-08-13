import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { UsaLinkTemplateModule } from './link-template.module';
import { UsaLinkTemplateComponent } from './link-template.component';
import { UsaNavigationLink, UsaNavigationMode } from '../../util/navigation';

// ---------------------------------------------------------------------------
// Stub route target required by RouterTestingModule
// ---------------------------------------------------------------------------

@Component({ standalone: false, template: '' })
class StubRouteComponent {}

// ---------------------------------------------------------------------------
// Host wrapper
// ---------------------------------------------------------------------------

@Component({
  standalone: false,
  template: `<usa-link-template
    [link]="link"
    [class]="linkClass"
    [currentClass]="currentClass"
    (linkClicked)="clicked($event)"
  ></usa-link-template>`,
})
class HostComponent {
  link: UsaNavigationLink = { id: '1', text: 'Home', mode: UsaNavigationMode.EVENT };
  linkClass = '';
  currentClass = 'usa-current';
  lastClicked: UsaNavigationLink | null = null;
  clicked(link: UsaNavigationLink) {
    this.lastClicked = link;
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeLink(overrides: Partial<UsaNavigationLink> = {}): UsaNavigationLink {
  return { id: '1', text: 'Link', mode: UsaNavigationMode.EVENT, ...overrides };
}

// ---------------------------------------------------------------------------
// Shared TestBed setup — one module compiled for all suites
// ---------------------------------------------------------------------------

function configureTestBed() {
  return TestBed.configureTestingModule({
    declarations: [HostComponent, StubRouteComponent],
    imports: [UsaLinkTemplateModule, RouterTestingModule.withRoutes([{ path: 'home', component: StubRouteComponent }])],
  }).compileComponents();
}

function createFixture(link: Partial<UsaNavigationLink> = {}, extras: Partial<HostComponent> = {}) {
  const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
  const host = fixture.componentInstance;
  host.link = makeLink(link);
  Object.assign(host, extras);
  fixture.detectChanges();
  return { fixture, host };
}

// ---------------------------------------------------------------------------
// EVENT mode (default)
// ---------------------------------------------------------------------------

describe('UsaLinkTemplateComponent — EVENT mode', () => {
  beforeEach(waitForAsync(configureTestBed));

  it('creates the component', () => {
    const { fixture } = createFixture({ mode: UsaNavigationMode.EVENT });
    const comp = fixture.debugElement.query(By.directive(UsaLinkTemplateComponent));
    expect(comp).toBeTruthy();
  });

  it('renders an anchor with href=javascript:void(0)', () => {
    const { fixture } = createFixture({ mode: UsaNavigationMode.EVENT });
    const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toBe('javascript:void(0)');
  });

  it('shows link text', () => {
    const { fixture } = createFixture({ mode: UsaNavigationMode.EVENT, text: 'Click me' });
    const span: HTMLSpanElement = fixture.nativeElement.querySelector('span');
    expect(span.textContent?.trim()).toBe('Click me');
  });

  it('emits linkClicked when anchor is clicked', () => {
    const { fixture, host } = createFixture({ mode: UsaNavigationMode.EVENT });
    fixture.nativeElement.querySelector('a').click();
    fixture.detectChanges();
    expect(host.lastClicked?.id).toBe('1');
  });

  it('applies linkClass to unselected anchor', () => {
    const { fixture } = createFixture({ mode: UsaNavigationMode.EVENT, selected: false }, { linkClass: 'my-class' });
    const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(anchor.getAttribute('class')).toBe('my-class');
  });

  it('applies linkClass + currentClass for selected anchor', () => {
    const { fixture } = createFixture(
      { mode: UsaNavigationMode.EVENT, selected: true },
      { linkClass: 'my-class', currentClass: 'usa-current' },
    );
    const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(anchor.getAttribute('class')).toContain('my-class');
    expect(anchor.getAttribute('class')).toContain('usa-current');
  });
});

// ---------------------------------------------------------------------------
// EXTERNAL mode
// ---------------------------------------------------------------------------

describe('UsaLinkTemplateComponent — EXTERNAL mode', () => {
  beforeEach(waitForAsync(configureTestBed));

  it('renders anchor with href built from path', () => {
    const { fixture } = createFixture({ mode: UsaNavigationMode.EXTERNAL, path: 'https://example.com' });
    const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(anchor.getAttribute('href')).toBe('https://example.com');
  });

  it('appends query params to href with ?', () => {
    const { fixture } = createFixture({
      mode: UsaNavigationMode.EXTERNAL,
      path: 'https://example.com',
      queryParams: { foo: 'bar', baz: '1' },
    });
    const href = fixture.nativeElement.querySelector('a').getAttribute('href') as string;
    expect(href).toContain('foo=bar');
    expect(href).toContain('baz=1');
  });

  it('appends query params with & when URL already contains ?', () => {
    const { fixture } = createFixture({
      mode: UsaNavigationMode.EXTERNAL,
      path: 'https://example.com?existing=1',
      queryParams: { extra: '2' },
    });
    const href = fixture.nativeElement.querySelector('a').getAttribute('href') as string;
    expect(href).toContain('existing=1');
    expect(href).toContain('extra=2');
    expect(href).toContain('&');
  });

  it('appends query params directly when URL ends with ?', () => {
    const { fixture } = createFixture({
      mode: UsaNavigationMode.EXTERNAL,
      path: 'https://example.com?',
      queryParams: { q: 'test' },
    });
    const href = fixture.nativeElement.querySelector('a').getAttribute('href') as string;
    expect(href).toContain('q=test');
  });

  it('emits linkClicked on click', () => {
    const { fixture, host } = createFixture({
      mode: UsaNavigationMode.EXTERNAL,
      path: 'https://example.com',
    });
    fixture.nativeElement.querySelector('a').click();
    fixture.detectChanges();
    expect(host.lastClicked?.id).toBe('1');
  });

  it('applies selected + currentClass', () => {
    const { fixture } = createFixture(
      { mode: UsaNavigationMode.EXTERNAL, path: 'https://example.com', selected: true },
      { linkClass: 'nav', currentClass: 'active' },
    );
    const cls = fixture.nativeElement.querySelector('a').getAttribute('class') as string;
    expect(cls).toContain('nav');
    expect(cls).toContain('active');
  });
});

// ---------------------------------------------------------------------------
// INTERNAL mode
// ---------------------------------------------------------------------------

describe('UsaLinkTemplateComponent — INTERNAL mode', () => {
  beforeEach(waitForAsync(configureTestBed));

  it('renders anchor with routerLink', () => {
    const { fixture } = createFixture({ mode: UsaNavigationMode.INTERNAL, path: '/home' });
    const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    expect(anchor).toBeTruthy();
  });

  it('emits linkClicked on click', () => {
    const { fixture, host } = createFixture({ mode: UsaNavigationMode.INTERNAL, path: '/home' });
    fixture.nativeElement.querySelector('a').click();
    fixture.detectChanges();
    expect(host.lastClicked?.id).toBe('1');
  });

  it('applies selected + currentClass', () => {
    const { fixture } = createFixture(
      { mode: UsaNavigationMode.INTERNAL, path: '/home', selected: true },
      { linkClass: 'nav', currentClass: 'usa-current' },
    );
    const cls = fixture.nativeElement.querySelector('a').getAttribute('class') as string;
    expect(cls).toContain('nav');
    expect(cls).toContain('usa-current');
  });
});

// ---------------------------------------------------------------------------
// LABEL mode
// ---------------------------------------------------------------------------

describe('UsaLinkTemplateComponent — LABEL mode', () => {
  beforeEach(waitForAsync(configureTestBed));

  it('renders a span, not an anchor', () => {
    const { fixture } = createFixture({ mode: UsaNavigationMode.LABEL });
    expect(fixture.nativeElement.querySelector('a')).toBeNull();
    expect(fixture.nativeElement.querySelector('span')).toBeTruthy();
  });

  it('displays link text in span', () => {
    const { fixture } = createFixture({ mode: UsaNavigationMode.LABEL, text: 'Section' });
    expect(fixture.nativeElement.querySelector('span').textContent?.trim()).toBe('Section');
  });
});

// ---------------------------------------------------------------------------
// Default / undefined mode (falls back to EVENT template)
// ---------------------------------------------------------------------------

describe('UsaLinkTemplateComponent — default (undefined) mode', () => {
  beforeEach(waitForAsync(configureTestBed));

  it('renders an anchor when mode is undefined', () => {
    const { fixture } = createFixture({ mode: undefined });
    expect(fixture.nativeElement.querySelector('a')).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// urlBuilder unit tests (via EXTERNAL mode)
// ---------------------------------------------------------------------------

describe('UsaLinkTemplateComponent — urlBuilder', () => {
  beforeEach(waitForAsync(configureTestBed));

  it('returns plain path when no query params', () => {
    const { fixture } = createFixture({
      mode: UsaNavigationMode.EXTERNAL,
      path: 'https://example.com/page',
    });
    const comp = fixture.debugElement.query(By.directive(UsaLinkTemplateComponent))
      .componentInstance as UsaLinkTemplateComponent;
    const result = comp.urlBuilder({ id: '1', text: 'x', path: 'https://example.com/page' });
    expect(result).toBe('https://example.com/page');
  });

  it('encodes special characters in query param keys and values', () => {
    const { fixture } = createFixture({ mode: UsaNavigationMode.EXTERNAL, path: '/p' });
    const comp = fixture.debugElement.query(By.directive(UsaLinkTemplateComponent))
      .componentInstance as UsaLinkTemplateComponent;
    const result = comp.urlBuilder({
      id: '1',
      text: 'x',
      path: '/p',
      queryParams: { 'k e y': 'v a l' },
    });
    expect(result).toContain('k%20e%20y=v%20a%20l');
  });
});
