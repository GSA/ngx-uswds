import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsaStepIndicatorComponent } from './step-indicator.component';

describe('StepIndicatorComponent', () => {
  let component: UsaStepIndicatorComponent;
  let fixture: ComponentFixture<UsaStepIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsaStepIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaStepIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
