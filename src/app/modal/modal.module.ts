import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { UsaModalModule, USWDSCardModule } from 'uswds-components';
import { ModalDefaultComponent } from './modal-default.component';
import { ModalLargeComponent } from './modal-large.component';
import { ModalForcedComponent } from './modal-forced.component';
import { ModalComponentContent, ModalComponentWrapper } from './modal-component-content';
import { ModalCustomFocusComponent } from './modal-custom-focus';
import { ModalScrollableComponent } from './modal-scrollable-content';
import { ModalStackedAComponent, ModalStackedBComponent } from './modal-stacked.component';



@NgModule({
  declarations: [
    ModalComponent,
    ModalDefaultComponent,
    ModalLargeComponent,
    ModalForcedComponent,
    ModalComponentWrapper,
    ModalComponentContent,
    ModalCustomFocusComponent,
    ModalScrollableComponent,
    ModalStackedAComponent,
    ModalStackedBComponent,
  ],
  imports: [
    CommonModule,
    UsaModalModule,
    USWDSCardModule,
  ],
  entryComponents: [
    ModalComponentContent,
    ModalStackedBComponent,
  ]
})
export class ModalModule { }
