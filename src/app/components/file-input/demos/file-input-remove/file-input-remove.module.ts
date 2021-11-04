import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileInputRemoveComponent } from './file-input-remove.component';
import { UsaFileInputModule, UsaTableModule } from 'uswds-components';



@NgModule({
  declarations: [FileInputRemoveComponent],
  imports: [
    CommonModule,
    UsaFileInputModule,
    UsaTableModule,
  ],
  exports: [FileInputRemoveComponent]
})
export class FileInputRemoveModule { }
