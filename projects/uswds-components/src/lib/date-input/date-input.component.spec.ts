import { ComponentFixture, TestBed } from '@angular/core/testing';

import { USWDSDateInputComponent } from './date-input.component';

describe('DataInputComponent', () => {
  let component: USWDSDateInputComponent;
  let fixture: ComponentFixture<USWDSDateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ USWDSDateInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(USWDSDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
