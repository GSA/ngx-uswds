import { ComponentFixture, TestBed } from '@angular/core/testing';

import { USWDSAlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: USWDSAlertComponent;
  let fixture: ComponentFixture<USWDSAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ USWDSAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(USWDSAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
