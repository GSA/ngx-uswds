import { Meta, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { ModalDismissReasons, UsaModalConfig, UsaModalModule, UsaModalRef, UsaModalService } from "@gsa-sam/ngx-uswds";
import { ReactiveFormsModule } from '@angular/forms';
import { ModalBasicModule } from "./modal-basic/modal-basic.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ANGULAR_CODESANDBOX } from "src/app/shared/sandbox/angular-dependencies";

const basicTemplate = require('!!raw-loader!./modal-basic/modal-basic.component.html');
const basicTs = require('!!raw-loader!./modal-basic/modal-basic.component.ts');
const basicModule = require('!!raw-loader!./modal-basic/modal-basic.module.ts')

const footer = require('!!raw-loader!./footer.template.html');

const sandboxConfig = {
  files: {
    'modal-basic.component.ts': basicTs.default,
    'modal-basic.module.ts': basicModule.default,
    'modal-basic.component.html': basicTemplate.default
  },
  moduleName: 'ModalBasicModule',
  selector: 'modal-basic'
};

export default {
  title: 'Components/Modal',
  component: UsaModalConfig,
  subcomponents: [
    UsaModalService,
    UsaModalRef,
    ModalDismissReasons,
  ],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, UsaModalModule, ReactiveFormsModule, ModalBasicModule, BrowserAnimationsModule],
    }),
  ],
  parameters: {
    preview: [
      {
        tab: "modal-basic.component.ts",
        template: basicTs.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
          tab: "modal-template.html",
          template: basicTemplate.default,
          language: "html",
          copy: true,
          codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
        tab: "modal-basic.module.ts",
        template: basicModule.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
    ],
  }
} as Meta;


export const Basic = (args) => ({
  template: `
  <modal-basic
    [id]="'${args.id}'"
    [ariaLabelledBy]="'${args.ariaLabelledBy}'"
    [ariaDescribedBy]="'${args.ariaDescribedBy}'"
    [size]="'${args.size}'"
    [animation]="${args.animation}"
    [showClose]="${args.showClose}"
    [backdrop]="${args.backdrop}"
    [keyboard]="${args.keyboard}"
    [modalDialogClass]="'${args.modalDialogClass}'"
    [beforeDismiss]="${args.beforeDismiss}"
  ></modal-basic>`,
});

export const Footer = () => ({
  template: footer.default
})

