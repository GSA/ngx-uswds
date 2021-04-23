import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';

import { UsaModalService } from './modal';
import {UsaModalWrapper} from './modal-wrapper';
import {UsaModalWindow} from './modal-window';

export { UsaModalService as UsaModal } from './modal';
export {UsaModalConfig, UsaModalOptions} from './modal-config';
export {UsaModalRef, UsaActiveModal} from './modal-ref';
export {ModalDismissReasons} from './modal-dismiss-reasons';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [UsaModalWrapper, UsaModalWindow],
  entryComponents: [UsaModalWrapper, UsaModalWindow],
  providers: [ UsaModalService ]
})
export class UsaModalModule {
}
