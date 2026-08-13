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
 * Policy: the committed floors below are a *ratchet*. They may only ever move
 * up. If a change raises real coverage, bump the floors in the same PR so the
 * gain is locked in; never lower them to make a red build pass.
 *
 * Usage: node scripts/check-coverage.mjs [path/to/coverage-summary.json]
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Ratcheting floors. Only ever increase these.
const THRESHOLDS = {
  statements: 79,
  branches: 85,
  functions: 50,
  lines: 79,
};

const summaryPath = resolve(process.argv[2] ?? 'coverage/coverage-summary.json');

let total;
try {
  total = JSON.parse(readFileSync(summaryPath, 'utf8')).total;
} catch (error) {
  console.error(`✖ Could not read coverage summary at ${summaryPath}`);
  console.error(`  ${error.message}`);
  console.error('  Run `npm run test:components` first to generate it.');
  process.exit(1);
}

const failures = [];
for (const [metric, floor] of Object.entries(THRESHOLDS)) {
  const pct = total?.[metric]?.pct;
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
    '\nCoverage dropped below the committed ratchet. Add tests to restore it —\n' +
      'do not lower the floors in scripts/check-coverage.mjs to go green.',
  );
  process.exit(1);
}

console.log('\n✓ Coverage gate passed.');
