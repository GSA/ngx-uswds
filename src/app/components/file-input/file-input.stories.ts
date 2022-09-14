import { Meta, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { FileError, UsaFileInputComponent, UsaFileInputModule, UsaTableModule } from "@gsa-sam/ngx-uswds";
import { ReactiveFormsModule } from '@angular/forms';
import { FileInputTableModule } from "./file-input-table/file-input-table.module";
import { FileInputUploadModule } from "./file-input-upload/file-input-upload.module";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { generateConfig } from "src/sandbox/sandbox-utils";

const fileSize = 1000000;
const template = require('!!raw-loader!./file-input-basic/file-input-basic.component.html');
const validateFileSize = (files: File[]): File[] => {
  return files.filter((file) => file.size > fileSize);
};

const fileSizeErrorMessage = (files: File[]): string[] => {
  return files.map(file => `${file.name} is larger than ${fileSize} bytes. Total file size: ${file.size} bytes`)
};

export default {
  title: 'Components/FileInput',
  component: UsaFileInputComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule, 
        UsaFileInputModule, 
        ReactiveFormsModule, 
        UsaTableModule,
        FileInputTableModule,
        FileInputUploadModule,
      ],
    }),
  ],
  args: {
    multiple: false,
    acceptFileType: '.pdf3,.csv',
    id: 'file-input-basic',
    hint: undefined,
    disabled: false,
    selectedFiles: [],
    clearFilesOnAdd: false,
    displayFileInfo: true,
  },
  argTypes: {
    hint: {type: 'string'},
  },
} as Meta;

export const Basic = (args) => ({
  template: template.default,
  props: {
    multiple: args.multiple,
    acceptFileType: args.acceptFileType,
    id: args.id,
    hint: args.hint,
    disabled: args.disabled,
    selectedFiles: args.selectedFiles,
    clearFilesOnAdd: args.clearFilesOnAdd,
    displayFileInfo: args.displayFileInfo,
    fileSizeValidator: {
      validation: validateFileSize,
      errorMessage: fileSizeErrorMessage,
      thisValue: {maxSize: fileSize}
    },
    uploadRequest: (file) => {
      // Consider upload as success after 3 second mocked delay
      return of(true).pipe(delay(3000));
    },
    invalidFile: (errors: FileError) => {
      console.log(errors.errorMessages)
    }
  }
});

Basic.parameters = {
  preview: generateConfig('components/file-input/file-input-basic', 'FileInputBasicModule', 'file-input-basic')
}


export const InputWithTable = () => ({
  template: '<file-input-table></file-input-table>',
});
InputWithTable.parameters = {
  preview: generateConfig('components/file-input/file-input-table', 'FileInputTableModule', 'file-input-table')
}

export const ServerUpload = () => ({
  template: '<file-input-upload></file-input-upload>'
})
ServerUpload.parameters = {
  preview: generateConfig('components/file-input/file-input-upload', 'FileInputUploadModule', 'file-input-upload')
}
