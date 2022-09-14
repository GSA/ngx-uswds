import { Component } from '@angular/core';
import { FileError } from '@gsa-sam/ngx-uswds';

@Component({
  selector: 'file-input-table',
  templateUrl: './file-input-table.component.html',
})
export class FileInputTableComponent {
  files: any[] = [];

  multiple: boolean = true;
  clearFilesOnAdd: boolean = false;
  displayFileInfo: boolean = false;
  acceptFileType: string = '.pdf';

  displayedColumns = ['name', 'size', 'type', 'action'];

  invalidFile(errors: FileError){
    console.log(errors.errorMessages)
  }
}
