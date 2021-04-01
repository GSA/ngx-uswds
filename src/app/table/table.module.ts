import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { SdsTableModule } from '@gsa-sam/sam-material-extensions';



@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    SdsTableModule,
  ],
  exports: [
    TableComponent
  ],
})
export class TableModule { }
