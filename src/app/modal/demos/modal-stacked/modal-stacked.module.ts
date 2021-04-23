import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalStackedBComponent, ModalStackedComponent } from './modal-stacked.component';

@NgModule({
  declarations: [
    ModalStackedComponent,
    ModalStackedBComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ModalStackedComponent],
  entryComponents: [ ModalStackedBComponent ],
})
export class ModalStackedModule { }
