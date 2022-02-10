import { Meta, moduleMetadata } from "@storybook/angular";
import { UsaBreadcrumbComponent, UsaBreadcrumbLinkTemplate, UsaBreadcrumbModule } from '@gsa-sam/ngx-uswds';
import { CommonModule } from "@angular/common";
import { action } from '@storybook/addon-actions';
import { generateConfig } from "src/sandbox/sandbox-utils";
import { BreadcrumbCustomTemplateModule } from "./breadcrumb-custom-template/breadcrumb-custom-template.module";

declare var require: any;

const breadcrumbTemplate = require('!!raw-loader!./breadcrumb-basic/breadcrumb-basic.component.html');
const overview = require('!!raw-loader!./overview-template.html');

const actionsData = {
  onSelection: action('Breadcrumb Selected'),
};


export default {
  title: 'Components/Breadcrumb',
  component: UsaBreadcrumbComponent,
  subcomponents: {
    'UsaBreadcrumbLinkTemplate': UsaBreadcrumbLinkTemplate
  },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, UsaBreadcrumbModule, BreadcrumbCustomTemplateModule],
    }),
  ],
  args: {
    items: [
      {
        id: '1',
        text: 'Home',
        path: '/',
      },
      {
        id: '2',
        text: 'Federal Contracting',
        path: '/'
      },
      {
        id: '3',
        text: 'Contracting assistance programs',
        path: '/'
      },
      {
        id: '4',
        text: 'Women-owned small business federal contracting program',
        path: '/'
      }
    ],
    wrap: false,
    hideSingleCrumb: true,
  }
} as Meta;

export const Overview = () => ({
  template: overview.default,
  props: {},
});
Overview.parameters = {options: {showPanel: false}};

export const Basic = (args) => ({
  template: breadcrumbTemplate.default,
  props: {
    ...args,
    onSelection: actionsData.onSelection,
  },
});

Basic.parameters = {
  preview: generateConfig('components/breadcrumb/breadcrumb-basic', 'BreadcrumbBasicModule', 'breadcrumb-basic')
}


export const CustomTemplate = () => ({
  template: `<breadcrumb-custom-template></breadcrumb-custom-template>`
});
CustomTemplate.parameters = {
  preview: generateConfig('components/breadcrumb/breadcrumb-custom-template', 
    'BreadcrumbCustomTemplateModule', 'breadcrumb-custom-template')
}
