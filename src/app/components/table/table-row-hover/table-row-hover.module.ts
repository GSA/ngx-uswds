import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaTableModule } from '@gsa-sam/ngx-uswds';
import { TableRowHoverComponent } from './table-row-hover.component';

@NgModule({
  declarations: [TableRowHoverComponent],
  imports: [CommonModule, UsaTableModule],
  exports: [TableRowHoverComponent],
})
export class TableRowHoverModule {}
