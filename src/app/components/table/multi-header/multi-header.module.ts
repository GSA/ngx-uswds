import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiHeaderComponent } from './multi-header.component';
import { UsaTableModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  imports: [
    CommonModule,
    UsaTableModule,
  ],
  declarations: [MultiHeaderComponent],
  exports: [MultiHeaderComponent],
})
export class MultiHeaderModule { }
