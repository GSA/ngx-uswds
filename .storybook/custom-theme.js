import { create } from '@storybook/theming';

export default create({
  base: 'light',

  // Typography
  fontBase: 'Source Sans Pro Web,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif',
  fontCode: 'monospace',

  // Toolbar default and active colors
  barTextColor: 'white',
  barSelectedColor: '#f0f0f0',

  // Form colors
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'NgxUSWDS',
});