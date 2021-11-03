import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileInputBasicComponent } from './file-input-basic.component';
import { UsaFileInputModule } from 'uswds-components';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FileInputBasicComponent],
  imports: [
    CommonModule,
    UsaFileInputModule,
    ReactiveFormsModule,
  ],
  exports: [FileInputBasicComponent]
})
export class FileInputBasicModule { }
