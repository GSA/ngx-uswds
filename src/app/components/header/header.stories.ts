import { Meta, moduleMetadata } from "@storybook/angular";
import {
  UsaHeaderComponent, UsaHeaderModule,
  UsaHeaderPrimaryExtra, UsaHeaderPrimaryLinks,
  UsaHeaderPrimaryLinkTemplate, UsaHeaderSecondaryExtra,
  UsaHeaderSecondaryLinks, UsaHeaderSecondaryLinkTemplate,
  UsaHeaderSubmenuButton,
  UsaTableModule
} from '@gsa-sam/ngx-uswds';
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ANGULAR_CODESANDBOX } from "../../shared/sandbox/angular-dependencies";
import { primaryNavItems, secondaryNavItems } from "./header-data";
import { action } from "@storybook/addon-actions";
import { HeaderExtendedTemplateModule } from "./header-extended-template/header-extended-template.module";
import { HeaderBasicModule } from "./header-basic/header-basic.module";

declare var require: any;

const template = require('!!raw-loader!./header-basic/header-basic.component.html');
const basicTs = require('!!raw-loader!./header-basic/header-basic.component.ts');
const basicModule = require('!!raw-loader!./header-basic/header-basic.module.ts');
const headerData = require('!!raw-loader!./header-data.ts');

const footer = require('!!raw-loader!./header-footer.template.html');

const sandboxConfig = {
  files: {
    'header-basic.component.ts': basicTs.default,
    'header-basic.component.html': template.default,
    'header-basic.module.ts': basicModule.default,
  },
  moduleName: 'HeaderBasicModule',
  selector: 'header-basic'
};

const actionsData = {
  linkEvent: action('Link Event'),
};

export default {
  title: 'Components/Header',
  component: UsaHeaderComponent,
  subcomponents: {
    UsaHeaderSubmenuButton,
    UsaHeaderPrimaryExtra,
    UsaHeaderPrimaryLinks,
    UsaHeaderPrimaryLinkTemplate,
    UsaHeaderSecondaryExtra,
    UsaHeaderSecondaryLinks,
    UsaHeaderSecondaryLinkTemplate,
  },
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule, UsaTableModule, UsaHeaderModule,
        BrowserAnimationsModule, HeaderBasicModule,
        HeaderExtendedTemplateModule],
    }),
  ],
  args: {
    title: 'Ngx USWDS',
    primaryNavItems: primaryNavItems,
    secondaryNavItems: secondaryNavItems,
    extended: true,
    displayOverlayOnMenuOpen: false,
    linkEvent: action('Link Event')
  },
  argTypes: {
    title: { type: 'string' }
  },
  parameters: {
    preview: [
      {
        tab: "header-basic.component.ts",
        template: basicTs.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
        tab: "header-basic.component.html",
        template: template.default,
        language: "html",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
        tab: "header-basic.module.ts",
        template: basicModule.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
        tab: "header-data.ts",
        template: headerData.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
    ],
  }
} as Meta;

export const Basic = (args) => ({
  template: `
    <header-basic
      [title]="'${args.title}'"
      [navAriaLabel]="navAriaLabel"
      [secondaryNavItems]="secondaryNavItems"
      [primaryNavItems]="primaryNavItems"
      [extended]="extended"
      [displayOverlayOnMenuOpen]="displayOverlayOnMenuOpen"
      [linkEvent]="linkEvent"
    >
    </header-basic>`,
  props: {
    ...args,
    linkEvent: actionsData.linkEvent,
  },
});

/**----------------------------- Template Driven Header ------------------------------ */

const extendedTemplate = require('!!raw-loader!./header-extended-template/header-extended-template.component.html');
const extendedTs = require('!!raw-loader!./header-extended-template/header-extended-template.component.ts');
const extendedModule = require('!!raw-loader!./header-extended-template/header-extended-template.module.ts');

const templateSandboxConfig = {
  files: {
    'header-extended-template.component.ts': extendedTs.default,
    'header-extended-template.component.html': extendedTemplate.default,
    'header-extended-template.module.ts': extendedModule.default,
  },
  moduleName: 'HeaderExtendedTemplateModule',
  selector: 'header-extended-template'
};

const headerTemplate = (args) => ({
  template: `<header-extended-template></header-extended-template>`
});

export const HeaderTemplates = headerTemplate.bind({});
HeaderTemplates.parameters = {
  preview: [
    {
      tab: "header-extended-template.component.ts",
      template: extendedTs.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(
        templateSandboxConfig.files,
        templateSandboxConfig.moduleName,
        templateSandboxConfig.selector),
    },
    {
      tab: "header-extended-template.component.html",
      template: extendedTemplate.default,
      language: "html",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(
        templateSandboxConfig.files,
        templateSandboxConfig.moduleName,
        templateSandboxConfig.selector),
    },
    {
      tab: "header-extended-template.module.ts",
      template: extendedModule.default,
      language: "ts",
      copy: true,
      codesandbox: ANGULAR_CODESANDBOX(
        templateSandboxConfig.files,
        templateSandboxConfig.moduleName,
        templateSandboxConfig.selector),
    },
  ],
}

/**------------------------- Footer Notes ---------------------------*/
export const Footer = () => ({
  template: footer.default,
  props: {
    columnHeaders: ['variable', 'description'],
    dataRows: [
      {
        variable: '$theme-header-font-family ',
        description: 'Font family of the header.',
      },
      {
        variable: '$theme-header-logo-text-width',
        description: 'Width of the logo text area at desktop width as a percentage of the total header width.'
      },
      {
        variable: '$theme-header-max-width',
        description: 'Maximum width of the header.'
      },
      {
        variable: '$theme-header-min-width',
        description: 'Breakpoint at which the non-mobile header is shown.'
      },
    ]
  }
});
