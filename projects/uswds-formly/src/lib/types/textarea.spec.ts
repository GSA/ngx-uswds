import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyForm, FormlyModule } from '@ngx-formly/core';
import { USWDSFormlyTextAreaComponent } from './textarea';
import { UsaTextareaModule } from '@gsa-sam/ngx-uswds';

const createTestComponent = (html: string) =>
  createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

export function createGenericTestComponent<T>(html: string, type: { new(...args: any[]): T }): ComponentFixture<T> {
  TestBed.overrideComponent(type, { set: { template: html } });
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture as ComponentFixture<T>;
}

let textAreaComponent;

describe('Formly Field TextArea Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, USWDSFormlyTextAreaComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        UsaTextareaModule,
        FormlyModule.forRoot({
          types: [
            {
              name: 'textarea',
              component: USWDSFormlyTextAreaComponent,
            },
          ],
        }),
      ],
    });
  });

  describe('textarea', () => {
    beforeEach(() => {
        textAreaComponent = {
        form: new FormGroup({}),
        model: {},
      };
    });

    it('should correctly bind to a object of data', () => {
        textAreaComponent.fields = [{
            key: 'textarea',
            type: 'textarea',
            templateOptions: {
              label: 'TextArea',
              placeholder: 'type here',
              maxLength: 100,
            },
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
  fields = textAreaComponent.fields;
  form: FormGroup = textAreaComponent.form;
  model = textAreaComponent.model || {};
}