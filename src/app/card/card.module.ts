import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { USWDSCardModule } from 'uswds-components';



@NgModule({
  declarations: [CardComponent],
  imports: [
    USWDSCardModule,
    CommonModule
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule { }
