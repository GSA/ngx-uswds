import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsaFileInputComponent } from './file-input.component';

describe('USWDSFileInputComponent', () => {
  let component: UsaFileInputComponent;
  let fixture: ComponentFixture<UsaFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsaFileInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
