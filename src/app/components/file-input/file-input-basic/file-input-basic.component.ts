import { Component, Input, TemplateRef } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: 'file-input-basic',
  templateUrl: './file-input-basic.component.html'
})
export class FileInputBasicComponent {
  @Input() multiple = false;

  @Input() acceptFileType: string = '';

  @Input() id: string;

  @Input() hint: string | TemplateRef<any>;

  @Input() disabled: boolean;

  @Input() selectedFiles: File[] = [];

  @Input() clearFilesOnAdd: boolean;

  @Input() displayFileInfo: boolean = true;

  @Input() uploadRequest: (file: File) => Observable<any>;
}