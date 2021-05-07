import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table.component';
import { UsaTableModule } from 'uswds-components';



@NgModule({
  declarations: [DynamicTableComponent],
  imports: [
    CommonModule,
    UsaTableModule,
  ],
  exports: [DynamicTableComponent]
})
export class DynamicTableModule { }
