import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyForm, FormlyModule } from '@ngx-formly/core';
import { USWDSFormlyDatePickerComponent } from './datepicker';
import { UsaDatePickerModule } from '@gsa-sam/ngx-uswds';

const createTestComponent = (html: string) =>
  createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

export function createGenericTestComponent<T>(html: string, type: { new(...args: any[]): T }): ComponentFixture<T> {
  TestBed.overrideComponent(type, { set: { template: html } });
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture as ComponentFixture<T>;
}

let datePickerComponent;

describe('Formly Field Datepicker Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, USWDSFormlyDatePickerComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        UsaDatePickerModule,
        FormlyModule.forRoot({
          types: [
            {
              name: 'datepicker',
              component: USWDSFormlyDatePickerComponent,
            },
          ],
        }),
      ],
    });
  });

  describe('datepicker', () => {
    beforeEach(() => {
        datePickerComponent = {
        form: new FormGroup({}),
        model: {},
      };
    });

    it('should correctly bind to a object of data', () => {
        datePickerComponent.fields = [    {
            key: 'datepicker',
            type: 'datepicker',
            templateOptions: {
              label: 'Start date'
            },
          }
      ];
      const fixture = createTestComponent('<formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>');
      fixture.detectChanges();
      expect(fixture).toBeTruthy();
    });
  });
});

@Component({ selector: 'formly-form-test', template: '', entryComponents: [] })
class TestComponent {
  @ViewChild(FormlyForm, { static: false }) formlyForm: FormlyForm;
  fields = datePickerComponent.fields;
  form: FormGroup = datePickerComponent.form;
  model = datePickerComponent.model || {};
}