import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponentWrapper, ModalContent } from './modal-component-wrapper.component';
import { UsaModalModule } from '@gsa-sam/ngx-uswds';

@NgModule({
  declarations: [
    ModalComponentWrapper,
    ModalContent,
  ],
  imports: [
    CommonModule,
    UsaModalModule,
  ],
  exports: [
    ModalComponentWrapper
  ],
  entryComponents: [
    ModalContent
  ],
})
export class ModalComponentWrapperModule { }
