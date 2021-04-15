import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';

import { UsaModal } from './modal';
import {UsaModalBackdrop} from './modal-backdrop';
import {NgbModalWindow} from './modal-window';

export { UsaModal } from './modal';
export {UsaModalConfig, UsaModalOptions} from './modal-config';
export {NgbModalRef, UsaActiveModal} from './modal-ref';
export {ModalDismissReasons} from './modal-dismiss-reasons';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UsaModalBackdrop, NgbModalWindow],
  entryComponents: [UsaModalBackdrop, NgbModalWindow],
  providers: [ UsaModal ]
})
export class UsaModalModule {
}
