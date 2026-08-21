# Agent Notes

## Environment and installs

- Use Node 24. The repo pins this with `.nvmrc` (`24`) and `package.json` engines (`>=24.0.0 <25`).
- Keep the root `.npmrc` intact. It pins `registry` and `@gsa-sam:registry` to `https://registry.npmjs.org/` so installs do not inherit an internal Artifactory registry and poison `package-lock.json`.
- Use `npm ci` for clean installs and CI parity; avoid `npm install` unless intentionally updating `package-lock.json`.

## Project layout

- Angular workspace with one docs/demo app and one publishable library:
  - `src/` — demo app, Storybook stories, sandbox/icon generation helpers.
  - `projects/uswds-components/` — `@gsa-sam/ngx-uswds`, built to `dist/ngx-uswds`; public exports live in `projects/uswds-components/src/public-api.ts`.
- Storybook uses `.storybook/main.js` and reads Compodoc output from root `documentation.json` in `.storybook/preview.js`.

## Common commands

- Install: `npm ci`
- Build library: `npm run build` or `npm run build:components`
- Unit tests: `npm run test` or `npm run test:components` (Vitest via the `@angular/build:unit-test` builder)
- Coverage gate: `npm run coverage:check` (reads `coverage/coverage-summary.json`; run `test:components` first)
- Storybook dev server on port 4200: `npm run start`
- Angular demo app dev server on port 4200: `npm run develop`
- Build Storybook: `npm run build-storybook`
- Regenerate Compodoc JSON: `npm run docs:json`
- Regenerate sandbox icons: `npm run sandbox-icons`

## Verification / CI

- GitHub Actions CI runs `npm ci`, `npm run build:components`, builds Storybook, then runs `npm run test:components` followed by `npm run coverage:check`.
- `npm run lint` runs `ng lint` (`@angular-eslint/builder:lint`) over `projects/uswds-components/**`. It currently reports ~880 legacy warnings (migration debt) but exits 0. **The five WCAG 2.1 AA template rules are hard errors** for new/changed templates — `click-events-have-key-events`, `eqeqeq`, `interactive-supports-focus`, `alt-text`, `role-has-required-aria` (GH #273). The six templates in `eslint.config.js`'s `legacyA11yDebt` list keep those rules at `warn` while their backlog is burned down; that list is a ratchet — only ever remove files from it, never add.
- Unit tests run on **Vitest + jsdom** through Angular's `@angular/build:unit-test` builder (Karma/Jasmine were removed). Specs use Vitest globals (`vi`, `expect`, `describe`, `it`); prefer importing a component's `NgModule` over bare `declarations: [...]`, because the builder's TestBed initialises with `errorOnUnknownElements`/`errorOnUnknownProperties` enabled and cannot be relaxed.
- Zone-based helpers (`fakeAsync`, `waitForAsync`) work via `projects/uswds-components/src/test-setup.ts`, which wraps Vitest's test/hook functions in a Zone.js ProxyZone and polyfills `ResizeObserver` for jsdom.
- The Vitest runner ignores `vitest.config.*` (`config: false`) and the builder has no threshold option, so coverage floors are enforced by `scripts/check-coverage.mjs`. The floors live in `coverage-floor.json` (not hardcoded in the script) so that ordinary feature/test PRs never touch the gate itself. Those floors are a **ratchet**: only ever raise them; never lower them to make CI pass. **Do not edit `coverage-floor.json` in a feature PR** — that is what makes parallel PRs conflict. When coverage genuinely improves, lock it in with a dedicated bump commit: run `npm run test:components` then `npm run coverage:bump` (rewrites `coverage-floor.json` to the current measured values), and land it on its own so the shared floor file rarely collides. The gate script itself is covered by `npm run test:scripts` (Node built-in test runner, `scripts/check-coverage.test.mjs`), which CI runs after the ratchet check.
- Build artifacts and coverage output go under `dist/` and `coverage/`; do not commit them.

## Accessibility (WCAG 2.1 AA) enforcement

Two layers enforce WCAG 2.1 AA on **new/changed** code (GH #273). Both are wired into CI (`.github/workflows/ci.yaml`).

- **Lint layer (static templates):** the five `templateAccessibility` rules above are `error` for all templates except the `legacyA11yDebt` allow-list in `eslint.config.js`. A new a11y violation in new work fails `npm run lint`.
- **Runtime layer (rendered axe check):** `npm run test:a11y` serves the static Storybook and walks every story with `@axe-core/playwright` (WCAG 2.1 A/AA tags). Violations are fingerprinted (`storyId | ruleId | target`, with Angular-generated `ng-tns-*`/`_ngcontent-*`/`_nghost-*` fragments stripped so hashes don't churn) and diffed against `tests/accessibility/wcag-2.1-aa-baseline.json`. **New** violations fail; **resolved** ones must be pruned from the baseline. This catches what lint can't — contrast, computed focus order, rendered ARIA state.
  - The baseline is the "triage, don't red-wall" mechanism: the pre-existing backlog is recorded, not blocking. It is a ratchet — shrink it as stories are fixed, never pad it.
  - Regenerate after an intentional change: `UPDATE_A11Y_BASELINE=1 npm run test:a11y`. Commit the baseline diff and explain it in the PR.
  - Stories Storybook itself fails to render (config defects, not a11y issues) can't be axe-assessed, so they are tracked in a committed allow-list, `tests/accessibility/storybook-render-failures.json`. A **new** render failure fails the gate (a newly published broken story can't silently bypass a11y); a fixed one must be removed from the list. Same ratchet, regenerated with `UPDATE_A11Y_BASELINE=1`.
  - In CI the gate reuses the `storybook-static` already built by the build/test job; locally it builds Storybook first. It serves via a pinned `http-server` dev dependency (`npx --no-install`).
  - Config lives in `playwright.a11y.config.ts` (separate from the demo-app smoke `playwright.config.ts`).
- Making these CI steps **required** status checks is admin-owned (DevSecOps).

## Pre-commit checks

There is no automated pre-commit hook in this repo. Before committing, run these manually to avoid CI failures:

- `npm run format:check` — Prettier formatting check (fix with `npm run format`)
- `npm run test:components` — Vitest unit tests
- `npm run coverage:check` — coverage gate (requires `test:components` to have run first)
- `npm run test:a11y` — runtime WCAG 2.1 AA gate over Storybook stories (builds + serves Storybook, then runs axe via Playwright)

The CI Lint job will fail if formatting is violated. Always run `format:check` after writing or editing any TypeScript, HTML, or JSON files.

## Workflow notes

- When adding or renaming library APIs, update the relevant `public-api.ts`; otherwise consumers will not see the export in the packaged library.
- Storybook docs may require `npm run docs:json` before `npm run start` so `.storybook/preview.js` can load `documentation.json`.
- This repo uses a PR template at `.github/pull_request_template.md`; fill every section for PRs.
