import { Meta, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaSidenavComponent, UsaSidenavModule } from "@gsa-sam/ngx-uswds";
import { FormsModule } from '@angular/forms';
import { action } from "@storybook/addon-actions";
import { sidenavModel } from "./side-navigation.data";
import { dropdownSidenavModel } from "./side-navigation-dropdown/side-navigation-dropdown.data";
import { generateConfig } from "src/sandbox/sandbox-utils";

const actionsData = {
  sidenavClicked: action('Text Change'),
};

const basicTemplate = require('!!raw-loader!./side-navigation-basic/side-navigation-basic.component.html');
const dropdownTemplate = require('!!raw-loader!./side-navigation-dropdown/side-navigation-dropdown.component.html');

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
    dropdownSidenavContent: dropdownSidenavModel,
    expandType: 'single',
    enableLabelCollapse: false,
    autoCollapseLabels: false,
    selectFirstLabelChild: true,
    sidenavClicked: actionsData.sidenavClicked,
  },
} as Meta;


export const Basic = (args) => ({
  template: basicTemplate.default,
  props: {
    sidenavContent: args.sidenavContent,
    expandType: args.expandType,
    enableLabelCollapse: args.enableLabelCollapse,
    autoCollapseLabels: args.autoCollapseLabels,
    selectFirstLabelChild: args.selectFirstLabelChild,
    sidenavClicked: actionsData.sidenavClicked,
  }
});

Basic.parameters = {
  preview: generateConfig('components/side-navigation/side-navigation-basic', 'SideNavigationBasicModule', 'side-navigation-basic')
}

export const Dropdown = (args) => ({
  template: dropdownTemplate.default,
  props: {
    dropdownSidenavContent: args.dropdownSidenavContent,
    expandType: args.expandType,
    enableLabelCollapse: args.enableLabelCollapse,
    autoCollapseLabels: args.autoCollapseLabels,
    selectFirstLabelChild: args.selectFirstLabelChild,
    sidenavClicked: actionsData.sidenavClicked,
  }
});

Dropdown.parameters = {
  preview: generateConfig('components/side-navigation/side-navigation-dropdown', 'SideNavigationDropdownModule', 'side-navigation-dropdown')
}


