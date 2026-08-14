import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { USWDSCardModule } from './card.module';
import { USWDSCardComponent } from './card.component';
import { USWDSCardMediaComponent } from './card-media.component';
import { USWDSCardGroupComponent } from './card-group.component';
import { USWDSCardBodyComponent } from './card-body.component';
import { USWDSCardHeaderComponent } from './card-header.component';
import { USWDSCardFooterComponent } from './card-footer.component';

// ---------------------------------------------------------------------------
// Host wrappers
// ---------------------------------------------------------------------------

@Component({
  standalone: false,
  template: `<li
    uswds-card
    [flagView]="flagView"
    [headerFirst]="headerFirst"
    [flagMediaRight]="flagMediaRight"
    [additionalStyles]="additionalStyles"
  ></li>`,
})
class CardHostComponent {
  flagView = false;
  headerFirst = false;
  flagMediaRight = false;
  additionalStyles = '';
}

@Component({
  standalone: false,
  template: `<uswds-card-media [inset]="inset" [exdent]="exdent"></uswds-card-media>`,
})
class CardMediaHostComponent {
  inset = false;
  exdent = false;
}

// ---------------------------------------------------------------------------
// USWDSCardComponent
// ---------------------------------------------------------------------------

describe('USWDSCardComponent', () => {
  let fixture: ComponentFixture<CardHostComponent>;
  let host: CardHostComponent;
  let cardEl: HTMLElement;

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
    cardEl = fixture.nativeElement.querySelector('li');
  });

  it('should create', () => {
    const comp = fixture.debugElement.query(By.directive(USWDSCardComponent));
    expect(comp).toBeTruthy();
  });

  it('applies usa-card host class by default', () => {
    expect(cardEl.classList).toContain('usa-card');
  });

  it('does not apply flag/header-first classes by default', () => {
    expect(cardEl.classList).not.toContain('usa-card--flag');
    expect(cardEl.classList).not.toContain('usa-card--header-first');
    expect(cardEl.classList).not.toContain('usa-card--media-right');
  });

  it('applies usa-card--flag when flagView is true', () => {
    host.flagView = true;
    fixture.detectChanges();
    expect(cardEl.classList).toContain('usa-card--flag');
  });

  it('applies usa-card--header-first when headerFirst is true', () => {
    host.headerFirst = true;
    fixture.detectChanges();
    expect(cardEl.classList).toContain('usa-card--header-first');
  });

  it('applies usa-card--media-right when flagMediaRight is true', () => {
    host.flagMediaRight = true;
    fixture.detectChanges();
    expect(cardEl.classList).toContain('usa-card--media-right');
  });

  it('exposes additionalStyles input', () => {
    host.additionalStyles = 'tablet:grid-col-6';
    fixture.detectChanges();

    const comp = fixture.debugElement.query(By.directive(USWDSCardComponent));
    expect((comp.componentInstance as USWDSCardComponent).additionalStyles).toBe('tablet:grid-col-6');
  });

  it('renders card container div inside host element', () => {
    const container = cardEl.querySelector('.usa-card__container');
    expect(container).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// USWDSCardMediaComponent
// ---------------------------------------------------------------------------

describe('USWDSCardMediaComponent', () => {
  let fixture: ComponentFixture<CardMediaHostComponent>;
  let host: CardMediaHostComponent;
  let mediaEl: HTMLElement;

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
    mediaEl = fixture.nativeElement.querySelector('uswds-card-media');
  });

  it('should create', () => {
    const comp = fixture.debugElement.query(By.directive(USWDSCardMediaComponent));
    expect(comp).toBeTruthy();
  });

  it('applies usa-card__media host class by default', () => {
    expect(mediaEl.classList).toContain('usa-card__media');
  });

  it('does not apply inset/exdent by default', () => {
    expect(mediaEl.classList).not.toContain('usa-card__inset');
    expect(mediaEl.classList).not.toContain('usa-card__exdent');
  });

  it('applies usa-card__inset when inset is true', () => {
    host.inset = true;
    fixture.detectChanges();
    expect(mediaEl.classList).toContain('usa-card__inset');
  });

  it('applies usa-card__exdent when exdent is true', () => {
    host.exdent = true;
    fixture.detectChanges();
    expect(mediaEl.classList).toContain('usa-card__exdent');
  });

  it('renders the img wrapper div', () => {
    expect(mediaEl.querySelector('.usa-card__img')).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// USWDSCardGroupComponent
// ---------------------------------------------------------------------------

describe('USWDSCardGroupComponent', () => {
  let fixture: ComponentFixture<USWDSCardGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [USWDSCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(USWDSCardGroupComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders a usa-card-group ul', () => {
    const ul = fixture.nativeElement.querySelector('ul.usa-card-group');
    expect(ul).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// USWDSCardBodyComponent
// ---------------------------------------------------------------------------

describe('USWDSCardBodyComponent', () => {
  let fixture: ComponentFixture<USWDSCardBodyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [USWDSCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(USWDSCardBodyComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has usa-card__body host class', () => {
    expect((fixture.nativeElement as HTMLElement).classList).toContain('usa-card__body');
  });
});

// ---------------------------------------------------------------------------
// USWDSCardHeaderComponent
// ---------------------------------------------------------------------------

describe('USWDSCardHeaderComponent', () => {
  let fixture: ComponentFixture<USWDSCardHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [USWDSCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(USWDSCardHeaderComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has usa-card__header host class', () => {
    expect((fixture.nativeElement as HTMLElement).classList).toContain('usa-card__header');
  });
});

// ---------------------------------------------------------------------------
// USWDSCardFooterComponent
// ---------------------------------------------------------------------------

describe('USWDSCardFooterComponent', () => {
  let fixture: ComponentFixture<USWDSCardFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [USWDSCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(USWDSCardFooterComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has usa-card__footer host class', () => {
    expect((fixture.nativeElement as HTMLElement).classList).toContain('usa-card__footer');
  });
});
