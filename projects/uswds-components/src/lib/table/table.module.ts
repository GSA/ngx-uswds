import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaColumnDef, UsaDataRowDef, UsaHeaderRowDef, UsaTableComponent, UsaTableDataDef, UsaTableHeader, UsaTableHeaderDef } from './table.component';



@NgModule({
  declarations: [
    UsaTableComponent,
    UsaColumnDef,
    UsaTableHeader,
    UsaTableHeaderDef,
    UsaHeaderRowDef,
    UsaTableDataDef,
    UsaDataRowDef,
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
  ]
})
export class UsaTableModule { }
