import { ComponentFixture, TestBed } from '@angular/core/testing';

import { USWDSDropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: USWDSDropdownComponent;
  let fixture: ComponentFixture<USWDSDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ USWDSDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(USWDSDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
