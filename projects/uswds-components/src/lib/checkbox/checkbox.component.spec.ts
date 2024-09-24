import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsaCheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: UsaCheckboxComponent;
  let fixture: ComponentFixture<UsaCheckboxComponent>;

  beforeEach(waitForAsync (() => {
     TestBed.configureTestingModule({
      declarations: [ UsaCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
