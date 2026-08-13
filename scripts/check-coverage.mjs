#!/usr/bin/env node
/**
 * Ratcheting coverage gate for the uswds-components library.
 *
 * The `@angular/build:unit-test` (Vitest) builder starts Vitest with
 * `config: false`, so a `vitest.config.ts` `coverage.thresholds` block is
 * ignored. The builder's schema also exposes no threshold option. We therefore
 * enforce coverage floors here, after `ng test` has written the v8
 * `coverage-summary.json` report.
 *
 * Policy: the committed floors live in `coverage-floor.json` and are a
 * *ratchet* — they may only ever move up. Feature and test PRs should NOT edit
 * the floor file; they just need to keep current coverage at or above it. When
 * coverage has genuinely improved, lock the gain in with a dedicated bump:
 *
 *     npm run coverage:check -- --bump
 *
 * which rewrites `coverage-floor.json` to the current measured values. Commit
 * that on its own (ideally a small standalone PR) so the only shared file
 * parallel work touches changes in isolation and rarely conflicts.
 *
 * Usage:
 *   node scripts/check-coverage.mjs [path/to/coverage-summary.json]
 *   node scripts/check-coverage.mjs --bump [path/to/coverage-summary.json]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const METRICS = ['statements', 'branches', 'functions', 'lines'];

const scriptDir = dirname(fileURLToPath(import.meta.url));
const floorPath = resolve(scriptDir, '..', 'coverage-floor.json');

const args = process.argv.slice(2);
const bump = args.includes('--bump');
const summaryArg = args.find((arg) => !arg.startsWith('--'));
const summaryPath = resolve(summaryArg ?? 'coverage/coverage-summary.json');

let total;
try {
  total = JSON.parse(readFileSync(summaryPath, 'utf8')).total;
} catch (error) {
  console.error(`✖ Could not read coverage summary at ${summaryPath}`);
  console.error(`  ${error.message}`);
  console.error('  Run `npm run test:components` first to generate it.');
  process.exit(1);
}

let floors;
try {
  floors = JSON.parse(readFileSync(floorPath, 'utf8'));
} catch (error) {
  console.error(`✖ Could not read coverage floors at ${floorPath}`);
  console.error(`  ${error.message}`);
  process.exit(1);
}

if (bump) {
  const next = {};
  let raised = false;
  for (const metric of METRICS) {
    const pct = total?.[metric]?.pct;
    if (typeof pct !== 'number') {
      console.error(`✖ ${metric}: missing from coverage summary; cannot bump.`);
      process.exit(1);
    }
    const floored = Math.floor(pct);
    const current = floors[metric] ?? 0;
    // Ratchet only ever moves up.
    next[metric] = Math.max(current, floored);
    if (next[metric] > current) {
      raised = true;
      console.log(`  ↑ ${metric.padEnd(11)} ${current}% → ${next[metric]}% (measured ${pct.toFixed(2)}%)`);
    } else {
      console.log(`  = ${metric.padEnd(11)} ${current}% (measured ${pct.toFixed(2)}%)`);
    }
  }
  if (!raised) {
    console.log('\n✓ Floors already at or above current coverage; nothing to bump.');
    process.exit(0);
  }
  writeFileSync(floorPath, `${JSON.stringify(next, null, 2)}\n`);
  console.log(`\n✓ Wrote raised floors to ${floorPath}. Commit this change on its own.`);
  process.exit(0);
}

const failures = [];
for (const metric of METRICS) {
  const floor = floors[metric];
  const pct = total?.[metric]?.pct;
  if (typeof floor !== 'number') {
    failures.push(`${metric}: missing from coverage-floor.json`);
    continue;
  }
  if (typeof pct !== 'number') {
    failures.push(`${metric}: missing from coverage summary`);
    continue;
  }
  const status = pct >= floor ? '✓' : '✖';
  const line = `  ${status} ${metric.padEnd(11)} ${pct.toFixed(2)}% (floor ${floor}%)`;
  if (pct < floor) {
    failures.push(line.trim());
  }
  console.log(line);
}

if (failures.length > 0) {
  console.error('\n✖ Coverage gate failed:');
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  console.error(
    '\nCoverage dropped below the committed ratchet in coverage-floor.json.\n' +
      'Add tests to restore it — do not lower the floors to go green.',
  );
  process.exit(1);
}

console.log('\n✓ Coverage gate passed.');
