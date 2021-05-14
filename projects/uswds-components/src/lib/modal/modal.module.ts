import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';

import {UsaModalWrapper} from './modal-wrapper';
import {UsaModalWindow} from './modal-window';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [UsaModalWrapper, UsaModalWindow],
  entryComponents: [UsaModalWrapper, UsaModalWindow],
  exports: [
    UsaModalWrapper,
    UsaModalWindow,
  ]
})
export class UsaModalModule {}
