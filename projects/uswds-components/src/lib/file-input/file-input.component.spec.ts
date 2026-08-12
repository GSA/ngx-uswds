import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsaFileInputComponent } from './file-input.component';
import { UsaFileInputModule } from './file-input.module';

describe('USWDSFileInputComponent', () => {
  let component: UsaFileInputComponent;
  let fixture: ComponentFixture<UsaFileInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaFileInputModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
