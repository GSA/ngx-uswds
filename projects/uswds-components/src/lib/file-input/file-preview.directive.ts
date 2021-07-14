import { HttpResponse } from "@angular/common/http";
import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";

@Directive({
  selector: `[usaFilePreview]`
})
export class UsaFilePreviewDirective implements OnInit {

  @Input() file: File;

  @Input() uploadRequest: (file: File) => Observable<any>;

  @Output() uploadError = new EventEmitter<File>();

  imageElement: HTMLImageElement;

  constructor(
    private el: ElementRef
  ) {}
  
  ngOnInit() {
    this.imageElement = this.el.nativeElement;
    this.imageElement.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    this.imageElement.classList.add('is-loading');
    
    if (!this.uploadRequest) {
      this.removeLoading(this.file, this.imageElement);
      return;
    }

    this.uploadRequest(this.file).toPromise()
      .then(() => {
        this.removeLoading(this.file, this.imageElement);
      })
      .catch(() => {
        this.uploadError.emit(this.file);
        this.imageElement.classList.remove('is-loading');
        this.imageElement.src = '';
      });
  }

  private removeLoading(file: File, imageElement: HTMLImageElement) {
    const filePreviewClass = this._getFilePreviewClass(this.file.name);  
    imageElement.classList.remove('is-loading');
    if (file.type.indexOf('image') > -1) {
      imageElement.src = URL.createObjectURL(file);
    } else {
      imageElement.classList.add(filePreviewClass);
    }
  }


  private _getFilePreviewClass(fileName: string) {
    if (fileName.indexOf(".pdf") > 0) {
      return 'usa-file-input__preview-image--pdf';
    } else if (
      fileName.indexOf(".doc") > 0 ||
      fileName.indexOf(".pages") > 0
    ) {
      return 'usa-file-input__preview-image--word';
    } else if (
      fileName.indexOf(".xls") > 0 ||
      fileName.indexOf(".numbers") > 0
    ) {
      return 'usa-file-input__preview-image--excel';
    } else if (fileName.indexOf(".mov") > 0 || fileName.indexOf(".mp4") > 0) {
      return 'usa-file-input__preview-image--video';
    } else {
      return 'usa-file-input__preview-image--generic';
    }
  }
  
}