import { ComponentFixture, TestBed } from '@angular/core/testing';

import { USWDSFileInputComponent } from './file-input.component';

describe('USWDSFileInputComponent', () => {
  let component: USWDSFileInputComponent;
  let fixture: ComponentFixture<USWDSFileInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ USWDSFileInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(USWDSFileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
