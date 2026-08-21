import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';

// import SAM from '!!style-loader?{"injectType": "lazyStyleTag", "attributes":{"id": "ngx-uswds-theme"}}!css-loader!sass-loader!../src/styles/app.styles.scss'
// import USWDS from '!!style-loader?{"injectType": "lazyStyleTag", "attributes":{"id": "ngx-uswds-theme"}}!css-loader!sass-loader!../src/styles/app.styles.scss'

setCompodocJson(docJson);

export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
  // The @storybook/addon-a11y panel runs axe automatically inside the preview
  // iframe on every render. Our Playwright a11y gate (tests/accessibility) runs
  // its own AxeBuilder.analyze() per story; two axe runs in the same frame race
  // and intermittently throw "Axe is already running". `test: 'off'` disables
  // the addon's automatic run unconditionally (the panel stays available for
  // interactive use), so the CI gate owns the single axe pass. See GH #273.
  a11y: {
    test: 'off',
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
