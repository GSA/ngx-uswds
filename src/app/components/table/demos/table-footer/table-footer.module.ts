import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFooterComponent } from './table-footer.component';
import { UsaTableModule } from 'uswds-components';



@NgModule({
  declarations: [TableFooterComponent],
  imports: [
    CommonModule,
    UsaTableModule,
  ],
  exports: [TableFooterComponent]
})
export class TableFooterModule { }
