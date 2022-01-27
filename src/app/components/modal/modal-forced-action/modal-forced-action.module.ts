import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalForcedActionComponent } from './modal-forced-action.component';
import { UsaModalModule } from '@gsa-sam/ngx-uswds';

@NgModule({
  declarations: [ModalForcedActionComponent],
  imports: [
    CommonModule,
    UsaModalModule,
  ],
  exports: [ModalForcedActionComponent]
})
export class ModalForcedActionModule { }
