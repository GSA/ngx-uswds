// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

// Migration baseline: existing code currently reports 512 warnings in uswds-components
// and 35 warnings in uswds-formly. Keep these rules as warnings so ESLint can run
// in CI now; tighten them to errors as the legacy lint debt is paid down.
const existingDebtWarnings = {
  "@angular-eslint/component-class-suffix": "warn",
  "@angular-eslint/component-selector": "warn",
  "@angular-eslint/directive-class-suffix": "warn",
  "@angular-eslint/directive-selector": "warn",
  "@angular-eslint/no-output-native": "warn",
  "@angular-eslint/no-output-on-prefix": "warn",
  "@angular-eslint/no-output-rename": "warn",
  "@angular-eslint/prefer-standalone": "warn",
  "@typescript-eslint/array-type": "warn",
  "@typescript-eslint/consistent-generic-constructors": "warn",
  "@typescript-eslint/consistent-indexed-object-style": "warn",
  "@typescript-eslint/consistent-type-assertions": "warn",
  "@typescript-eslint/no-empty-function": "warn",
  "@typescript-eslint/no-explicit-any": "warn",
  "@typescript-eslint/no-inferrable-types": "warn",
  "@typescript-eslint/no-this-alias": "warn",
  "@typescript-eslint/no-unused-expressions": "warn",
  "@typescript-eslint/no-unused-vars": "warn",
  "@typescript-eslint/no-unsafe-function-type": "warn",
  "@typescript-eslint/no-wrapper-object-types": "warn",
  "prefer-const": "warn",
  "no-case-declarations": "warn",
  "no-var": "warn",
  "@angular-eslint/no-input-rename": "warn",
  "@typescript-eslint/no-empty-object-type": "warn",
};

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: existingDebtWarnings,
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/click-events-have-key-events": "warn",
      "@angular-eslint/template/eqeqeq": "warn",
      "@angular-eslint/template/interactive-supports-focus": "warn",
      "@angular-eslint/template/alt-text": "warn",
      "@angular-eslint/template/role-has-required-aria": "warn",
    },
  }
);
