import { 
  Component, 
  ElementRef, 
  Input, 
  TemplateRef, 
  ViewChild, 
  forwardRef,
  Output,
  EventEmitter, 
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { FileInputConfig } from './file-input.config';

export interface UploadedFile {
  isLoading?: boolean, 
  imageId: string, 
  file: File
}

export interface FileValidator{
  validation: (files: File[]) => File[];
  errorMessage: string[] | ((files: File[]) => string[]);
  thisValue?: any;
}
export interface FileError{
  invalidFiles: File[];
  errorMessages: string[];
}
@Component({
  selector: 'usa-file-input',
  templateUrl: './file-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UsaFileInputComponent),
      multi: true,
    },
  ],
})
export class UsaFileInputComponent implements ControlValueAccessor {

  @ViewChild('fileInputEl') fileInputElement: ElementRef;

  @Input() multiple = false;

  @Input() acceptFileType: string = '';

  @Input() id: string;

  @Input() hint: string | TemplateRef<any>;

  @Input() disabled: boolean;

  @Input() selectedFiles: File[] = [];

  @Input() clearFilesOnAdd: boolean;

  @Input() displayFileInfo: boolean;

  @Input() showErrorInInput: boolean = true;

  @Input() uploadRequest: (file: File) => Observable<any>;

  /**
   * Validators which will prevent a file from being added to the formControl if it fails any validator added to this input
   */
  @Input() uploadStopValidators: Array<FileValidator> = [];

  @Output() selectedFilesChange = new EventEmitter<File[]>();

  @Output() uploadError = new EventEmitter<File>();

  @Output() invalidFilesAdded = new EventEmitter<FileError>();

  DRAG_OVER_STATE = false;
  ERROR_STATE = false;
  ERROR_MESSAGE = '';

  inputFiles: UploadedFile[] = [];

  // Save the callbacks, make sure to have a default so your app
  // doesn't crash when one isn't (yet) registered
  private onChange = (v: any) => {};
  private onTouched = () => {};


  constructor(
    private fileInputConfig: FileInputConfig,
  ) { 
    this.multiple = this.fileInputConfig.multiple;
    this.acceptFileType = this.fileInputConfig.acceptFileType;
    this.clearFilesOnAdd = this.fileInputConfig.clearFilesOnAdd;
    this.displayFileInfo = this.fileInputConfig.displayFileInfo;
    this.uploadRequest = this.fileInputConfig.uploadRequest;
  }

  onDragLeave() {
    this.DRAG_OVER_STATE = false;
  }

  onDragOver() {
    this.DRAG_OVER_STATE = true;
  }

  onFileDrop() {
    this.DRAG_OVER_STATE = false;
  }

  onNewFilesUpload($event) {
    const newFiles: File[] = Array.from($event.target.files);
    let invalidFiles: File[] = [];
    let validFiles: File[] = [];
    this.fileInputElement.nativeElement.value = null;
    
    if (newFiles.length === 0) {
      return;
    }

    const fileType: FileValidator = {
      validation: this.validateFileTypeRArray,
      errorMessage: (files: File[]):string[] => files?.map(file => `${file.name} is the wrong file type`) ?? [],
      thisValue: {acceptFileType: this.acceptFileType}
    };
    const allValidators = this.uploadStopValidators.concat([fileType])
    let errorMessages = [];
    allValidators.forEach(val => {
      const failedCurrentValidation: File[] = val.validation.call(val.thisValue, newFiles);
      const currentErrorMessages = val.errorMessage instanceof Function ? val.errorMessage.call(val.thisValue, failedCurrentValidation) : val.errorMessage;
      errorMessages = errorMessages.concat(currentErrorMessages);
      invalidFiles = invalidFiles.concat(failedCurrentValidation);// TODO: Create concat if not present so that the same file is not uploaded multiple times
    });
    validFiles = newFiles.filter(file => !invalidFiles?.includes(file));
    if(errorMessages.length > 0){
      if(this.showErrorInInput){
        this.ERROR_STATE = true;
        this.ERROR_MESSAGE = errorMessages.join(',');
      }
      this.invalidFilesAdded.emit({invalidFiles, errorMessages});
      this.selectedFiles = [];
      this.inputFiles = [];
      // return;
    }else {
      this.ERROR_STATE = false;
    }

    // Validate new files match expected types
    // let areValidFiles = this.validateFileType(newFiles);

    // if (areValidFiles) {
    //   this.ERROR_STATE = false;
    // } else {
    //   this.ERROR_STATE = true;
    //   this.selectedFiles = [];
    //   this.inputFiles = [];
    //   return;
    // }

    if(validFiles.length === 0){
      return;
    }
    
    // Clear current files OR append to existing based on user config
    if (!this.multiple || this.clearFilesOnAdd) {
      this.inputFiles = [];
      this.selectedFiles = validFiles;
    } else {
      this.selectedFiles = this.selectedFiles.concat(validFiles);
    }

    // Read file data and add laoding / preview states
    validFiles.forEach(file => {
      const imageId = this.getImageId(file, this.inputFiles);
      const inputFile = {
        isLoading: true, imageId, file
      };
      this.inputFiles.push(inputFile);
    });

    this.selectedFilesChange.emit(this.selectedFiles);

    // Notify Angular to update its model
    this.onChange(this.selectedFiles);
    this.onTouched();
  }

  removeFile(file: File) {
    const index = this.selectedFiles.indexOf(file);
    let inputFileIndex = -1;
    this.inputFiles.forEach((inputFile, index) => {
      if (inputFile.file === file) {
        inputFileIndex = index;
      }
    });

    if (index === -1 || inputFileIndex === -1) {
      return;
    }

    this.selectedFiles.splice(index, 1);
    this.selectedFilesChange.emit(this.selectedFiles);
    this.writeValue(this.selectedFiles);
    this.onChange(this.selectedFiles);
    this.onTouched();
  }

  clearFiles() {
    this.selectedFiles = [];
    this.selectedFilesChange.emit(this.selectedFiles);
    this.writeValue(this.selectedFiles);
    this.onChange(this.selectedFiles);
    this.onTouched();
  }

  onUploadError(file: File) {
    this.uploadError.emit(file);
  }

  trackLoadedFilesBy(index: number, item: UploadedFile) {
    return item.imageId;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(files: File[]): void {
    if (this.disabled || !files) {
      return;
    }
    let areValidFiles = this.validateFileType(files);

    if (areValidFiles) {
      this.ERROR_STATE = false;
    } else {
      this.ERROR_STATE = true;
      return;
    }

    this.inputFiles = [];
    this.selectedFiles = files;
    // Read file data and add laoding / preview states
    files.forEach(file => {
      const imageId = this.getImageId(file, this.inputFiles);
      const inputFile = {
        isLoading: true, imageId, file
      };
      this.inputFiles.push(inputFile);
    });
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  private validateFileType(files: File[]) {
    if (!this.acceptFileType) {
      return true;
    }

    const acceptedFiles = this.acceptFileType.split(',');

    for(let i = 0; i < files.length; i++) {
      const isValidFileType = acceptedFiles.some(acceptedFileType => {
        const endsWithFileType = new RegExp(acceptedFileType + '$', 'i').test(files[i].name);
        return endsWithFileType || files[i].type.includes(acceptedFileType.replace(/\*/g, ""))
      });

      if (!isValidFileType) {
        return false;
      }
    }

    return true;
  }
  private validateFileTypeRArray(files: File[]): File[] {
    if (!this.acceptFileType) {
      return;
    }

    const acceptedFiles = this.acceptFileType.split(',');

    const invalidFiles = [];
    for(let i = 0; i < files.length; i++) {
      const isFileValid = acceptedFiles.some(acceptedFileType => {
        const endsWithFileType = new RegExp(acceptedFileType + '$', 'i').test(files[i].name);
        return endsWithFileType || files[i].type.includes(acceptedFileType.replace(/\*/g, ""))
      });
      if(!isFileValid){
        invalidFiles.push(files[i])
      }
    }
    return invalidFiles;
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
