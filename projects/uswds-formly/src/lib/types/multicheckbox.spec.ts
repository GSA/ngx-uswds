import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyForm, FormlyModule } from '@ngx-formly/core';
import { USWDSFormlyMultiCheckboxComponent } from './multicheckbox';
import { UsaCheckboxModule } from '@gsa-sam/ngx-uswds';
import { FormlyWrapperFormFieldComponent } from '../wrappers/form-field.wrapper';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

const createTestComponent = (html: string) =>
  createGenericTestComponent(
    html,
    TestComponent
  ) as ComponentFixture<TestComponent>;

export function createGenericTestComponent<T>(
  html: string,
  type: { new (...args: any[]): T }
): ComponentFixture<T> {
  TestBed.overrideComponent(type, { set: { template: html } });
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture as ComponentFixture<T>;
}

let checkboxComponent;

describe('Formly Field multi Checkbox Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, USWDSFormlyMultiCheckboxComponent],
      imports: [
        CommonModule,
        BrowserModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        UsaCheckboxModule,
        FormlyModule.forChild({
          types: [
            {
              name: 'multicheckbox',
              component: USWDSFormlyMultiCheckboxComponent,
              wrappers: ['form-field'],
            },
          ],
          wrappers: [
            { name: 'form-field', component: FormlyWrapperFormFieldComponent },
          ],
        }),
      ],
    });
  });

  describe('checkbox', () => {
    beforeEach(() => {
      checkboxComponent = {
        form: new FormGroup({}),
        model: {},
      };
    });

    xit('should correctly bind to a object of data', () => {
      checkboxComponent.fields = [
        {
          key: 'multi-checkbox',
          type: 'multicheckbox',
          templateOptions: {
            label: 'Label for Multi Checkbox',
            description: 'some description',
            selectAllLable: 'Select All',
            options: [
              {
                key: 'vet',
                value: 'Veteran Owned',
                control: new FormControl(true),
              },
              {
                key: 'women',
                value: 'Women Owned',
                control: new FormControl(false),
              },
              {
                key: 'minority',
                value: 'Minority Owned',
                control: new FormControl(false),
              },
            ],
          },
        },
      ];
      const fixture = createTestComponent(
        '<formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>'
      );
      console.log(fixture);
      fixture.detectChanges();
      expect(fixture).toBeTruthy();
    });
  });
});

@Component({ selector: 'formly-form-test', template: '', entryComponents: [] })
class TestComponent {
  @ViewChild(FormlyForm, { static: true }) formlyForm: FormlyForm;
  fields = checkboxComponent.fields;
  form: FormGroup = checkboxComponent.form;
  model = checkboxComponent.model || {};
}
