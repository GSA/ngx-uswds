import { Component, ViewChild } from '@angular/core';
import { SearchComponent } from '@gsa-sam/ngx-uswds';
import { FieldType } from '@ngx-formly/core';

@Component({
  template: `
  <usa-search
      [formControl]="formControl"
    ></usa-search>
  `,
})
export class USWDSFormlySearchComponent extends FieldType {
  @ViewChild(SearchComponent, { static: true }) public template: SearchComponent;

}
