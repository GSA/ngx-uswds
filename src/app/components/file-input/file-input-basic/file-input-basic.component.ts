import { Component, TemplateRef } from "@angular/core";
import { FileError, FileValidator } from '@gsa-sam/ngx-uswds';
import { Observable } from "rxjs";

@Component({
  selector: 'file-input-basic',
  templateUrl: './file-input-basic.component.html'
})
export class FileInputBasicComponent {
  multiple = false;

  acceptFileType: string = '';

  id: string;

  hint: string | TemplateRef<any>;

  disabled: boolean;

  selectedFiles: File[] = [];

  clearFilesOnAdd: boolean;

  displayFileInfo: boolean = true;

  showError: boolean = false;

  uploadRequest: (file: File) => Observable<any>;

  maxSize: number = 10000000;

  invalidFile(errors: FileError){
    console.log(errors.errorMessages)
  }

  fileSizeValidator: FileValidator = {
    validation: this.validateFileSize,
    errorMessage: this.fileSizeErrorMessage,
    thisValue: {maxSize: this.maxSize}
  };

  validateFileSize(files: File[]): File[]{
    return files.filter(file => file.size > this.maxSize);
  }

  fileSizeErrorMessage(files: File[]): string[]{
    return files.map(file => `${file.name} is larger than ${this.maxSize} bytes. Total file size: ${file.size} bytes`)
  }
}