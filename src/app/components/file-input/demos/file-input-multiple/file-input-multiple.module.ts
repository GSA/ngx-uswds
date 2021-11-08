import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileInputMultipleComponent } from './file-input-multiple.component';
import { UsaFileInputModule } from '@gsa-sam/ngx-uswds';



@NgModule({
  declarations: [FileInputMultipleComponent],
  imports: [
    CommonModule,
    UsaFileInputModule,
  ],
  exports: [FileInputMultipleComponent]
})
export class FileInputMultipleModule { }
