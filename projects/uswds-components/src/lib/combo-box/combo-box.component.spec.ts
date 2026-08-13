import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsaComboBoxComponent } from './combo-box.component';
import { UsaComboboxModule } from './combo-box.module';

describe('ComboboxComponent', () => {
  let component: UsaComboBoxComponent;
  let fixture: ComponentFixture<UsaComboBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaComboboxModule],
    }).compileComponents();
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
