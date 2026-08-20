import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

// Dedicated config for the runtime WCAG 2.1 AA gate (GH #273). It reuses the
// base Playwright setup but points at the accessibility spec dir and serves the
// built Storybook instead of the demo app. Runs serially with a generous
// timeout because axe walks every story in a single worker.
export default defineConfig({
  ...baseConfig,
  testDir: './tests/accessibility',
  timeout: 600_000,
  fullyParallel: false,
  workers: 1,
  use: {
    ...baseConfig.use,
    baseURL: 'http://127.0.0.1:6007',
  },
  webServer: {
    // In CI the build/test job has already produced `storybook-static` (see
    // .github/workflows/ci.yaml), so reuse it and only serve. Locally there is
    // usually no fresh build, so build first. `http-server` is a pinned dev
    // dependency; `--no-install` keeps `npx` from resolving a mutable latest
    // from the registry. Probe iframe.html (the last artifact written during
    // the preview phase) so readiness is not declared before bundles exist.
    command: process.env.CI
      ? 'npx --no-install http-server storybook-static --port 6007 --silent'
      : 'npm run build-storybook -- --quiet && npx --no-install http-server storybook-static --port 6007 --silent',
    url: 'http://127.0.0.1:6007/iframe.html',
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
    env: {
      NODE_OPTIONS: '--max_old_space_size=8192',
    },
  },
});
