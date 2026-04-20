import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyForm, FormlyModule } from '@ngx-formly/core';
import { USWDSFormlyRadioComponent } from './radio';
import { UsaRadioModule } from '@gsa-sam/ngx-uswds';

const createTestComponent = (html: string) =>
  createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

export function createGenericTestComponent<T>(html: string, type: { new(...args: any[]): T }): ComponentFixture<T> {
  TestBed.overrideComponent(type, { set: { template: html } });
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture as ComponentFixture<T>;
}

let radioComponent;

describe('Formly Field Radio Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, USWDSFormlyRadioComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        UsaRadioModule,
        FormlyModule.forRoot({
          types: [
            {
              name: 'radio',
              component: USWDSFormlyRadioComponent,
            },
          ],
        }),
      ],
    });
  });

  describe('radio', () => {
    beforeEach(() => {
        radioComponent = {
        form: new FormGroup({}),
        model: {},
      };
    });

    it('should correctly bind to a object of data', () => {
        radioComponent.fields = [{
            key: 'historical-figures',
            type: 'radio',
            templateOptions: {
              label: 'Historical Figures',
              options: [
                {
                  value: 'sojourner-truth',
                  label: 'Sojourner Truth',
                },
                {
                  value: 'frederick-douglass',
                  label: 'Frederick Douglass',
                }],
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
  fields = radioComponent.fields;
  form: FormGroup = radioComponent.form;
  model = radioComponent.model || {};
}