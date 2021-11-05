import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortableTableComponent } from './sortable-table.component';
import { UsaTableModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [SortableTableComponent],
  imports: [
    CommonModule,
    UsaTableModule,
  ],
  exports: [SortableTableComponent]
})
export class SortableTableModule { }
