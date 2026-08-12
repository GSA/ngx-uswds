import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsaCheckboxComponent } from './checkbox.component';
import { UsaCheckboxModule } from './checkbox.module';

describe('CheckboxComponent', () => {
  let component: UsaCheckboxComponent;
  let fixture: ComponentFixture<UsaCheckboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaCheckboxModule],
    }).compileComponents();
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
