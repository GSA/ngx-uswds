import { Injectable } from "@angular/core";

export interface FileInputOptions {
  
  /**
   * Accept multiple files in a single file dropbox
   * @default - false
   */
  multiple?: boolean;

  /**
   * File types to accept for file input
   * @default - accept all
   */
  acceptFileType: string;

  /**
   * Applicable when multiple flies are accepted. Clears current list of files
   * when new files are dragged or added when true. A value of false will simply
   * append the added files to pre-existing uploaded files instead of clearing
   * @default true
   */
  clearFilesOnAdd: boolean;

  /**
   * Whether or not to display information (name / file type icon) about files uploaded.
   * This can be disabled if users want to use their own interface to display uploaded files,
   * such as custom tables
   * @default true
   */
  displayFileInfo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FileInputConfig implements Required<FileInputOptions> {
  multiple = false;
  acceptFileType = undefined;
  clearFilesOnAdd = true;
  displayFileInfo = true;
}