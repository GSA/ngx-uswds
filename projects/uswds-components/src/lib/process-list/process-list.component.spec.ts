import { ComponentFixture, TestBed } from '@angular/core/testing';

import { USWDSProcessListComponent } from './process-list.component';

describe('ProcessListComponent', () => {
  let component: USWDSProcessListComponent;
  let fixture: ComponentFixture<USWDSProcessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ USWDSProcessListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(USWDSProcessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
