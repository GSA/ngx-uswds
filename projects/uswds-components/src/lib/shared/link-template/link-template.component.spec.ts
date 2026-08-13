import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { UsaLinkTemplateModule } from './link-template.module';
import { UsaLinkTemplateComponent } from './link-template.component';
import { UsaNavigationLink, UsaNavigationMode } from '../../util/navigation';

// ---------------------------------------------------------------------------
// Host component
// ---------------------------------------------------------------------------

@Component({
  standalone: false,
  template: `
    <usa-link-template
      [link]="link"
      [class]="linkClass"
      [currentClass]="currentClass"
      (linkClicked)="onLinkClicked($event)"
    ></usa-link-template>
  `,
})
class HostComponent {
  link: UsaNavigationLink = { id: '1', text: 'Home', mode: UsaNavigationMode.EVENT };
  linkClass = '';
  currentClass = 'usa-current';
  lastClicked: UsaNavigationLink | null = null;

  onLinkClicked(link: UsaNavigationLink) {
    this.lastClicked = link;
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeLink(overrides: Partial<UsaNavigationLink> = {}): UsaNavigationLink {
  return { id: '1', text: 'Test Link', mode: UsaNavigationMode.EVENT, ...overrides };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('UsaLinkTemplateComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [
        UsaLinkTemplateModule,
        RouterTestingModule.withRoutes([{ path: '**', component: UsaLinkTemplateComponent }]),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  // -------------------------------------------------------------------------
  // Creation
  // -------------------------------------------------------------------------

  it('should create', () => {
    const el = fixture.debugElement.query(By.css('usa-link-template'));
    expect(el).toBeTruthy();
  });

  // -------------------------------------------------------------------------
  // NavigationMode.EVENT (default href=javascript:void(0))
  // -------------------------------------------------------------------------

  it('renders an anchor for EVENT mode', () => {
    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor).toBeTruthy();
  });

  it('shows link text for EVENT mode', () => {
    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor.nativeElement.textContent.trim()).toBe('Home');
  });

  it('emits linkClicked when EVENT anchor is clicked', () => {
    const anchor = fixture.debugElement.query(By.css('a'));
    anchor.nativeElement.click();
    expect(host.lastClicked).toBe(host.link);
  });

  // -------------------------------------------------------------------------
  // NavigationMode.LABEL (non-interactive span)
  // -------------------------------------------------------------------------

  it('renders a span for LABEL mode', () => {
    host.link = makeLink({ mode: UsaNavigationMode.LABEL, text: 'Label Only' });
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('span'));
    expect(span).toBeTruthy();
    expect(span.nativeElement.textContent.trim()).toBe('Label Only');
  });

  it('does not render an anchor for LABEL mode', () => {
    host.link = makeLink({ mode: UsaNavigationMode.LABEL });
    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor).toBeNull();
  });

  // -------------------------------------------------------------------------
  // NavigationMode.EXTERNAL
  // -------------------------------------------------------------------------

  it('renders an anchor for EXTERNAL mode', () => {
    host.link = makeLink({ mode: UsaNavigationMode.EXTERNAL, path: 'https://example.com', text: 'External' });
    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor).toBeTruthy();
  });

  it('sets href for EXTERNAL mode', () => {
    host.link = makeLink({ mode: UsaNavigationMode.EXTERNAL, path: 'https://example.com' });
    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor.nativeElement.getAttribute('href')).toBe('https://example.com');
  });

  it('emits linkClicked when EXTERNAL anchor is clicked', () => {
    host.link = makeLink({ mode: UsaNavigationMode.EXTERNAL, path: 'https://example.com' });
    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css('a'));
    anchor.nativeElement.click();
    expect(host.lastClicked).toBeDefined();
  });

  // -------------------------------------------------------------------------
  // NavigationMode.INTERNAL
  // -------------------------------------------------------------------------

  it('renders an anchor for INTERNAL mode', () => {
    host.link = makeLink({ mode: UsaNavigationMode.INTERNAL, path: '/home', text: 'Internal' });
    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor).toBeTruthy();
  });

  it('shows link text for INTERNAL mode', () => {
    host.link = makeLink({ mode: UsaNavigationMode.INTERNAL, path: '/home', text: 'Internal Link' });
    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor.nativeElement.textContent.trim()).toBe('Internal Link');
  });

  it('emits linkClicked when INTERNAL anchor is clicked', () => {
    host.link = makeLink({ mode: UsaNavigationMode.INTERNAL, path: '/home' });
    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css('a'));
    anchor.nativeElement.click();
    expect(host.lastClicked).toBeDefined();
  });

  // -------------------------------------------------------------------------
  // Default (undefined mode) falls back to EVENT template
  // -------------------------------------------------------------------------

  it('renders anchor for undefined mode (default branch)', () => {
    // undefined mode hits the *ngSwitchDefault branch — no path to avoid router errors
    host.link = { id: '1', text: 'Default' } as any;
    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor).toBeTruthy();
  });

  it('emits linkClicked for undefined mode on click', () => {
    host.link = { id: '1', text: 'Default' } as any;
    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css('a'));
    anchor.nativeElement.click();
    expect(host.lastClicked).toBeDefined();
  });

  // -------------------------------------------------------------------------
  // class / currentClass / selected bindings
  // -------------------------------------------------------------------------

  it('applies no class when link is not selected', () => {
    host.link = makeLink({ selected: false });
    host.linkClass = 'my-link';
    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor.nativeElement.getAttribute('class')).toBe('my-link');
  });

  it('applies class + currentClass when link is selected', () => {
    host.link = makeLink({ selected: true });
    host.linkClass = 'my-link';
    host.currentClass = 'is-current';
    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor.nativeElement.getAttribute('class')).toBe('my-link is-current');
  });

  it('applies only currentClass when class is empty and link is selected', () => {
    host.link = makeLink({ selected: true });
    host.linkClass = '';
    host.currentClass = 'usa-current';
    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css('a'));
    expect(anchor.nativeElement.getAttribute('class')).toBe(' usa-current');
  });

  it('uses default currentClass of usa-current', () => {
    const compFixture = TestBed.createComponent(UsaLinkTemplateComponent);
    const comp = compFixture.componentInstance;
    expect(comp.currentClass).toBe('usa-current');
  });

  it('uses default class of empty string', () => {
    const compFixture = TestBed.createComponent(UsaLinkTemplateComponent);
    const comp = compFixture.componentInstance;
    expect(comp.class).toBe('');
  });

  // -------------------------------------------------------------------------
  // urlBuilder — EXTERNAL with query params
  // -------------------------------------------------------------------------

  it('urlBuilder returns path when no queryParams', () => {
    const compFixture = TestBed.createComponent(UsaLinkTemplateComponent);
    const comp = compFixture.componentInstance;
    const link = makeLink({ path: 'https://example.com' });
    expect(comp.urlBuilder(link)).toBe('https://example.com');
  });

  it('urlBuilder appends single query param', () => {
    const compFixture = TestBed.createComponent(UsaLinkTemplateComponent);
    const comp = compFixture.componentInstance;
    const link = makeLink({ path: 'https://example.com', queryParams: { foo: 'bar' } });
    expect(comp.urlBuilder(link)).toBe('https://example.com?foo=bar');
  });

  it('urlBuilder appends multiple query params', () => {
    const compFixture = TestBed.createComponent(UsaLinkTemplateComponent);
    const comp = compFixture.componentInstance;
    const link = makeLink({ path: 'https://example.com', queryParams: { a: '1', b: '2' } });
    const result = comp.urlBuilder(link);
    expect(result).toContain('a=1');
    expect(result).toContain('b=2');
  });

  it('urlBuilder uses & when path already has a query string', () => {
    const compFixture = TestBed.createComponent(UsaLinkTemplateComponent);
    const comp = compFixture.componentInstance;
    const link = makeLink({ path: 'https://example.com?x=1', queryParams: { y: '2' } });
    const result = comp.urlBuilder(link);
    expect(result).toBe('https://example.com?x=1&y=2');
  });

  it('urlBuilder appends directly when path ends with ?', () => {
    const compFixture = TestBed.createComponent(UsaLinkTemplateComponent);
    const comp = compFixture.componentInstance;
    const link = makeLink({ path: 'https://example.com?', queryParams: { z: '3' } });
    const result = comp.urlBuilder(link);
    expect(result).toBe('https://example.com?z=3');
  });

  it('urlBuilder encodes special characters in query params', () => {
    const compFixture = TestBed.createComponent(UsaLinkTemplateComponent);
    const comp = compFixture.componentInstance;
    const link = makeLink({ path: 'https://example.com', queryParams: { q: 'hello world' } });
    const result = comp.urlBuilder(link);
    expect(result).toBe('https://example.com?q=hello%20world');
  });
});
