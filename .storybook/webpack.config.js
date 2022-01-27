const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = async ({ config }) => {
  const mainFields = [
    'es2016',
    'browser',
    'module',
    'main',
  ];

  config.resolve.plugins = [new TsconfigPathsPlugin({
    configFile: 'tsconfig.json',
    mainFields
  })];

  config.resolve.mainFields = mainFields;

  return config;
};
