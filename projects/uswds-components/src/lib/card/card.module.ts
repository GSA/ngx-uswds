import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { USWDSCardComponent } from './card.component';
import { USWDSCardBodyComponent } from './card-body.component';
import { USWDSCardFooterComponent } from './card-footer.component';
import { USWDSCardGroupComponent } from './card-group.component';
import { USWDSCardHeaderComponent } from './card-header.component';
import { USWDSCardMediaComponent } from './card-media.component';



@NgModule({
  declarations: [
    USWDSCardComponent,
    USWDSCardBodyComponent,
    USWDSCardFooterComponent,
    USWDSCardGroupComponent,
    USWDSCardHeaderComponent,
    USWDSCardMediaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    USWDSCardComponent,
    USWDSCardBodyComponent,
    USWDSCardFooterComponent,
    USWDSCardGroupComponent,
    USWDSCardHeaderComponent,
    USWDSCardMediaComponent
  ]
})
export class USWDSCardModule { }
