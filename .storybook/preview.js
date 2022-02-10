import { setCompodocJson } from "@storybook/addon-docs/angular";
import { useGlobals } from '@storybook/api';
import docJson from "../documentation.json";

import SAM from '!!style-loader?{injectType: "lazyStyleTag", attributes:{id: "ngx-uswds-theme"}}!css-loader!sass-loader!../src/styles/sam.scss'
import USWDS from '!!style-loader?{injectType: "lazyStyleTag", attributes:{id: "ngx-uswds-theme"}}!css-loader!sass-loader!../src/styles/uswds-styles.scss'

import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme'

setCompodocJson(docJson);

export const withGithub = (storyFn, context) => {
  /** Allow some time for the toolbar icons to render in UI */
  setTimeout(() => {
    const githubButton = window.parent.document.querySelector('button[title="Link to Github"]');

    if (githubButton) {
      githubButton.onclick = () => {
        window.parent.open(context.parameters.githubLink, '_blank');
      }
    }
  }, 500);

  return storyFn(context);
};

export const decorators = [
  cssVariablesTheme,
  withGithub,
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
};

export const globalTypes = {
  github: {
    name: 'github',
    description: 'Link to Github',
    toolbar: {
      icon: 'github',
      items: [],
    }
  },
};
