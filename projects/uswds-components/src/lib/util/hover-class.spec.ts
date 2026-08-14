import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HoverClassModule, HoverClassDirective } from './hover-class';

@Component({
  standalone: false,
  template: `<div hover-class="hovered-class">hover target</div>`,
})
class HostComponent {}

describe('HoverClassDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let divEl: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [HoverClassModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    divEl = fixture.debugElement.query(By.directive(HoverClassDirective)).nativeElement;
  });

  it('creates the directive', () => {
    const dir = fixture.debugElement.query(By.directive(HoverClassDirective));
    expect(dir).toBeTruthy();
  });

  it('adds the hover class on mouseenter', () => {
    divEl.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    expect(divEl.classList).toContain('hovered-class');
  });

  it('removes the hover class on mouseleave', () => {
    divEl.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    divEl.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();
    expect(divEl.classList).not.toContain('hovered-class');
  });
});
