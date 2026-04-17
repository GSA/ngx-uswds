import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { USWDSCardComponent } from './card.component';

describe('CardComponent', () => {
  let component: USWDSCardComponent;
  let fixture: ComponentFixture<USWDSCardComponent>;

  beforeEach(waitForAsync( () => {
     TestBed.configureTestingModule({
      declarations: [ USWDSCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(USWDSCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
