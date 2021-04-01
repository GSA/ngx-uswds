import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { USWDSFileInputModule } from 'uswds-components';
import { FileInputComponent } from './file-input.component';



@NgModule({
  declarations: [
    FileInputComponent
  ],
  imports: [
    CommonModule,
    USWDSFileInputModule,
  ],
  exports: [
    FileInputComponent
  ]
})
export class FileInputModule { }
