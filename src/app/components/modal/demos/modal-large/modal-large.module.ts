import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalLargeComponent } from './modal-large.component';
import { UsaModalModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [ModalLargeComponent],
  imports: [
    CommonModule,
    UsaModalModule,
  ],
  exports: [ModalLargeComponent]
})
export class ModalLargeModule { }
