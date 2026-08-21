// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

// Migration baseline: existing uswds-components code currently reports warnings.
// Keep these rules as warnings so ESLint can run in CI now; tighten them to
// errors as the legacy lint debt is paid down.
const existingDebtWarnings = {
  '@angular-eslint/component-class-suffix': 'warn',
  '@angular-eslint/component-selector': [
    'warn',
    {
      type: 'element',
      prefix: 'usa',
      style: 'kebab-case',
    },
  ],
  '@angular-eslint/directive-class-suffix': 'warn',
  '@angular-eslint/directive-selector': [
    'warn',
    {
      type: 'attribute',
      prefix: 'usa',
      style: 'camelCase',
    },
  ],
  '@angular-eslint/no-output-native': 'warn',
  '@angular-eslint/no-output-on-prefix': 'warn',
  '@angular-eslint/no-output-rename': 'warn',
  '@angular-eslint/prefer-inject': 'warn',
  '@angular-eslint/prefer-standalone': 'warn',
  '@typescript-eslint/array-type': 'warn',
  '@typescript-eslint/consistent-generic-constructors': 'warn',
  '@typescript-eslint/consistent-indexed-object-style': 'warn',
  '@typescript-eslint/consistent-type-assertions': 'warn',
  '@typescript-eslint/no-empty-function': 'warn',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-inferrable-types': 'warn',
  '@typescript-eslint/no-this-alias': 'warn',
  '@typescript-eslint/no-unused-expressions': 'warn',
  '@typescript-eslint/no-unused-vars': 'warn',
  '@typescript-eslint/no-unsafe-function-type': 'warn',
  '@typescript-eslint/no-wrapper-object-types': 'warn',
  'prefer-const': 'warn',
  'no-case-declarations': 'warn',
  'no-var': 'warn',
  '@angular-eslint/no-input-rename': 'warn',
  '@typescript-eslint/no-empty-object-type': 'warn',
};

// Templates carrying pre-existing WCAG 2.1 AA lint violations (GH #273). These
// stay at `warn` until their violations are fixed; new/changed templates get
// the hard `error` gate. Ratchet: only shrink this list, never grow it.
const legacyA11yDebt = [
  'projects/uswds-components/src/lib/combo-box/combo-box.component.html',
  'projects/uswds-components/src/lib/datepicker/calendar/month-view.html',
  'projects/uswds-components/src/lib/datepicker/calendar/multi-year-view.html',
  'projects/uswds-components/src/lib/datepicker/calendar/year-view.html',
  'projects/uswds-components/src/lib/file-input/file-input.component.html',
  'projects/uswds-components/src/lib/header/header.component.html',
];

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: existingDebtWarnings,
  },
  {
    // WCAG 2.1 AA lint gate (ADR-0006 warn-first-then-error posture, GH #273).
    //
    // These five templateAccessibility rules are hard errors for all new and
    // changed templates: a new violation fails `npm run lint` in CI. The
    // pre-existing backlog is NOT red-walled — the six legacy templates listed
    // in `legacyA11yDebt` below keep these rules at `warn` so their known
    // violations remain visible without blocking CI, and are burned down over
    // time (tracked by the lint-debt burndown issue). Do not add files to that
    // list; fix violations in new work instead.
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'error',
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/interactive-supports-focus': 'error',
      '@angular-eslint/template/alt-text': 'error',
      '@angular-eslint/template/role-has-required-aria': 'error',
    },
  },
  {
    // Legacy a11y debt: pre-existing templateAccessibility violations that
    // predate the #273 hard gate. Scoped back to `warn` so CI stays green while
    // the backlog is burned down. This list is a ratchet — only ever remove
    // files from it (once their violations are fixed), never add.
    files: legacyA11yDebt,
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      '@angular-eslint/template/eqeqeq': 'warn',
      '@angular-eslint/template/interactive-supports-focus': 'warn',
      '@angular-eslint/template/alt-text': 'warn',
      '@angular-eslint/template/role-has-required-aria': 'warn',
    },
  },
);
