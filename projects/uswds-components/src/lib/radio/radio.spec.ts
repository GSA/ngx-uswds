import { CommonModule } from "@angular/common";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { UsaRadioGroupComponent } from "./radio-group.component";
import { UsaRadioModule } from "./radio.module";

@Component({
  template: `
  <!-- Basic Radio Input -->
  <usa-radio-group #radioGroupA name="historical-figures" (change)="onRadioChange($event)" [ariaLabelledBy]="'historicalFigures1Label'">
    <h4 id="historicalFigures1Label" usaRadioGroupLabel>Historical Figures</h4>
    <usa-radio [id]="'historical-truth'" value="sojourner-truth" [checked]="true">Sojourner Truth</usa-radio>
    <usa-radio [id]="'historical-douglass'" value="frederick-douglass">Frederick Douglass</usa-radio>
    <usa-radio [id]="'historical-washington'" value="booker-t-washington" >Booker T. Washington</usa-radio>
    <usa-radio [disabled]="true" [id]="'historical-carver'" value="george-washington-carver">George Washington Carver</usa-radio>
  </usa-radio-group>

  <!-- Reactive Forms Radio Input -->
  <legend class="usa-legend margin-top-5">Select one historical figure</legend>
  <usa-radio-group #radioGroupB name="historical-figures-2" [formControl]="reactiveFormControl" [tile]="true">
    <usa-radio [id]="'historical-truth-2'" value="sojourner-truth">Sojourner Truth</usa-radio>
    <usa-radio [id]="'historical-douglass-2'" value="frederick-douglass">Frederick Douglass</usa-radio>
    <usa-radio [id]="'historical-washington-2'" value="booker-t-washington" >Booker T. Washington</usa-radio>
    <usa-radio [disabled]="true" [id]="'historical-carver-2'" value="george-washington-carver">George Washington Carver</usa-radio>
  </usa-radio-group>
  `
})
class RadioTestComponent {
  @ViewChild('radioGroupA') radioGroupA: UsaRadioGroupComponent;
  @ViewChild('radioGroupB') radioGroupB: UsaRadioGroupComponent;

  reactiveFormControl = new FormControl();

  constructor(public elementRef: ElementRef) {}

  onRadioChange($event: any) {
    // Left Empty for Mocking
  }
}

describe('Radio Component', () => {
  let fixture: ComponentFixture<RadioTestComponent>
  let component: RadioTestComponent;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [
        CommonModule,
        UsaRadioModule,
        ReactiveFormsModule,
      ],
      declarations: [
        RadioTestComponent
      ]
    }).createComponent(RadioTestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('Should initialize test component', () => {
    expect(component).toBeDefined();
    expect(component.radioGroupA).toBeDefined();
    expect(component.radioGroupA.radioComponents).toBeDefined();
    expect(component.radioGroupA.radioComponents.first.checked).toEqual(true);

    expect(component.radioGroupB).toBeDefined();
    expect(component.radioGroupB.radioComponents).toBeDefined();
    expect(component.radioGroupB.radioComponents.first.checked).toBeFalsy();
  });

  /** Tests for basic radio inputs */

  it('Should emit change event when a radio option is selected', () => {
    const eventSpy = spyOn(component, 'onRadioChange');
    const bookerTWashingtonRadioInput: HTMLInputElement = component.elementRef.nativeElement.querySelector('#historical-washington');
    bookerTWashingtonRadioInput.click();
    fixture.detectChanges();
    expect(eventSpy).toHaveBeenCalledWith({target: bookerTWashingtonRadioInput, value: 'booker-t-washington'});
  });

  it('Should not emit change event when disabled radio option is selected', () => {
    const eventSpy = spyOn(component, 'onRadioChange');
    const georgeWCarverRadioInput: HTMLInputElement = component.elementRef.nativeElement.querySelector('#historical-carver');
    georgeWCarverRadioInput.click();
    fixture.detectChanges();
    expect(eventSpy).not.toHaveBeenCalledWith({target: georgeWCarverRadioInput, value: 'george-washington-carver'})
  });

  /** Tests for radio input with reactive forms */

  it('Should update form control when radio option is selected', () => {
    const bookerTWashingtonRadioInput: HTMLInputElement = component.elementRef.nativeElement.querySelector('#historical-washington-2');
    bookerTWashingtonRadioInput.click();
    fixture.detectChanges();
    expect(component.reactiveFormControl.value).toEqual('booker-t-washington');
  });

  it('Should update radio option when form value programatically updates', () => {
    component.reactiveFormControl.setValue('frederick-douglass');
    fixture.detectChanges();
    const checkedRadioOption = component.radioGroupB.radioComponents.find(radioComponent => radioComponent.value === 'frederick-douglass');
    expect(checkedRadioOption.checked).toEqual(true);
  })
})