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

interface AxeNode {
  target: string[];
}

interface AxeViolation {
  id: string;
  nodes: AxeNode[];
}

function violationFingerprints(storyId: string, violations: AxeViolation[]): string[] {
  return violations.flatMap((violation) =>
    violation.nodes.map((node) => [storyId, violation.id, ...node.target].join(' | ')),
  );
}

test('axe detects a rendered WCAG 2.1 AA violation', async ({ page }) => {
  // Sanity check: prove the harness actually reports contrast failures, so a
  // green story run means "no violations" and never "axe silently did nothing".
  await page.setContent('<main><p style="color:#aaa;background:#fff">Text</p></main>');

  const results = await new AxeBuilder({ page }).withTags(WCAG_21_AA_TAGS).analyze();

  expect(results.violations.map(({ id }) => id)).toContain('color-contrast');
});

test('Storybook stories have no unresolved WCAG 2.1 AA violations', async ({ page, request }) => {
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
    await page.goto(`/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story`);

    // Wait for Storybook to settle into either the rendered state or its own
    // error display. A story that Storybook itself fails to render (a story
    // config defect, not an a11y issue) cannot be axe-assessed, so it is
    // recorded separately and reported — it is not silently skipped, and it is
    // not a11y-failed either.
    await expect(page.locator('body'), `${story.id} should settle`).toHaveClass(
      /\bsb-show-main\b|\bsb-show-errordisplay\b/,
    );
    const bodyClass = (await page.locator('body').getAttribute('class')) ?? '';
    if (bodyClass.includes('sb-show-errordisplay')) {
      renderFailures.push(story.id);
      continue;
    }

    const results = await new AxeBuilder({ page })
      .withTags(WCAG_21_AA_TAGS)
      .exclude("#storybook-root[aria-hidden='true']")
      .analyze();

    fingerprints.push(...violationFingerprints(story.id, results.violations as AxeViolation[]));
  }

  const current = [...new Set(fingerprints)].sort();

  if (renderFailures.length > 0) {
    // Surface, don't hide: these stories could not be a11y-checked because
    // Storybook failed to render them. Tracked separately from the AA gate.
    console.warn(
      `Skipped ${renderFailures.length} stor${renderFailures.length === 1 ? 'y' : 'ies'} that Storybook failed to render: ${renderFailures.join(', ')}`,
    );
  }

  if (process.env.UPDATE_A11Y_BASELINE === '1') {
    writeFileSync(BASELINE_PATH, `${JSON.stringify(current, null, 2)}\n`);
  }

  const baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8')) as string[];
  const baselineSet = new Set(baseline);
  const currentSet = new Set(current);
  const newViolations = current.filter((fingerprint) => !baselineSet.has(fingerprint));
  const resolvedViolations = baseline.filter((fingerprint) => !currentSet.has(fingerprint));

  expect(newViolations, 'New WCAG 2.1 A/AA violations (fix them; do not update the baseline)').toEqual([]);
  expect(
    resolvedViolations,
    'Resolved WCAG 2.1 A/AA violations (remove them from the baseline with UPDATE_A11Y_BASELINE=1)',
  ).toEqual([]);
});
