import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';

import { UsaModal } from './modal';
import {UsaModalBackdrop} from './modal-backdrop';
import {UsaModalWindow} from './modal-window';

export { UsaModal } from './modal';
export {UsaModalConfig, UsaModalOptions} from './modal-config';
export {UsaModalRef, UsaActiveModal} from './modal-ref';
export {ModalDismissReasons} from './modal-dismiss-reasons';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [UsaModalBackdrop, UsaModalWindow],
  entryComponents: [UsaModalBackdrop, UsaModalWindow],
  providers: [ UsaModal ]
})
export class UsaModalModule {
}
