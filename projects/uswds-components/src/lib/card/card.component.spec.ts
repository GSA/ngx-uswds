import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { USWDSCardModule } from './card.module';

// ---------------------------------------------------------------------------
// Host components
// ---------------------------------------------------------------------------

@Component({
  standalone: false,
  template: `
    <li
      uswds-card
      [flagView]="flagView"
      [headerFirst]="headerFirst"
      [flagMediaRight]="flagMediaRight"
      [additionalStyles]="additionalStyles"
    >
      <div class="usa-card__container"></div>
    </li>
  `,
})
class CardHostComponent {
  flagView = false;
  headerFirst = false;
  flagMediaRight = false;
  additionalStyles: string = undefined;
}

@Component({
  standalone: false,
  template: `
    <uswds-card-media [inset]="inset" [exdent]="exdent">
      <img src="test.png" alt="test" />
    </uswds-card-media>
  `,
})
class CardMediaHostComponent {
  inset = false;
  exdent = false;
}

@Component({
  standalone: false,
  template: `
    <uswds-card-group>
      <li uswds-card><div class="usa-card__container"></div></li>
      <li uswds-card><div class="usa-card__container"></div></li>
    </uswds-card-group>
  `,
})
class CardGroupHostComponent {}

@Component({
  standalone: false,
  template: `
    <uswds-card-header><h2>Title</h2></uswds-card-header>
    <uswds-card-body><p>Body text</p></uswds-card-body>
    <uswds-card-footer><button>Action</button></uswds-card-footer>
  `,
})
class CardPartsHostComponent {}

// ---------------------------------------------------------------------------
// USWDSCardComponent
// ---------------------------------------------------------------------------

describe('USWDSCardComponent', () => {
  let fixture: ComponentFixture<CardHostComponent>;
  let host: CardHostComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardHostComponent],
      imports: [USWDSCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const card = fixture.debugElement.query(By.css('[uswds-card]'));
    expect(card).toBeTruthy();
  });

  it('applies usa-card host class', () => {
    const card = fixture.debugElement.query(By.css('[uswds-card]'));
    expect(card.nativeElement.classList).toContain('usa-card');
  });

  it('does not apply flag class by default', () => {
    const card = fixture.debugElement.query(By.css('[uswds-card]'));
    expect(card.nativeElement.classList).not.toContain('usa-card--flag');
  });

  it('does not apply header-first class by default', () => {
    const card = fixture.debugElement.query(By.css('[uswds-card]'));
    expect(card.nativeElement.classList).not.toContain('usa-card--header-first');
  });

  it('does not apply media-right class by default', () => {
    const card = fixture.debugElement.query(By.css('[uswds-card]'));
    expect(card.nativeElement.classList).not.toContain('usa-card--media-right');
  });

  it('applies usa-card--flag when flagView is true', () => {
    host.flagView = true;
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('[uswds-card]'));
    expect(card.nativeElement.classList).toContain('usa-card--flag');
  });

  it('applies usa-card--header-first when headerFirst is true', () => {
    host.headerFirst = true;
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('[uswds-card]'));
    expect(card.nativeElement.classList).toContain('usa-card--header-first');
  });

  it('applies usa-card--media-right when flagMediaRight is true', () => {
    host.flagMediaRight = true;
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('[uswds-card]'));
    expect(card.nativeElement.classList).toContain('usa-card--media-right');
  });

  it('removes flag class when flagView is toggled back to false', () => {
    host.flagView = true;
    fixture.detectChanges();
    host.flagView = false;
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('[uswds-card]'));
    expect(card.nativeElement.classList).not.toContain('usa-card--flag');
  });

  it('can have all flag classes simultaneously', () => {
    host.flagView = true;
    host.headerFirst = true;
    host.flagMediaRight = true;
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('[uswds-card]'));
    expect(card.nativeElement.classList).toContain('usa-card--flag');
    expect(card.nativeElement.classList).toContain('usa-card--header-first');
    expect(card.nativeElement.classList).toContain('usa-card--media-right');
  });

  it('exposes additionalStyles input', () => {
    const card = fixture.debugElement.query(By.css('[uswds-card]'));
    const instance = card.componentInstance;
    expect(instance.additionalStyles).toBeUndefined();
    host.additionalStyles = 'tablet:grid-col-6';
    fixture.detectChanges();
    expect(instance.additionalStyles).toBe('tablet:grid-col-6');
  });
});

// ---------------------------------------------------------------------------
// USWDSCardMediaComponent
// ---------------------------------------------------------------------------

describe('USWDSCardMediaComponent', () => {
  let fixture: ComponentFixture<CardMediaHostComponent>;
  let host: CardMediaHostComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardMediaHostComponent],
      imports: [USWDSCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMediaHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const media = fixture.debugElement.query(By.css('uswds-card-media'));
    expect(media).toBeTruthy();
  });

  it('applies usa-card__media host class', () => {
    const media = fixture.debugElement.query(By.css('uswds-card-media'));
    expect(media.nativeElement.classList).toContain('usa-card__media');
  });

  it('does not apply inset class by default', () => {
    const media = fixture.debugElement.query(By.css('uswds-card-media'));
    expect(media.nativeElement.classList).not.toContain('usa-card__inset');
  });

  it('does not apply exdent class by default', () => {
    const media = fixture.debugElement.query(By.css('uswds-card-media'));
    expect(media.nativeElement.classList).not.toContain('usa-card__exdent');
  });

  it('applies usa-card__inset when inset is true', () => {
    host.inset = true;
    fixture.detectChanges();
    const media = fixture.debugElement.query(By.css('uswds-card-media'));
    expect(media.nativeElement.classList).toContain('usa-card__inset');
  });

  it('applies usa-card__exdent when exdent is true', () => {
    host.exdent = true;
    fixture.detectChanges();
    const media = fixture.debugElement.query(By.css('uswds-card-media'));
    expect(media.nativeElement.classList).toContain('usa-card__exdent');
  });

  it('removes inset class when toggled back to false', () => {
    host.inset = true;
    fixture.detectChanges();
    host.inset = false;
    fixture.detectChanges();
    const media = fixture.debugElement.query(By.css('uswds-card-media'));
    expect(media.nativeElement.classList).not.toContain('usa-card__inset');
  });

  it('can have both inset and exdent simultaneously', () => {
    host.inset = true;
    host.exdent = true;
    fixture.detectChanges();
    const media = fixture.debugElement.query(By.css('uswds-card-media'));
    expect(media.nativeElement.classList).toContain('usa-card__inset');
    expect(media.nativeElement.classList).toContain('usa-card__exdent');
  });

  it('renders the card img wrapper', () => {
    const img = fixture.debugElement.query(By.css('.usa-card__img'));
    expect(img).toBeTruthy();
  });

  it('projects content into the img wrapper', () => {
    const img = fixture.debugElement.query(By.css('.usa-card__img img'));
    expect(img).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// USWDSCardGroupComponent
// ---------------------------------------------------------------------------

describe('USWDSCardGroupComponent', () => {
  let fixture: ComponentFixture<CardGroupHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardGroupHostComponent],
      imports: [USWDSCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardGroupHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const group = fixture.debugElement.query(By.css('uswds-card-group'));
    expect(group).toBeTruthy();
  });

  it('renders a <ul> with class usa-card-group', () => {
    const ul = fixture.debugElement.query(By.css('ul.usa-card-group'));
    expect(ul).toBeTruthy();
  });

  it('projects card children', () => {
    const cards = fixture.debugElement.queryAll(By.css('[uswds-card]'));
    expect(cards.length).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// USWDSCardHeaderComponent, USWDSCardBodyComponent, USWDSCardFooterComponent
// ---------------------------------------------------------------------------

describe('Card sub-components (header, body, footer)', () => {
  let fixture: ComponentFixture<CardPartsHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardPartsHostComponent],
      imports: [USWDSCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPartsHostComponent);
    fixture.detectChanges();
  });

  it('USWDSCardHeaderComponent creates with usa-card__header class', () => {
    const header = fixture.debugElement.query(By.css('uswds-card-header'));
    expect(header).toBeTruthy();
    expect(header.nativeElement.classList).toContain('usa-card__header');
  });

  it('USWDSCardHeaderComponent projects content', () => {
    const h2 = fixture.debugElement.query(By.css('uswds-card-header h2'));
    expect(h2.nativeElement.textContent.trim()).toBe('Title');
  });

  it('USWDSCardBodyComponent creates with usa-card__body class', () => {
    const body = fixture.debugElement.query(By.css('uswds-card-body'));
    expect(body).toBeTruthy();
    expect(body.nativeElement.classList).toContain('usa-card__body');
  });

  it('USWDSCardBodyComponent projects content', () => {
    const p = fixture.debugElement.query(By.css('uswds-card-body p'));
    expect(p.nativeElement.textContent.trim()).toBe('Body text');
  });

  it('USWDSCardFooterComponent creates with usa-card__footer class', () => {
    const footer = fixture.debugElement.query(By.css('uswds-card-footer'));
    expect(footer).toBeTruthy();
    expect(footer.nativeElement.classList).toContain('usa-card__footer');
  });

  it('USWDSCardFooterComponent projects content', () => {
    const btn = fixture.debugElement.query(By.css('uswds-card-footer button'));
    expect(btn.nativeElement.textContent.trim()).toBe('Action');
  });
});
