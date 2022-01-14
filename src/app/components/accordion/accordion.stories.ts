import { Meta, moduleMetadata } from "@storybook/angular";
import { UsaAccordionComponent, UsaAccordionItem, UsaAccordionModule } from '@gsa-sam/ngx-uswds';
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { action } from '@storybook/addon-actions';
import { ANGULAR_CODESANDBOX } from "../../shared/sandbox/angular-dependencies";

declare var require: any;

const accordionTemplate = require('!!raw-loader!./accordion-basic/accordion-basic.component.html');
const accordionBasicTs = require('!!raw-loader!./accordion-basic/accordion-basic.component.ts');
const accordionBasicModule = require('!!raw-loader!./accordion-basic/accordion-basic.module.ts');
const footerTemplate = require('!!raw-loader!./accordion.footer.html')

const actionsData = {
  panelChange: action('Panel Change'),
  shown: action('Shown'),
  hidden: action('Hidden'),
};

const sandboxConfig = {
  files: {
    'accordion-basic.component.ts': accordionBasicTs.default,
    'accordion-basic.module.ts': accordionBasicModule.default,
    'accordion-basic.component.html': accordionTemplate.default
  },
  moduleName: 'AccordionBasicModule',
  selector: 'accordion-basic'
};

export default {
  title: 'Components/Accordion',
  component: UsaAccordionComponent,
  subcomponents: {UsaAccordionItem},
  decorators: [
    moduleMetadata({
      imports: [CommonModule, UsaAccordionModule, BrowserAnimationsModule],
    }),
  ],
  args: {
    singleSelect: false,
    bordered: false,
    animation: true,
    headerLevel: 4,
  },
  parameters: {
    preview: [
      {
        tab: "accordion-basic.component.ts",
        template: accordionBasicTs.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
          tab: "accordion-template.html",
          template: accordionTemplate.default,
          language: "html",
          copy: true,
          codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
        tab: "accordion-basic.module.ts",
        template: accordionBasicModule.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
    ],
  }
} as Meta;


export const Basic = (args) => ({
  template: accordionTemplate.default,
  props: {
    singleSelect: args.singleSelect,
    bordered: args.bordered,
    animation: args.animation,
    headerLevel: args.headerLevel,
    activeIds: args.activeIds,
    onPanelChange: actionsData.panelChange,
    shown: actionsData.shown,
    hidden: actionsData.hidden,
  },
});

export const Footer = () => ({
  template: footerTemplate.default,
  props: {},
});

