import { ComponentFixture, TestBed } from '@angular/core/testing';

import { USWDSCardComponent } from './card.component';

describe('CardComponent', () => {
  let component: USWDSCardComponent;
  let fixture: ComponentFixture<USWDSCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ USWDSCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(USWDSCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
