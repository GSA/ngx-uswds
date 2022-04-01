import { Meta, moduleMetadata } from "@storybook/angular";
import {
  UsaHeaderComponent, UsaHeaderModule,
  UsaHeaderPrimaryExtra, UsaHeaderPrimaryLinks,
  UsaHeaderPrimaryLinkTemplate, UsaHeaderSecondaryExtra,
  UsaHeaderSecondaryLinks, UsaHeaderSecondaryLinkTemplate,
  UsaHeaderSubmenuButton,
  UsaSearchModule,
  UsaTableModule
} from '@gsa-sam/ngx-uswds';
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { primaryNavItems, secondaryNavItems } from "./header-data";
import { action } from "@storybook/addon-actions";
import { HeaderExtendedTemplateModule } from "./header-extended-template/header-extended-template.module";
import { HeaderBasicModule } from "./header-basic/header-basic.module";
import { generateConfig } from "src/sandbox/sandbox-utils";

declare var require: any;

const template = require('!!raw-loader!./header-basic/header-basic.component.html');
const headerData = require('!!raw-loader!./header-data.ts');

const footer = require('!!raw-loader!./header-overview.html');

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
        HeaderExtendedTemplateModule, UsaSearchModule],
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
} as Meta;

/**------------------------- Overview Notes ---------------------------*/
export const Overview = () => ({
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
Overview.parameters = {options: {showPanel: false}};


export const Basic = (args) => ({
  template: template.default,
  props: {
    title: args.title,
    primaryNavItems: args.primaryNavItems,
    secondaryNavItems: args.secondaryNavItems,
    extended: args.extended,
    displayOverlayOnMenuOpen: args.displayOverlayOnMenuOpen,
    linkEvent: actionsData.linkEvent,
  },
});

Basic.parameters = {
  preview: [
    ...generateConfig('components/header/header-basic', 'HeaderBasicModule', 'header-basic'),
    {
      tab: "header-data.ts",
      template: headerData.default,
      language: "ts",
      copy: true,
    },
  ]

}

/**----------------------------- Template Driven Header ------------------------------ */
const headerTemplate = (args) => ({
  template: `<header-extended-template></header-extended-template>`
});

export const HeaderTemplates = headerTemplate.bind({});
HeaderTemplates.parameters = {
  preview: generateConfig('components/header/header-extended-template', 'HeaderExtendedTemplateModule', 'header-extended-template')
}
