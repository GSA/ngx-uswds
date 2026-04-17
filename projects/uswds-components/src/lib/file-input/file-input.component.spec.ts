import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsaFileInputComponent } from './file-input.component';

describe('USWDSFileInputComponent', () => {
  let component: UsaFileInputComponent;
  let fixture: ComponentFixture<UsaFileInputComponent>;

  beforeEach(waitForAsync (() => {
     TestBed.configureTestingModule({
      declarations: [ UsaFileInputComponent ]
    })
    .compileComponents();
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
