import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from './link.component';
import { USWDSLinkModule } from 'uswds-components';



@NgModule({
  declarations: [LinkComponent],
  imports: [
    CommonModule,
    USWDSLinkModule
  ],
  exports: [
    LinkComponent
  ]
})
export class LinkModule { }
