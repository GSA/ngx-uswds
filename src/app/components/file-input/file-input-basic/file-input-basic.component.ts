import { Component, TemplateRef } from "@angular/core";
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

  uploadRequest: (file: File) => Observable<any>;
}