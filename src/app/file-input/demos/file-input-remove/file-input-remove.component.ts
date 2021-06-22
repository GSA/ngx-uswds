import { Component, OnInit, ViewChild } from '@angular/core';
import { TableDataSource, UsaFileInputComponent } from 'uswds-components';

@Component({
  selector: 'usa-file-input-remove',
  templateUrl: './file-input-remove.component.html',
  styles: [
  ]
})
export class FileInputRemoveComponent {

  @ViewChild('fileInput') fileInput: UsaFileInputComponent;

  displayedColumns = ['name', 'size', 'type', 'action'];
  files: TableDataSource[] = [];

  onFilesChange($event: File[]) {
    this.files = $event; 
  }

  removeFile($event: File) {
    this.fileInput.removeFile($event);
  }

  removeAllFiles() {
    this.fileInput.clearFiles();
  }

}
