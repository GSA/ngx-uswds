import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileInputUploadComponent } from './file-input-upload.component';
import { UsaFileInputModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [FileInputUploadComponent],
  imports: [
    CommonModule,
    UsaFileInputModule
  ],
  exports: [FileInputUploadComponent]
})
export class FileInputUploadModule { }
