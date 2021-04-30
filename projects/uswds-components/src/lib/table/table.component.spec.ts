import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsaTableComponent } from './table.component';

describe('TableComponent', () => {
  let component: UsaTableComponent;
  let fixture: ComponentFixture<UsaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsaTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
