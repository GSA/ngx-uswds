import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { USWDSButtonGroupModule } from './button-group.module';

// ---------------------------------------------------------------------------
// Host components
// ---------------------------------------------------------------------------

@Component({
  standalone: false,
  template: `
    <uswds-button-group [isSegmented]="isSegmented">
      <uswds-button-group-item><button>One</button></uswds-button-group-item>
      <uswds-button-group-item><button>Two</button></uswds-button-group-item>
    </uswds-button-group>
  `,
})
class HostComponent {
  isSegmented = false;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('USWDSButtonGroupComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [USWDSButtonGroupModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the button group', () => {
    const el = fixture.debugElement.query(By.css('uswds-button-group'));
    expect(el).toBeTruthy();
  });

  it('renders a <ul> with class usa-button-group', () => {
    const ul = fixture.debugElement.query(By.css('ul.usa-button-group'));
    expect(ul).toBeTruthy();
  });

  it('does not have segmented class by default', () => {
    const ul = fixture.debugElement.query(By.css('ul.usa-button-group'));
    expect(ul.nativeElement.classList).not.toContain('usa-button-group--segmented');
  });

  it('adds segmented class when isSegmented is true', () => {
    host.isSegmented = true;
    fixture.detectChanges();
    const ul = fixture.debugElement.query(By.css('ul.usa-button-group'));
    expect(ul.nativeElement.classList).toContain('usa-button-group--segmented');
  });

  it('removes segmented class when isSegmented is toggled back to false', () => {
    host.isSegmented = true;
    fixture.detectChanges();
    host.isSegmented = false;
    fixture.detectChanges();
    const ul = fixture.debugElement.query(By.css('ul.usa-button-group'));
    expect(ul.nativeElement.classList).not.toContain('usa-button-group--segmented');
  });

  it('projects button-group-item children', () => {
    const items = fixture.debugElement.queryAll(By.css('uswds-button-group-item'));
    expect(items.length).toBe(2);
  });
});

describe('USWDSButtonGroupItemComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [USWDSButtonGroupModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('applies usa-button-group__item host class', () => {
    const items = fixture.debugElement.queryAll(By.css('uswds-button-group-item'));
    items.forEach((item) => {
      expect(item.nativeElement.classList).toContain('usa-button-group__item');
    });
  });

  it('projects button content', () => {
    const buttons = fixture.debugElement.queryAll(By.css('uswds-button-group-item button'));
    expect(buttons.length).toBe(2);
  });
});
