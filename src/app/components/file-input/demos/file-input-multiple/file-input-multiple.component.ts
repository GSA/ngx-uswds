import { Component, ViewChild } from '@angular/core';
import { UsaFileInputComponent } from 'uswds-components';

@Component({
  selector: 'usa-file-input-multiple',
  templateUrl: './file-input-multiple.component.html',
})
export class FileInputMultipleComponent {
  @ViewChild('fileInput') fileInput: UsaFileInputComponent;

  // Used in html
  clearFilesOnAdd = true;

  removeAllFiles() {
    this.fileInput.clearFiles();
  }
}
