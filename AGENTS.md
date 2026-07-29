# Agent Notes

## Environment and installs

- Use Node 24. The repo pins this with `.nvmrc` (`24`) and `package.json` engines (`>=24.0.0 <25`).
- Keep the root `.npmrc` intact. It pins `registry` and `@gsa-sam:registry` to `https://registry.npmjs.org/` so installs do not inherit an internal Artifactory registry and poison `package-lock.json`.
- Use `npm ci` for clean installs and CI parity; avoid `npm install` unless intentionally updating `package-lock.json`.

## Project layout

- Angular workspace with one docs/demo app and two publishable libraries:
  - `src/` — demo app, Storybook stories, sandbox/icon generation helpers.
  - `projects/uswds-components/` — `@gsa-sam/ngx-uswds`, built to `dist/ngx-uswds`; public exports live in `projects/uswds-components/src/public-api.ts`.
  - `projects/uswds-formly/` — `@gsa-sam/uswds-formly`, built to `dist/uswds-formly`; public exports live in `projects/uswds-formly/src/public-api.ts`.
- Storybook uses `.storybook/main.js` and reads Compodoc output from root `documentation.json` in `.storybook/preview.js`.

## Common commands

- Install: `npm ci`
- Build both libraries: `npm run build`
- Build one library:
  - Components: `npm run build:components`
  - Formly: `npm run build:formly`
- Unit tests:
  - Components: `npm run test:components`
  - Formly: `npm run test:formly`
  - Both: `npm run test` (currently includes formly even though CI only runs component tests)
- Storybook dev server on port 4200: `npm run start`
- Angular demo app dev server on port 4200: `npm run develop`
- Build Storybook: `npm run build-storybook`
- Regenerate Compodoc JSON: `npm run docs:json`
- Regenerate sandbox icons: `npm run sandbox-icons`

## Verification / CI

- GitHub Actions CI runs `npm ci`, `npm run build:components && npm run build:formly`, then `npm run test:components`.
- `npm run lint` exists in `package.json`, but the Angular workspace currently has no configured `lint` target, so it fails with `Cannot find "lint" target for the specified project.` Do not treat this as a new regression unless you are working on lint setup.
- Component tests are configured for headless Chrome in the npm script. The raw Karma configs default to interactive Chrome.
- Build artifacts and coverage output go under `dist/` and `coverage/`; do not commit them.

## Workflow notes

- When adding or renaming library APIs, update the relevant `public-api.ts`; otherwise consumers will not see the export in the packaged library.
- Storybook docs may require `npm run docs:json` before `npm run start` so `.storybook/preview.js` can load `documentation.json`.
- This repo uses a PR template at `.github/pull_request_template.md`; fill every section for PRs.
