import { HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { UsaFileInputComponent } from 'uswds-components';

@Component({
  selector: 'usa-file-input-upload',
  templateUrl: './file-input-upload.component.html',
  styles: [
  ]
})
export class FileInputUploadComponent {

  simulateServerDelay = false;
  serverResponseSucceeds = true;
  uploadFilesMethod = this.uploadFilesSuccess;
  failedUploads: File[] = [];

  onFilesChange($event) {
    this.failedUploads = [];
  }

  onToggleServerSideResponse() {
    this.serverResponseSucceeds = !this.serverResponseSucceeds;
    this.uploadFilesMethod = this.serverResponseSucceeds ? this.uploadFilesSuccess : this.uploadFilesFail;
  }

  /**
   * Simulate case where server endpoint returns HTTP OK after requesting file upload
   * @param file 
   * @returns 
   */
  uploadFilesSuccess(file: File) {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(new HttpResponse({status: 200}));
        observer.complete();
      }, 3000);
    });
  }

  /**
   * Simulate case where server endpoint returns HTTP ERROR after requesting file upload
   * @param file 
   * @returns 
   */
  uploadFilesFail(file: File) {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.error(new HttpResponse({status: 400}));
        observer.complete();
      }, 3000);
    });
  }

  /**
   * Event fired when upload fails
   * @param file 
   */
  onUploadError(file: File) {
    this.failedUploads.push(file);
  }
}
