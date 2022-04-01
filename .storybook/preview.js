import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";

import SAM from '!!style-loader?{"injectType": "lazyStyleTag", "attributes":{"id": "ngx-uswds-theme"}}!css-loader!sass-loader!../src/styles/sam.scss'
import USWDS from '!!style-loader?{"injectType": "lazyStyleTag", "attributes":{"id": "ngx-uswds-theme"}}!css-loader!sass-loader!../src/styles/uswds-styles.scss'

import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme'

setCompodocJson(docJson);

export const decorators = [
  cssVariablesTheme,
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
  cssVariables: {
    files: {
      SAM,
      USWDS,
    }
  },
  options: { 
    showPanel: true 
  }
}