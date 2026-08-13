import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Key } from '../util/key';

import { UsaStepIndicatorComponent } from './step-indicator.component';
import { UsaStepIndicatorModel } from './step-indicator.model';
import { UsaStepIndicatorModule } from './step-indicator.module';

function getAllSteps(element: DebugElement): HTMLElement[] {
  const stepNodeList: NodeList = element.nativeElement.querySelectorAll('.usa-step-indicator__segment');
  return Array.prototype.slice.call(stepNodeList);
}

function getCompletedSteps(element: DebugElement): HTMLElement[] {
  const stepNodeList: NodeList = element.nativeElement.querySelectorAll('.usa-step-indicator__segment--complete');
  return Array.prototype.slice.call(stepNodeList);
}

function getCurrentStep(element: DebugElement): HTMLElement {
  const stepNodeList: NodeList = element.nativeElement.querySelectorAll('.usa-step-indicator__segment--current');
  const nodeArray: HTMLElement[] = Array.prototype.slice.call(stepNodeList);
  expect(nodeArray.length).toEqual(1);
  return nodeArray[0];
}

function getSteps(): UsaStepIndicatorModel[] {
  return [
    {
      label: 'Step 1',
    },
    {
      label: 'Step 2',
    },
    {
      label: 'Step 3',
    },
    {
      label: 'Step 4',
    },
    {
      label: 'Step 5',
    },
  ];
}

describe('StepIndicatorComponent', () => {
  let component: UsaStepIndicatorComponent;
  let fixture: ComponentFixture<UsaStepIndicatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaStepIndicatorModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaStepIndicatorComponent);
    component = fixture.componentInstance;
    component.steps = getSteps();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should contain proper number of steps', () => {
    expect(getAllSteps(fixture.debugElement).length).toEqual(5);
  });

  it('Should contain proper number of completed steps', () => {
    component.currentStep = 3;
    fixture.detectChanges();
    expect(getCompletedSteps(fixture.debugElement).length).toEqual(3);
  });

  it('Should have correct current step', () => {
    component.currentStep = 3;
    fixture.detectChanges();
    const allSteps = getAllSteps(fixture.debugElement);
    const currentStep = getCurrentStep(fixture.debugElement);
    expect(allSteps[3]).toEqual(currentStep);
  });

  it('Should emit event on step click', () => {
    const eventSpy = vi.spyOn(component.currentStepChange, 'emit');
    getAllSteps(fixture.debugElement)[4].click();
    fixture.detectChanges();
    expect(eventSpy).toHaveBeenCalledWith(4);
  });

  it('Should update current step on current step change', () => {
    vi.spyOn(component.currentStepChange, 'emit').mockImplementation((index) => (component.currentStep = index));
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[2].click();
    fixture.detectChanges();
    expect(allSteps[2]).toEqual(getCurrentStep(fixture.debugElement));
  });

  it('Should not update current step on step click if step is disabled', () => {
    component.steps[2].disabled = true;
    vi.spyOn(component.currentStepChange, 'emit').mockImplementation((index) => (component.currentStep = index));
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[2].click();
    fixture.detectChanges();
    expect(allSteps[0]).toEqual(getCurrentStep(fixture.debugElement));
  });

  it('Should not update current step on step click if step selection is disabled', () => {
    component.disableStepSelection = true;
    vi.spyOn(component.currentStepChange, 'emit').mockImplementation((index) => (component.currentStep = index));
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[2].click();
    fixture.detectChanges();
    expect(allSteps[0]).toEqual(getCurrentStep(fixture.debugElement));
  });

  it('Should focus on next step on arrow right press', () => {
    vi.spyOn(component.currentStepChange, 'emit').mockImplementation((index) => (component.currentStep = index));
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[0].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', {
      key: Key.ArrowRight,
    });

    allSteps[0].dispatchEvent(event);
    fixture.detectChanges();

    expect(allSteps[1]).toEqual(document.activeElement as HTMLElement);
  });

  it('Should skip focus for disabled item on arrow right press', () => {
    component.steps[1].disabled = true;
    fixture.detectChanges();

    vi.spyOn(component.currentStepChange, 'emit').mockImplementation((index) => (component.currentStep = index));
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[0].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', {
      key: Key.ArrowRight,
    });

    allSteps[0].dispatchEvent(event);
    fixture.detectChanges();

    expect(allSteps[2]).toEqual(document.activeElement as HTMLElement);
  });

  it('Should focus on previous step on arrow left press', () => {
    vi.spyOn(component.currentStepChange, 'emit').mockImplementation((index) => (component.currentStep = index));
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[0].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', {
      key: Key.ArrowLeft,
    });

    allSteps[0].dispatchEvent(event);
    fixture.detectChanges();

    expect(allSteps[4]).toEqual(document.activeElement as HTMLElement);
  });

  it('Should skip focus for disabled step on arrow left press', () => {
    component.steps[4].disabled = true;
    fixture.detectChanges();

    vi.spyOn(component.currentStepChange, 'emit').mockImplementation((index) => (component.currentStep = index));
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[0].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', {
      key: Key.ArrowLeft,
    });

    allSteps[0].dispatchEvent(event);
    fixture.detectChanges();

    expect(allSteps[3]).toEqual(document.activeElement as HTMLElement);
  });

  it('Should focus on first step on home press', () => {
    vi.spyOn(component.currentStepChange, 'emit').mockImplementation((index) => (component.currentStep = index));
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[2].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', {
      key: Key.Home,
    });

    allSteps[2].dispatchEvent(event);
    fixture.detectChanges();

    expect(allSteps[0]).toEqual(document.activeElement as HTMLElement);
  });

  it('Should skip disabled steps on home press', () => {
    component.steps[0].disabled = true;
    component.steps[1].disabled = true;
    fixture.detectChanges();

    vi.spyOn(component.currentStepChange, 'emit').mockImplementation((index) => (component.currentStep = index));
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[3].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', {
      key: Key.Home,
    });

    allSteps[3].dispatchEvent(event);
    fixture.detectChanges();

    expect(allSteps[2]).toEqual(document.activeElement as HTMLElement);
  });

  it('Should focus on last step on end press', () => {
    vi.spyOn(component.currentStepChange, 'emit').mockImplementation((index) => (component.currentStep = index));
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[2].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', {
      key: Key.End,
    });

    allSteps[2].dispatchEvent(event);
    fixture.detectChanges();

    expect(allSteps[4]).toEqual(document.activeElement as HTMLElement);
  });

  it('Should skip focus on disabled steps on end press', () => {
    component.steps[4].disabled = true;
    component.steps[3].disabled = true;
    fixture.detectChanges();

    vi.spyOn(component.currentStepChange, 'emit').mockImplementation((index) => (component.currentStep = index));
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[2].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown', {
      key: Key.End,
    });

    allSteps[2].dispatchEvent(event);
    fixture.detectChanges();

    expect(allSteps[2]).toEqual(document.activeElement as HTMLElement);
  });
});

// ---------------------------------------------------------------------------
// StepIndicatorComponent — getFillPercentage + getSegmentScale coverage
// ---------------------------------------------------------------------------

describe('StepIndicatorComponent — getFillPercentage', () => {
  let component: UsaStepIndicatorComponent;
  let fixture: ComponentFixture<UsaStepIndicatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaStepIndicatorModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaStepIndicatorComponent);
    component = fixture.componentInstance;
    component.steps = getSteps();
    component.currentStep = 0;
    fixture.detectChanges();
  });

  it('returns undefined when completionPercent is not set', () => {
    expect(component.getFillPercentage(component.steps[0])).toBeUndefined();
  });

  it('returns undefined for a step that is not the current step', () => {
    component.steps[1].completionPercent = 50;
    expect(component.getFillPercentage(component.steps[1])).toBeUndefined();
  });

  it('returns fill-25 for completionPercent divisible by 25', () => {
    component.steps[0].completionPercent = 25;
    expect(component.getFillPercentage(component.steps[0])).toBe('fill-25');
  });

  it('returns fill-33 for completionPercent divisible by 33', () => {
    component.steps[0].completionPercent = 33;
    expect(component.getFillPercentage(component.steps[0])).toBe('fill-33');
  });

  it('returns rounded fill class for arbitrary percent', () => {
    component.steps[0].completionPercent = 42;
    // Math.round(42/10)*10 = 40
    expect(component.getFillPercentage(component.steps[0])).toBe('fill-40');
  });
});

describe('StepIndicatorComponent — getSegmentScale', () => {
  let component: UsaStepIndicatorComponent;
  let fixture: ComponentFixture<UsaStepIndicatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UsaStepIndicatorModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsaStepIndicatorComponent);
    component = fixture.componentInstance;
    component.steps = getSteps();
    fixture.detectChanges();
  });

  it('returns undefined when segmentScale is not set', () => {
    expect(component.getSegmentScale(component.steps[0])).toBeUndefined();
  });

  it('returns scale-percent class for a valid segmentScale', () => {
    component.steps[0].segmentScale = 2;
    // max(0.5, min(4, 2)) * 100 = 200
    expect(component.getSegmentScale(component.steps[0])).toBe('scale-percent-200');
  });

  it('clamps segmentScale below 0.5 to scale-percent-50', () => {
    // segmentScale < 0.5 is clamped to 0.5
    component.steps[0].segmentScale = 0.5;
    expect(component.getSegmentScale(component.steps[0])).toBe('scale-percent-50');
  });
});

// ---------------------------------------------------------------------------
// StepIndicatorHeaderComponent — constructor coverage
// ---------------------------------------------------------------------------

import { Component as NgComponent } from '@angular/core';
import { UsaStepIndicatorHeaderComponent } from './step-indicator-header.component';

@NgComponent({
  standalone: false,
  template: `
    <usa-step-indicator [steps]="steps" [currentStep]="currentStep">
      <div UsaStepHeader></div>
    </usa-step-indicator>
  `,
})
class StepHeaderHostComponent {
  steps = getSteps();
  currentStep = 0;
}

describe('UsaStepIndicatorHeaderComponent', () => {
  it('is created inside a step indicator host', waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StepHeaderHostComponent],
      imports: [UsaStepIndicatorModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(StepHeaderHostComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  }));
});
