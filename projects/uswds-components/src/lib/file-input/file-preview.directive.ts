import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: `[usaFilePreview]`
})
export class UsaFilePreviewDirective implements OnInit {

  @Input() usaFilePreview: File;

  imageElement: HTMLImageElement;

  constructor(
    private el: ElementRef
  ) {}
  
  ngOnInit() {
    this.imageElement = this.el.nativeElement;
    this.imageElement.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    this.imageElement.classList.add('is-loading');
    
    const fileReader = new FileReader();
    fileReader.onloadend = (() => {
      const filePreviewClass = this._getFilePreviewClass(this.usaFilePreview.name);
      const previewImage: HTMLImageElement = this.el.nativeElement;

      // Removes loader and displays preview
      previewImage.classList.remove('is-loading');
      previewImage.src = fileReader.result as string;
      previewImage.onerror = () => {
        previewImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        previewImage.classList.add(filePreviewClass);
        previewImage.onerror = null;
      };
    });

    fileReader.readAsDataURL(this.usaFilePreview);
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