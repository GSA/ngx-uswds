import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsaComboBoxComponent } from './combo-box.component';

describe('ComboboxComponent', () => {
  let component: UsaComboBoxComponent;
  let fixture: ComponentFixture<UsaComboBoxComponent>;

  beforeEach(waitForAsync (() => {
     TestBed.configureTestingModule({
      declarations: [ UsaComboBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaComboBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
