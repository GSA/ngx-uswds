import { Meta, moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { UsaSearchComponent, UsaSearchModule } from "@gsa-sam/ngx-uswds";
import { FormsModule } from '@angular/forms';
import { action } from "@storybook/addon-actions";
import { ANGULAR_CODESANDBOX } from "src/app/shared/sandbox/angular-dependencies";

declare var require;
const template = require('!!raw-loader!./search-basic/search-basic.component.html');
const basicTs = require('!!raw-loader!./search-basic/search-basic.component.ts');
const basicModule = require('!!raw-loader!./search-basic/search-basic.module.ts')

const sandboxConfig = {
  files: {
    'search-basic.component.ts': basicTs.default,
    'search-basic.module.ts': basicModule.default,
    'search-basic.component.html': template.default
  },
  moduleName: 'SearchBasicModule',
  selector: 'search-basic'
};


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
    preview: [
      {
        tab: "search-basic.component.ts",
        template: basicTs.default,
        language: "ts",
        copy: true,
        codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
          tab: "search-template.html",
          template: template.default,
          language: "html",
          copy: true,
          codesandbox: ANGULAR_CODESANDBOX(sandboxConfig.files, sandboxConfig.moduleName, sandboxConfig.selector),
      },
      {
        tab: "search-basic.module.ts",
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

