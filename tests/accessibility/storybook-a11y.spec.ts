import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Runtime WCAG 2.1 AA gate for ngx-uswds (GH #273). Walks every published
// Storybook story with axe-core and compares the rendered violations against a
// committed baseline. New violations fail CI; resolved violations must be
// removed from the baseline. The baseline is the "triage, don't red-wall"
// mechanism: the pre-existing backlog is recorded, not blocking, and is burned
// down over time by deleting fingerprints as stories are fixed.
//
// Regenerate the baseline after an intentional change with:
//   UPDATE_A11Y_BASELINE=1 npm run test:a11y

const WCAG_21_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
const BASELINE_PATH = join(__dirname, 'wcag-2.1-aa-baseline.json');
const RENDER_FAILURES_PATH = join(__dirname, 'storybook-render-failures.json');

interface AxeNode {
  target: string[];
}

interface AxeViolation {
  id: string;
  nodes: AxeNode[];
}

// Angular stamps view-encapsulation classes (`ng-tns-c<hash>-<index>`) and
// content/host attributes (`_ngcontent-*`, `_nghost-*`) into rendered markup.
// Their hashes and indices shift with unrelated compilation or instance-order
// changes, so leaving them in a committed fingerprint makes the same violation
// churn as simultaneously "new" and "resolved". Strip them so a fingerprint is
// stable across builds.
function normalizeTarget(selector: string): string {
  return selector
    .replace(/\.ng-tns-c\d+-\d+/g, '')
    .replace(/\[_ngcontent-[^\]]+\]/g, '')
    .replace(/\[_nghost-[^\]]+\]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function violationFingerprints(storyId: string, violations: AxeViolation[]): string[] {
  return violations.flatMap((violation) =>
    violation.nodes.map((node) => [storyId, violation.id, ...node.target.map(normalizeTarget)].join(' | ')),
  );
}

test('axe detects a rendered WCAG 2.1 AA violation', async ({ page }) => {
  // Sanity check: prove the harness actually reports contrast failures, so a
  // green story run means "no violations" and never "axe silently did nothing".
  await page.setContent('<main><p style="color:#aaa;background:#fff">Text</p></main>');

  const results = await new AxeBuilder({ page }).withTags(WCAG_21_AA_TAGS).analyze();

  expect(results.violations.map(({ id }) => id)).toContain('color-contrast');
});

test('Storybook stories have no unresolved WCAG 2.1 AA violations', async ({ page, request, context }) => {
  const response = await request.get('/index.json');
  expect(response.ok()).toBeTruthy();

  const { entries } = (await response.json()) as {
    entries: Record<string, { id: string; type: string }>;
  };
  const stories = Object.values(entries)
    .filter(({ type }) => type === 'story')
    .sort((left, right) => left.id.localeCompare(right.id));

  const fingerprints: string[] = [];
  const renderFailures: string[] = [];
  for (const story of stories) {
    // Fresh page per story: a clean frame with no carried-over render/axe state
    // from the previous iteration.
    const storyPage = await context.newPage();
    try {
      await storyPage.goto(`/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story`);

      // Wait for Storybook to settle. A broken story flashes `sb-show-main`
      // for ~200ms before flipping to `sb-show-errordisplay`, so matching
      // "main OR error" can latch onto that transient main state and
      // misclassify a render failure as a rendered story. Wait for the class
      // to be *stable* across a short window before reading it.
      await expect(storyPage.locator('body'), `${story.id} should settle`).toHaveClass(
        /\bsb-show-main\b|\bsb-show-errordisplay\b/,
      );
      let bodyClass = '';
      await expect
        .poll(
          async () => {
            const current = (await storyPage.locator('body').getAttribute('class')) ?? '';
            const stable = current === bodyClass;
            bodyClass = current;
            return stable && /\bsb-show-main\b|\bsb-show-errordisplay\b/.test(current);
          },
          { message: `${story.id} should reach a stable render state`, timeout: 10_000, intervals: [250] },
        )
        .toBe(true);

      // A story config defect (not an a11y issue) shows Storybook's own error
      // display and cannot be axe-assessed. Such stories are tracked in a
      // committed allow-list (`storybook-render-failures.json`) so a *new*
      // render failure fails the gate — a newly published story can never
      // silently bypass the a11y check by failing to render.
      if (bodyClass.includes('sb-show-errordisplay')) {
        renderFailures.push(story.id);
        continue;
      }

      // addon-a11y's automatic axe run is disabled via `a11y.test: 'off'` in
      // .storybook/preview.js, so this AxeBuilder.analyze() is the only axe run
      // in the frame — no "Axe is already running" race.
      const results = await new AxeBuilder({ page: storyPage })
        .withTags(WCAG_21_AA_TAGS)
        .exclude("#storybook-root[aria-hidden='true']")
        .analyze();

      fingerprints.push(...violationFingerprints(story.id, results.violations as AxeViolation[]));
    } finally {
      await storyPage.close();
    }
  }

  const current = [...new Set(fingerprints)].sort();
  const currentRenderFailures = [...new Set(renderFailures)].sort();

  if (process.env.UPDATE_A11Y_BASELINE === '1') {
    writeFileSync(BASELINE_PATH, `${JSON.stringify(current, null, 2)}\n`);
    writeFileSync(RENDER_FAILURES_PATH, `${JSON.stringify(currentRenderFailures, null, 2)}\n`);
  }

  const baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8')) as string[];
  const baselineSet = new Set(baseline);
  const currentSet = new Set(current);
  const newViolations = current.filter((fingerprint) => !baselineSet.has(fingerprint));
  const resolvedViolations = baseline.filter((fingerprint) => !currentSet.has(fingerprint));

  // Render failures are a ratchet too: known-broken stories are allow-listed,
  // but a new one fails the gate (it would otherwise slip past a11y unchecked),
  // and a fixed one must be removed from the allow-list.
  const knownRenderFailures = JSON.parse(readFileSync(RENDER_FAILURES_PATH, 'utf8')) as string[];
  const knownRenderFailureSet = new Set(knownRenderFailures);
  const currentRenderFailureSet = new Set(currentRenderFailures);
  const newRenderFailures = currentRenderFailures.filter((id) => !knownRenderFailureSet.has(id));
  const fixedRenderFailures = knownRenderFailures.filter((id) => !currentRenderFailureSet.has(id));

  expect(newViolations, 'New WCAG 2.1 A/AA violations (fix them; do not update the baseline)').toEqual([]);
  expect(
    resolvedViolations,
    'Resolved WCAG 2.1 A/AA violations (remove them from the baseline with UPDATE_A11Y_BASELINE=1)',
  ).toEqual([]);
  expect(
    newRenderFailures,
    'Stories Storybook failed to render and could not be a11y-checked (fix the story so it renders)',
  ).toEqual([]);
  expect(
    fixedRenderFailures,
    'Stories that now render (remove them from storybook-render-failures.json with UPDATE_A11Y_BASELINE=1)',
  ).toEqual([]);
});
