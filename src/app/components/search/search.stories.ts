import { Meta, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaSearchComponent, UsaSearchModule } from "@gsa-sam/ngx-uswds";
import { FormsModule } from '@angular/forms';
import { action } from "@storybook/addon-actions";
import { generateConfig, generateGithubLink } from "src/app/shared/sandbox/sandbox-utils";

declare var require;
const template = require('!!raw-loader!./search-basic/search-basic.component.html');

const actionsData = {
  searchTextChange: action('Text Change'),
  blurUpdate: action('Blur'),
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
  },
  parameters: {
    githubLink: generateGithubLink('components/search')
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
  },
});

Basic.parameters = {
  preview: generateConfig('components/search/search-basic', 'SearchBasicModule', 'search-basic'),
  githubLink: generateGithubLink('components/search/search-basic')
}