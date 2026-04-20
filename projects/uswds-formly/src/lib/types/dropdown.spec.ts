import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyForm, FormlyModule } from '@ngx-formly/core';
import { USWDSFormlyDropdownComponent } from './dropdown';
import { UsaDropdownModule } from '@gsa-sam/ngx-uswds';

const createTestComponent = (html: string) =>
  createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

export function createGenericTestComponent<T>(html: string, type: { new(...args: any[]): T }): ComponentFixture<T> {
  TestBed.overrideComponent(type, { set: { template: html } });
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture as ComponentFixture<T>;
}

let dropDownComponent;

describe('Formly Field Dropdown Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, USWDSFormlyDropdownComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        UsaDropdownModule,
        FormlyModule.forRoot({
          types: [
            {
              name: 'dropdown',
              component: USWDSFormlyDropdownComponent,
            },
          ],
        }),
      ],
    });
  });

  describe('dropdown', () => {
    beforeEach(() => {
        dropDownComponent = {
        form: new FormGroup({}),
        model: {},
      };
    });

    it('should correctly bind to a object of data', () => {
        dropDownComponent.fields = [{
            key: 'dropdown',
            type: 'dropdown',
            templateOptions: {
              label: 'Dropdown',
              options: [
                {
                  label: 'Option A',
                  value: 'A',
                  disabled: false
                },
                {
                  label: 'Option B',
                  value: 'B',
                  disabled: false
                },
                {
                  label: 'Option C',
                  value: 'C',
                  disabled: false
                },
                {
                  label: 'Option D',
                  value: 'D',
                  disabled: false
                },
                {
                  label: 'Option E',
                  value: 'E',
                  disabled: false
                }
              ]
            }
          }];
      const fixture = createTestComponent('<formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>');
      fixture.detectChanges();
      expect(fixture).toBeTruthy();
    });
  });
});

@Component({ selector: 'formly-form-test', template: '', entryComponents: [] })
class TestComponent {
  @ViewChild(FormlyForm, { static: false }) formlyForm: FormlyForm;
  fields = dropDownComponent.fields;
  form: FormGroup = dropDownComponent.form;
  model = dropDownComponent.model || {};
}