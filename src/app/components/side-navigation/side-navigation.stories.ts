import { Meta, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaSidenavComponent, UsaSidenavModule } from "@gsa-sam/ngx-uswds";
import { FormsModule } from '@angular/forms';
import { action } from "@storybook/addon-actions";
import { sidenavModel } from "./side-navigation.data";
import { RouterTestingModule } from "@angular/router/testing";
import { ANGULAR_CODESANDBOX } from "src/app/shared/sandbox/angular-dependencies";

const actionsData = {
  sidenavClicked: action('Text Change'),
};

const template = require('!!raw-loader!./side-navigation-basic/side-navigation-basic.component.html');
const basicTs = require('!!raw-loader!./side-navigation-basic/side-navigation-basic.component.ts');
const basicModule = require('!!raw-loader!./side-navigation-basic/side-navigation-basic.module.ts')

const sandboxConfig = {
  files: {
    'side-navigation-basic.component.ts': basicTs.default,
    'side-navigation-basic.module.ts': basicModule.default,
    'side-navigation-basic.component.html': template.default
  },
  moduleName: 'SideNavigationBasicModule',
  selector: 'side-navigation-basic'
};

export default {
  title: 'Components/SideNavigation',
  component: UsaSidenavComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, UsaSidenavModule],
    }),
  ],
  args: {
    sidenavContent: sidenavModel,
    expandType: 'single',
    enableLabelCollapse: false,
    autoCollapseLabels: false,
    selectFirstLabelChild: true,
    sidenavClicked: actionsData.sidenavClicked,
  },
  parameters: {
    preview: [
      {
        tab: "side-navigation-basic.component.ts",
        template: basicTs.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
          tab: "side-navigation-template.html",
          template: template.default,
          language: "html",
          copy: true,
          codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
        tab: "side-navigation-basic.module.ts",
        template: basicModule.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
    ],
  }
} as Meta;


export const Basic = (args) => ({
  template: template.default,
  props: {
    sidenavContent: args.sidenavContent,
    expandType: args.expandType,
    enableLabelCollapse: args.enableLabelCollapse,
    autoCollapseLabels: args.autoCollapseLabels,
    selectFirstLabelChild: args.selectFirstLabelChild,
    sidenavClicked: actionsData.sidenavClicked,
  }
});

