import { Meta, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { ModalDismissReasons, UsaModalConfig, UsaModalModule, UsaModalRef, UsaModalService } from "@gsa-sam/ngx-uswds";
import { ModalBasicModule } from "./modal-basic/modal-basic.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { generateConfig } from "src/sandbox/sandbox-utils";
import { ModalComponentWrapperModule } from "./modal-component-wrapper/modal-component-wrapper.module";
import { ModalCustomFocusModule } from "./modal-custom-focus/modal-custom-focus.module";
import { ModalForcedActionModule } from "./modal-forced-action/modal-forced-action.module";
import { ModalScrollableContentModule } from "./modal-scrollable-content/modal-scrollable-content.module";
import { ModalStackedModule } from "./modal-stacked/modal-stacked.module";


const footer = require('!!raw-loader!./modal-overview.html');

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
      imports: [
        BrowserAnimationsModule,
        CommonModule, 
        UsaModalModule, 
        ModalBasicModule, 
        ModalComponentWrapperModule,
        ModalCustomFocusModule,
        ModalForcedActionModule,
        ModalScrollableContentModule,
        ModalStackedModule
      ],
    }),
  ],
} as Meta;

export const Overview = () => ({
  template: footer.default
})
Overview.parameters = {options: {showPanel: false}};


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

Basic.parameters = {
  preview: generateConfig('components/modal/modal-basic', 'ModalBasicModule', 'modal-basic')
}


export const ComponentContent = () => ({
  template: `<modal-component-wrapper></modal-component-wrapper>`
});

ComponentContent.parameters = {
  preview: generateConfig('components/modal/modal-component-wrapper', 'ModalComponentWrapperModule', 'modal-component-wrapper')
}

export const CustomFocus = () => ({
  template: `<modal-custom-focus></modal-custom-focus>`
})

CustomFocus.parameters = {
  preview: generateConfig('components/modal/modal-custom-focus', 'ModalCustomFocusModule', 'modal-custom-focus')
};


export const ForcedAction = () => ({
  template: `<modal-forced-action></modal-forced-action>`,
});

ForcedAction.parameters = {
  preview: generateConfig('components/modal/modal-forced-action', 'ModalForcedAction', 'modal-forced-action')
}


export const ModalScrollable = () => ({
  template: `<modal-scrollable-content></modal-scrollable-content>`,
});

ModalScrollable.parameters = {
  preview: generateConfig('components/modal/modal-scrollable-content', 'ModalScrollableContentModule', 'modal-scrollable-content')
}

export const ModalStacked = () => ({
  template: `<modal-stacked></modal-stacked>`,
});

ModalStacked.parameters = {
  preview: generateConfig('components/modal/modal-stacked', 'ModalStackedModule', 'modal-stacked')
}
