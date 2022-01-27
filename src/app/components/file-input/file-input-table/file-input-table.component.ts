import { Component } from "@angular/core";


@Component({
  selector: 'file-input-table',
  templateUrl: './file-input-table.component.html'
})
export class FileInputTableComponent {
  files: any[] = [];

  multiple: boolean = true;
  clearFilesOnAdd: boolean = false;
  displayFileInfo: boolean = false;
  
  displayedColumns = ['name', 'size', 'type', 'action'];
}