import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaColumnDef, UsaTableComponent } from './table.component';
import { UsaHeaderRowDef, UsaTableHeader, UsaTableHeaderDef } from './table-header';
import { UsaTableDataDef, UsaDataRowDef, UsaTableData } from './table-data';
import { UsaSort } from './table-sort.component';

@NgModule({
  declarations: [
    UsaTableComponent,
    UsaColumnDef,
    UsaTableHeader,
    UsaTableHeaderDef,
    UsaHeaderRowDef,
    UsaTableDataDef,
    UsaDataRowDef,
    UsaSort,
    UsaTableData,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UsaTableComponent,
    UsaColumnDef,
    UsaTableHeader,
    UsaHeaderRowDef,
    UsaTableHeaderDef,
    UsaTableDataDef,
    UsaDataRowDef,
    UsaSort,
    UsaTableData,
  ]
})
export class UsaTableModule { }
