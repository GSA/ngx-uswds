import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { USWDSListModule } from 'uswds-components';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    USWDSListModule,
  ],
  exports: [
    ListComponent
  ],
})
export class ListModule { }
