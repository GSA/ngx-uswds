import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsaHeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: UsaHeaderComponent;
  let fixture: ComponentFixture<UsaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsaHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
