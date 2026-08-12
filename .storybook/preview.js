import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';

// import SAM from '!!style-loader?{"injectType": "lazyStyleTag", "attributes":{"id": "ngx-uswds-theme"}}!css-loader!sass-loader!../src/styles/app.styles.scss'
// import USWDS from '!!style-loader?{"injectType": "lazyStyleTag", "attributes":{"id": "ngx-uswds-theme"}}!css-loader!sass-loader!../src/styles/app.styles.scss'

setCompodocJson(docJson);

export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    inlineStories: true,
  },
  cssVariables: {
    files: {
      // SAM,
      // USWDS,
    },
  },
  options: {
    showPanel: true,
  },
};
