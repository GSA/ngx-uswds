module.exports = {
  stories: ['../src/stories/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: ['@storybook/addon-links', '@storybook/addon-a11y', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/angular',
    options: {},
  },

  docs: {
    autodocs: true,
  },
};
