import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { PaginationModule } from '@gsa-sam/components';



@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    PaginationModule,
  ],
  exports: [
    PaginationComponent
  ],
})
export class PaginationBasicModule { }
