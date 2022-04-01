import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBasicComponent } from './table-basic.component';
import { UsaTableModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [
    TableBasicComponent
  ],
  imports: [
    CommonModule,
    UsaTableModule,
  ],
  exports: [TableBasicComponent]
})
export class TableBasicModule { }
