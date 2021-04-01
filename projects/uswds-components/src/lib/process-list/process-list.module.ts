import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { USWDSProcessListComponent } from './process-list.component';
import { USWDSProcessListItemComponent } from './process-list-item.component';
import { USWDSProcessListHeaderComponent } from './process-list-header.component';



@NgModule({
  declarations: [
    USWDSProcessListComponent,
    USWDSProcessListItemComponent,
    USWDSProcessListHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    USWDSProcessListComponent,
    USWDSProcessListItemComponent,
    USWDSProcessListHeaderComponent
  ]
})
export class USWDSProcessListModule { }
