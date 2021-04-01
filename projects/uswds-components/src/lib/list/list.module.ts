import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { USWDSListComponent} from './list.component';



@NgModule({
  declarations: [USWDSListComponent],
  imports: [
    CommonModule
  ],
  exports: [
    USWDSListComponent
  ]
})
export class USWDSListModule { }
