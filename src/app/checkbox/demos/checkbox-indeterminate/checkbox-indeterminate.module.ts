import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxIndeterminateComponent } from './checkbox-indeterminate.component';
import { UsaCheckboxModule } from 'uswds-components';



@NgModule({
  declarations: [CheckboxIndeterminateComponent],
  imports: [
    CommonModule,
    UsaCheckboxModule,
  ],
  exports: [CheckboxIndeterminateComponent]
})
export class CheckboxIndeterminateModule { }
