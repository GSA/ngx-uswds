import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaCheckboxComponent, UsaCheckboxLabelDescription } from './checkbox.component';



@NgModule({
  declarations: [
    UsaCheckboxComponent, 
    UsaCheckboxLabelDescription
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UsaCheckboxComponent,
    UsaCheckboxLabelDescription
  ]
})
export class UsaCheckboxModule { }
