import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Key } from '../util/key';

import { UsaStepIndicatorComponent } from './step-indicator.component';
import { UsaStepIndicatorModel } from './step-indicator.model';

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
    }
  ];
}

describe('StepIndicatorComponent', () => {
  let component: UsaStepIndicatorComponent;
  let fixture: ComponentFixture<UsaStepIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsaStepIndicatorComponent ]
    })
    .compileComponents();
  });

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
    expect(getAllSteps(fixture.debugElement).length).toEqual(5)
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
    const eventSpy = spyOn(component.currentStepChange, 'emit');
    getAllSteps(fixture.debugElement)[4].click();
    fixture.detectChanges();
    expect(eventSpy).toHaveBeenCalledWith(4);
  });

  it('Should update current step on current step change', () => {
    spyOn(component.currentStepChange, 'emit').and.callFake((index) => component.currentStep = index);
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[2].click();
    fixture.detectChanges();
    expect(allSteps[2]).toEqual(getCurrentStep(fixture.debugElement));
  });

  it('Should not update current step on step click if step is disabled', () => {
    component.steps[2].disabled = true;
    spyOn(component.currentStepChange, 'emit').and.callFake((index) => component.currentStep = index);
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[2].click();
    fixture.detectChanges();
    expect(allSteps[0]).toEqual(getCurrentStep(fixture.debugElement));
  });

  it('Should not update current step on step click if step selection is disabled', () => {
    component.disableStepSelection = true;
    spyOn(component.currentStepChange, 'emit').and.callFake((index) => component.currentStep = index);
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[2].click();
    fixture.detectChanges();
    expect(allSteps[0]).toEqual(getCurrentStep(fixture.debugElement));
  });

  it('Should focus on next step on arrow right press', () => {
    spyOn(component.currentStepChange, 'emit').and.callFake((index) => component.currentStep = index);
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[0].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown',{
      key: Key.ArrowRight
    });

    allSteps[0].dispatchEvent(event);
    fixture.detectChanges();

    expect(allSteps[1]).toEqual(document.activeElement as HTMLElement);
  });

  it('Should skip focus for disabled item on arrow right press', () => {
    component.steps[1].disabled = true;
    fixture.detectChanges();

    spyOn(component.currentStepChange, 'emit').and.callFake((index) => component.currentStep = index);
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[0].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown',{
      key: Key.ArrowRight
    });

    allSteps[0].dispatchEvent(event);
    fixture.detectChanges();

    expect(allSteps[2]).toEqual(document.activeElement as HTMLElement);
  });

  it('Should focus on previous step on arrow left press', () => {
    spyOn(component.currentStepChange, 'emit').and.callFake((index) => component.currentStep = index);
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[0].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown',{
      key: Key.ArrowLeft
    });

    allSteps[0].dispatchEvent(event);
    fixture.detectChanges();

    expect(allSteps[4]).toEqual(document.activeElement as HTMLElement);
  });

  it('Should skip focus for disabled step on arrow left press', () => {
    component.steps[4].disabled = true;
    fixture.detectChanges();

    spyOn(component.currentStepChange, 'emit').and.callFake((index) => component.currentStep = index);
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[0].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown',{
      key: Key.ArrowLeft
    });

    allSteps[0].dispatchEvent(event);
    fixture.detectChanges();

    expect(allSteps[3]).toEqual(document.activeElement as HTMLElement);
  });

  it('Should focus on first step on home press', () => {
    spyOn(component.currentStepChange, 'emit').and.callFake((index) => component.currentStep = index);
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[2].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown',{
      key: Key.Home
    });

    allSteps[2].dispatchEvent(event);
    fixture.detectChanges();

    expect(allSteps[0]).toEqual(document.activeElement as HTMLElement);
  });

  it('Should skip disabled steps on home press', () => {
    component.steps[0].disabled = true;
    component.steps[1].disabled = true;
    fixture.detectChanges();

    spyOn(component.currentStepChange, 'emit').and.callFake((index) => component.currentStep = index);
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[3].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown',{
      key: Key.Home
    });

    allSteps[3].dispatchEvent(event);
    fixture.detectChanges();

    expect(allSteps[2]).toEqual(document.activeElement as HTMLElement);
  });

  it('Should focus on last step on end press', () => {
    spyOn(component.currentStepChange, 'emit').and.callFake((index) => component.currentStep = index);
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[2].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown',{
      key: Key.End
    });

    allSteps[2].dispatchEvent(event);
    fixture.detectChanges();

    expect(allSteps[4]).toEqual(document.activeElement as HTMLElement);
  });

  it('Should skip focus on disabled steps on end press', () => {
    component.steps[4].disabled = true;
    component.steps[3].disabled = true;
    fixture.detectChanges();

    spyOn(component.currentStepChange, 'emit').and.callFake((index) => component.currentStep = index);
    const allSteps = getAllSteps(fixture.debugElement);
    allSteps[2].click();
    fixture.detectChanges();

    const event = new KeyboardEvent('keydown',{
      key: Key.End
    });

    allSteps[2].dispatchEvent(event);
    fixture.detectChanges();

    expect(allSteps[2]).toEqual(document.activeElement as HTMLElement);
  });
});
