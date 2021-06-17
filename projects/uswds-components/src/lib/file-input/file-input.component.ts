import { 
  ChangeDetectorRef, 
  Component, 
  ElementRef, 
  Input, 
  Output, 
  TemplateRef, 
  ViewChild, 
  EventEmitter, 
} from '@angular/core';
import { FileInputConfig } from './file-input.config';

export interface UploadedFile {
  isLoading?: boolean, 
  imageId: string, 
  file: File 
}
@Component({
  selector: 'uswds-file-input',
  templateUrl: './file-input.component.html',
})
export class USWDSFileInputComponent {

  @ViewChild('fileInputEl') fileInputElement: ElementRef;

  @Input() multiple = false;

  @Input() acceptFileType: string;

  @Input() id: string;

  @Input() label: string | TemplateRef<any>;

  @Input() hint: string | TemplateRef<any>;

  @Input() disabled: boolean;

  @Input() selectedFiles: File[] = [];

  @Input() clearFilesOnAdd: boolean;

  @Input() displayFileInfo: boolean;

  @Output() selectedFilesChange = new EventEmitter<File[]>();

  readonly DRAG_CLASS = 'usa-file-input--drag';

  DRAG_OVER_STATE = false;
  ERROR_STATE = false;

  instructions: HTMLElement;
  dropTarget: HTMLElement;

  inputFiles: UploadedFile[] = [];

  constructor(
    private fileInputConfig: FileInputConfig,
  ) { 
    this.multiple = this.fileInputConfig.multiple;
    this.acceptFileType = this.fileInputConfig.acceptFileType;
    this.clearFilesOnAdd = this.fileInputConfig.clearFilesOnAdd;
    this.displayFileInfo = this.fileInputConfig.displayFileInfo;
  }

  onDragLeave() {
    this.DRAG_OVER_STATE = false;
  }

  onDragOver() {
    this.DRAG_OVER_STATE = true;
  }

  onFileDrop($event) {
    this.DRAG_OVER_STATE = false;
  }

  onChange($event) {
    const newFiles: File[] = Array.from($event.target.files);

    // Validate new files match expected types
    let areValidFiles = true;
    newFiles.forEach(file => {
      areValidFiles = areValidFiles && this.validateFileType(file);
    });

    if (!areValidFiles) {
      this.ERROR_STATE = true;
      return;
    }

    this.ERROR_STATE = false;

    // Clear current files OR append to existing based on user config
    if (!this.multiple || this.clearFilesOnAdd) {
      this.inputFiles = [];
      this.selectedFiles = newFiles;
    } else {
      this.selectedFiles = this.selectedFiles.concat(newFiles);
    }

    // Read file data and add laoding / preview states
    newFiles.forEach(file => {
      const imageId = this.getImageId(file, this.inputFiles);
      const inputFile = {
        isLoading: true, imageId, file
      };
      this.inputFiles.push(inputFile);
    });

    this.selectedFilesChange.emit(this.selectedFiles);
  }

  trackLoadedFilesBy(index: number, item: UploadedFile) {
    return item.imageId;
  }

  private validateFileType(file: File) {
    if (!this.acceptFileType) {
      return true;;
    }

    const acceptedFiles = this.acceptFileType.split(',');
    const isValidFileType = acceptedFiles.some(acceptedFileType => {
      return file.name.indexOf(acceptedFileType) > 0 || file.type.includes(acceptedFileType.replace(/\*/g, ""))
    });

    return isValidFileType;
  }

  /**
   * Given a file and list of pre-uploaded files, generates and returns an id for the file.
   * If file already exists in pre-uploaded files list, then the id will simply be appended with
   * a counter to ensure uniqueness
   * @param file - File to generate id for
   * @param preExistingFiles - List of files that are uploaded and already have an id
   * @returns An id for the image
   */
  private getImageId(file: File, preUploadedFiles: UploadedFile[]) {
    let imageId = this._makeSafeForID(file.name);

    imageId = `a${imageId}`;
    let numExisting = 0;
    preUploadedFiles.forEach(file => {
      if (file.imageId === imageId) {
        numExisting++;
      }
    });

    if (numExisting > 0) {
      imageId = `${imageId}${numExisting}`;
    }
    return imageId;
  }

  /**
   * Creates an ID name for each file that strips all invalid characters.
   * @param {string} name - name of the file added to file input
   * @returns {string} same characters as the name with invalid chars removed
   */
  private _makeSafeForID(name: string) {
    return name.replace(/[^a-z0-9]/g, function replaceName(s) {
      const c = s.charCodeAt(0);
      if (c === 32) return "-";
      if (c >= 65 && c <= 90) return `img_${s.toLowerCase()}`;
      return `__000${(c.toString(16)).slice(-4)}`;
    });
  }
}
