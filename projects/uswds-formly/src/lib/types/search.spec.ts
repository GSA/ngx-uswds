import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyForm, FormlyModule } from '@ngx-formly/core';
import { USWDSFormlySearchComponent } from './search';
import { UsaSearchModule } from '@gsa-sam/ngx-uswds';

const createTestComponent = (html: string) =>
  createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

export function createGenericTestComponent<T>(html: string, type: { new(...args: any[]): T }): ComponentFixture<T> {
  TestBed.overrideComponent(type, { set: { template: html } });
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();
  return fixture as ComponentFixture<T>;
}

let testSearchComponent;

describe('Formly Field Select Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, USWDSFormlySearchComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        UsaSearchModule,
        FormlyModule.forRoot({
          types: [
            {
              name: 'search',
              component: USWDSFormlySearchComponent,
            },
          ],
        }),
      ],
    });
  });

  describe('search', () => {
    beforeEach(() => {
      testSearchComponent = {
        form: new FormGroup({}),
        model: {
          "firstName": {
            "searchText": "test",
          }
        },
      };
    });

    it('should correctly bind to a object of data', () => {
      testSearchComponent.fields = [{
        key: 'firstName',
        type: 'search',
        templateOptions: {
          label: 'Search Test',
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
  fields = testSearchComponent.fields;
  form: FormGroup = testSearchComponent.form;
  model = testSearchComponent.model || {};
}