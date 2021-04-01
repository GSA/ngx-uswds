import { ComponentFixture, TestBed } from '@angular/core/testing';

import { USWDSLinkComponent } from './link.component';

describe('USWDSLinkComponent', () => {
  let component: USWDSLinkComponent;
  let fixture: ComponentFixture<USWDSLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ USWDSLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(USWDSLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
