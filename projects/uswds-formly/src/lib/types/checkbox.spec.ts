import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyForm, FormlyModule } from '@ngx-formly/core';
import { USWDSFormlyCheckboxComponent } from './checkbox';
import { UsaCheckboxModule } from '@gsa-sam/ngx-uswds';

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

describe('Formly Field Checkbox Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, USWDSFormlyCheckboxComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        UsaCheckboxModule,
        FormlyModule.forRoot({
          types: [
            {
              name: 'checkbox',
              component: USWDSFormlyCheckboxComponent,
            },
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

    it('should correctly bind to a object of data', () => {
      checkboxComponent.fields = [
        {
          key: 'checkboxDemo',
          type: 'checkbox',
          templateOptions: {
            label: 'Label for Checkbox',
            description: 'Description for Checkbox',
          },
        },
      ];
      const fixture = createTestComponent(
        '<formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>'
      );
      fixture.detectChanges();
      expect(fixture).toBeTruthy();
    });
  });
});

@Component({ selector: 'formly-form-test', template: '', entryComponents: [] })
class TestComponent {
  @ViewChild(FormlyForm, { static: false }) formlyForm: FormlyForm;
  fields = checkboxComponent.fields;
  form: FormGroup = checkboxComponent.form;
  model = checkboxComponent.model || {};
}
