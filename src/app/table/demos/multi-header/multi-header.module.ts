import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiHeaderComponent } from './multi-header.component';
import { UsaTableModule } from 'uswds-components';



@NgModule({
  imports: [
    CommonModule,
    UsaTableModule,
  ],
  declarations: [MultiHeaderComponent],
  exports: [MultiHeaderComponent],
})
export class MultiHeaderModule { }
