import { Meta, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaSearchComponent, UsaSearchModule } from "@gsa-sam/ngx-uswds";
import { FormsModule } from '@angular/forms';
import { action } from "@storybook/addon-actions";
import { generateConfig } from "src/sandbox/sandbox-utils";

declare var require;
const template = require('!!raw-loader!./search-basic/search-basic.component.html');

const actionsData = {
  searchTextChange: action('Text Change'),
  blurUpdate: action('Blur'),
  onTextSubmit: action('Submit'),
};

export default {
  title: 'Components/Search',
  component: UsaSearchComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, UsaSearchModule, FormsModule],
    }),
  ],
  args: {
    buttonText: 'Search',
    size: 'big',
  }
} as Meta;


export const Basic = (args) => ({
  template: template.default,
  props: {
    buttonText: args.buttonText,
    size: args.size,
    placeholder: args.placeholder,
    id: args.id,
    name: args.name,
    ariaLabel: args.ariaLabel,
    searchTextChange: actionsData.searchTextChange,
    onBlur: actionsData.blurUpdate,
    onTextSubmit: actionsData.onTextSubmit,
  },
});

Basic.parameters = {
  preview: generateConfig('components/search/search-basic', 'SearchBasicModule', 'search-basic')
}