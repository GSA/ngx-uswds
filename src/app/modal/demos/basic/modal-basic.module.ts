import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalBasicComponent } from './modal-basic.component';
import { UsaModalModule } from 'uswds-components';

@NgModule({
  declarations: [
    ModalBasicComponent
  ],
  imports: [
    CommonModule,
    UsaModalModule,
  ]
})
export class ModalBasicModule { }
