import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxIndeterminateComponent } from './checkbox-indeterminate.component';
import { UsaCheckboxModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [CheckboxIndeterminateComponent],
  imports: [
    CommonModule,
    UsaCheckboxModule,
  ],
  exports: [CheckboxIndeterminateComponent]
})
export class CheckboxIndeterminateModule { }
