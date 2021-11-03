import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCustomFocusComponent } from './modal-custom-focus.component';
import { UsaModalModule } from 'uswds-components';


@NgModule({
  declarations: [
    ModalCustomFocusComponent
  ],
  imports: [
    CommonModule,
    UsaModalModule,
  ],
  exports: [
    ModalCustomFocusComponent
  ]
})
export class ModalCustomFocusModule { }
