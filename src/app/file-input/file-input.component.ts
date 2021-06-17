import { Component, OnInit } from '@angular/core';
import { FileInputConfig } from 'uswds-components';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {

  constructor(
    private fileInputConfig: FileInputConfig
  ) { 
    this.fileInputConfig.clearFilesOnAdd = false;
  }

  ngOnInit(): void {
  }

}
