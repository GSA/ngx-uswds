import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { buildFileInput, handleChange, preventInvalidFiles, disable, enable } from './file-input-methods';

@Component({
  selector: 'uswds-file-input',
  templateUrl: './file-input.component.html',
})
export class USWDSFileInputComponent implements AfterViewInit, OnChanges {

  @ViewChild('fileInputEl') fileInputElement: ElementRef;

  @Input() multiple = false;

  @Input() acceptFileType: string;

  @Input() id: string;

  @Input() label: string;

  @Input() disabled: boolean;

  readonly DRAG_CLASS = 'usa-file-input--drag';

  DRAG_OVER_STATE = false;
  
  instructions: HTMLElement;
  dropTarget: HTMLElement;

  ngAfterViewInit() {
    const { instructions, dropTarget } = buildFileInput(this.fileInputElement.nativeElement);
    this.instructions = instructions;
    this.dropTarget = dropTarget;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.fileInputElement) {
      return;
    }

    if (changes.disabled && this.disabled) {
      disable(this.fileInputElement.nativeElement);
    } else if (changes.disabled && !this.disabled) {
      enable(this.fileInputElement.nativeElement);
    }
  }

  onDragLeave() {
    this.DRAG_OVER_STATE = false;
  }

  onDragOver() {
    this.DRAG_OVER_STATE = true;
  }

  onFileDrop($event) {
    preventInvalidFiles($event, this.fileInputElement.nativeElement, this.instructions, this.dropTarget);
    this.DRAG_OVER_STATE = false;
  }

  onChange($event) {
    handleChange($event, this.fileInputElement.nativeElement, this.instructions, this.dropTarget);
  }
}
