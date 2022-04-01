import { Meta, moduleMetadata } from "@storybook/angular";
import { UsaAccordionComponent, UsaAccordionItem, UsaAccordionModule } from '@gsa-sam/ngx-uswds';
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { action } from '@storybook/addon-actions';
import { generateConfig } from "src/sandbox/sandbox-utils";

declare var require: any;

const accordionTemplate = require('!!raw-loader!./accordion-basic/accordion-basic.component.html');

const footerTemplate = require('!!raw-loader!./accordion-overview.html')

const actionsData = {
  panelChange: action('Panel Change'),
  shown: action('Shown'),
  hidden: action('Hidden'),
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
  }
} as Meta;

export const Overview = () => ({
  template: footerTemplate.default,
  props: {},
});
Overview.parameters = {options: {showPanel: false}};

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

Basic.parameters = {
  preview: generateConfig('components/accordion/accordion-basic', 'AccordionBasicModule', 'accordion-basic')
}
