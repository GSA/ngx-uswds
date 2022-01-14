import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalBasicComponent } from './modal-basic.component';
import { UsaModalModule } from '@gsa-sam/ngx-uswds';

@NgModule({
  declarations: [
    ModalBasicComponent
  ],
  imports: [
    CommonModule,
    UsaModalModule,
  ],
  exports: [
    ModalBasicComponent
  ]
})
export class ModalBasicModule { }
