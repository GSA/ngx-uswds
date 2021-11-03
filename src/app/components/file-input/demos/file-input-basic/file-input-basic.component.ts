import { Component } from '@angular/core';

@Component({
  selector: 'usa-file-input-basic',
  templateUrl: './file-input-basic.component.html',
})
export class FileInputBasicComponent {

  // Used in html
  displayFileInfo = true;

  onFileChange($event) {
    console.log($event);
  }

}
