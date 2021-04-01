import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessListComponent } from './process-list.component';
import { USWDSProcessListModule } from 'uswds-components';


@NgModule({
  declarations: [ProcessListComponent],
  imports: [
    CommonModule,
    USWDSProcessListModule,
  ],
  exports: [
    ProcessListComponent
  ]
})
export class ProcessListModule { }
