import { Meta, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaFileInputComponent, UsaFileInputModule, UsaTableModule } from "@gsa-sam/ngx-uswds";
import { ReactiveFormsModule } from '@angular/forms';
import { FileInputTableModule } from "./file-input-table/file-input-table.module";
import { FileInputUploadModule } from "./file-input-upload/file-input-upload.module";
import { ANGULAR_CODESANDBOX } from "src/app/shared/sandbox/angular-dependencies";


const template = require('!!raw-loader!./file-input-basic/file-input-basic.component.html');
const basicTs = require('!!raw-loader!./file-input-basic/file-input-basic.component.ts');
const basicModule = require('!!raw-loader!./file-input-basic/file-input-basic.module.ts')


const sandboxConfig = {
  files: {
    'file-input-basic.component.ts': basicTs.default,
    'file-input-basic.component.html': template.default,
    'file-input-basic.module.ts': basicModule.default,
  },
  moduleName: 'FileInputBasicModule',
  selector: 'file-input-basic'
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
    displayFileInfo: true,
    multiple: false,
    clearFilesOnAdd: false,
  },
  argTypes: {
    hint: {type: 'string'},
  },
  parameters: {
    preview: [
      {
        tab: "file-input-basic.component.ts",
        template: basicTs.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
          tab: "file-input-template.html",
          template: template.default,
          language: "html",
          copy: true,
          codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
        tab: "file-input-basic.module.ts",
        template: basicModule.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
    ],
  }
} as Meta;

const basicTemplate = (args) => ({
  template: `<usa-file-input [id]="${args.id}" 
    [displayFileInfo]="${args.displayFileInfo}" 
    [multiple]="${args.multiple}"
    [clearFilesOnAdd]="${args.clearFilesOnAdd}"
    [disabled]="${args.disabled}"
    [acceptFileType]="${args.acceptFileType}"
    [hint]="${args.hint}"
    [selectedFiles]="${args.selectedFiles}"
    [uploadRequest]="${args.uploadRequest}"
  >
    </usa-file-input>`,
});

export const Basic = basicTemplate.bind({});


export const InputWithTable = () => ({
  template: '<file-input-table></file-input-table>',
});

export const ServerUpload = () => ({
  template: '<file-input-upload></file-input-upload>'
})
