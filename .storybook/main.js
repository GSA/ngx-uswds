module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@etchteam/storybook-addon-css-variables-theme",
    "@storybook/addon-mdx-gfm"
  ],

  "framework": {
    name: "@storybook/angular",
    options: {}
  },

  docs: {
    autodocs: true
  }
}
