import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyInputComponent } from './input.component';

describe('FormlyInputComponent', () => {
  let component: FormlyInputComponent;
  let fixture: ComponentFixture<FormlyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormlyInputComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
