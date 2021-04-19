import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { UsaModalModule } from 'uswds-components';



@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    UsaModalModule,
  ],
  entryComponents: [
    ModalComponent,
  ]
})
export class ModalModule { }
