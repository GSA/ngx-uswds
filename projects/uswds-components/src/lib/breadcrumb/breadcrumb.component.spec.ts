import { ComponentFixture, TestBed } from '@angular/core/testing';

import { USWDSBreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: USWDSBreadcrumbComponent;
  let fixture: ComponentFixture<USWDSBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ USWDSBreadcrumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(USWDSBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
