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
- `npm run lint` exists in `package.json`, but the Angular workspace currently has no configured `lint` target, so it fails with `Cannot find "lint" target for the specified project.` Do not treat this as a new regression unless you are working on lint setup.
- Unit tests run on **Vitest + jsdom** through Angular's `@angular/build:unit-test` builder (Karma/Jasmine were removed). Specs use Vitest globals (`vi`, `expect`, `describe`, `it`); prefer importing a component's `NgModule` over bare `declarations: [...]`, because the builder's TestBed initialises with `errorOnUnknownElements`/`errorOnUnknownProperties` enabled and cannot be relaxed.
- Zone-based helpers (`fakeAsync`, `waitForAsync`) work via `projects/uswds-components/src/test-setup.ts`, which wraps Vitest's test/hook functions in a Zone.js ProxyZone and polyfills `ResizeObserver` for jsdom.
- The Vitest runner ignores `vitest.config.*` (`config: false`) and the builder has no threshold option, so coverage floors are enforced by `scripts/check-coverage.mjs`. The floors live in `coverage-floor.json` (not hardcoded in the script) so that ordinary feature/test PRs never touch the gate itself. Those floors are a **ratchet**: only ever raise them; never lower them to make CI pass. **Do not edit `coverage-floor.json` in a feature PR** — that is what makes parallel PRs conflict. When coverage genuinely improves, lock it in with a dedicated bump commit: run `npm run test:components` then `npm run coverage:bump` (rewrites `coverage-floor.json` to the current measured values), and land it on its own so the shared floor file rarely collides.
- Build artifacts and coverage output go under `dist/` and `coverage/`; do not commit them.

## Pre-commit checks

There is no automated pre-commit hook in this repo. Before committing, run these manually to avoid CI failures:

- `npm run format:check` — Prettier formatting check (fix with `npm run format`)
- `npm run test:components` — Vitest unit tests
- `npm run coverage:check` — coverage gate (requires `test:components` to have run first)

The CI Lint job will fail if formatting is violated. Always run `format:check` after writing or editing any TypeScript, HTML, or JSON files.

## Workflow notes

- When adding or renaming library APIs, update the relevant `public-api.ts`; otherwise consumers will not see the export in the packaged library.
- Storybook docs may require `npm run docs:json` before `npm run start` so `.storybook/preview.js` can load `documentation.json`.
- This repo uses a PR template at `.github/pull_request_template.md`; fill every section for PRs.
