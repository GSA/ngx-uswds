import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalLargeComponent } from './modal-large.component';
import { UsaModalModule } from 'uswds-components';



@NgModule({
  declarations: [ModalLargeComponent],
  imports: [
    CommonModule,
    UsaModalModule,
  ],
  exports: [ModalLargeComponent]
})
export class ModalLargeModule { }
