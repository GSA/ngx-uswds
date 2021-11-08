import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCustomFocusComponent } from './modal-custom-focus.component';
import { UsaModalModule } from '@gsa-sam/ngx-uswds';


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
