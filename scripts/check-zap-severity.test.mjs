#!/usr/bin/env node
/**
 * Tests for the ZAP severity gate (scripts/check-zap-severity.mjs).
 *
 * These run on the Node built-in test runner (no extra deps) by invoking the
 * script as a child process against temp fixture files, so we exercise the real
 * CLI surface (exit codes, riskcode gating, .zap/rules.tsv exceptions) rather
 * than internals.
 *
 * Run: node --test scripts/check-zap-severity.test.mjs
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const script = join(scriptDir, 'check-zap-severity.mjs');

/** Run the gate, returning { status, stdout, stderr }. */
function run(args) {
  try {
    const stdout = execFileSync('node', [script, ...args], { encoding: 'utf8' });
    return { status: 0, stdout, stderr: '' };
  } catch (error) {
    return {
      status: error.status ?? 1,
      stdout: error.stdout?.toString() ?? '',
      stderr: error.stderr?.toString() ?? '',
    };
  }
}

/** Write fixtures to a fresh temp dir, run the gate, then clean up. */
function withFixtures({ report, rules }, run_) {
  const dir = mkdtempSync(join(tmpdir(), 'zap-gate-'));
  try {
    const reportPath = join(dir, 'report_json.json');
    writeFileSync(reportPath, JSON.stringify(report));
    const args = [reportPath];
    if (rules !== undefined) {
      const rulesPath = join(dir, 'rules.tsv');
      writeFileSync(rulesPath, rules);
      args.push(rulesPath);
    }
    return run_(args);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function reportWith(alerts) {
  return { site: [{ alerts }] };
}

test('passes when there are no alerts', () => {
  const result = withFixtures({ report: reportWith([]) }, run);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /no unexcepted medium- or high-risk alerts/);
});

test('passes when only low-risk alerts are present', () => {
  const report = reportWith([
    { pluginid: '10096', alert: 'Timestamp Disclosure', riskcode: '1', riskdesc: 'Low' },
    { pluginid: '10027', alert: 'Info Disclosure', riskcode: '0', riskdesc: 'Informational' },
  ]);
  const result = withFixtures({ report }, run);
  assert.equal(result.status, 0);
});

test('fails on a medium-risk alert', () => {
  const report = reportWith([
    { pluginid: '10038', alert: 'CSP Header Not Set', riskcode: '2', riskdesc: 'Medium (High)' },
  ]);
  const result = withFixtures({ report }, run);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /medium- or high-risk alerts/);
  assert.match(result.stderr, /\[10038\] CSP Header Not Set/);
});

test('fails on a high-risk alert', () => {
  const report = reportWith([{ pluginid: '40012', alert: 'Cross Site Scripting', riskcode: '3', riskdesc: 'High' }]);
  const result = withFixtures({ report }, run);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /\[40012\] Cross Site Scripting/);
});

test('honors an IGNORE exception in the rules file', () => {
  const report = reportWith([{ pluginid: '10038', alert: 'CSP Header Not Set', riskcode: '2', riskdesc: 'Medium' }]);
  const rules = [
    '# comment line is ignored',
    '10038\tIGNORE\thttps://github.com/GSA/ngx-uswds/issues/1\towner\t2999-01-01\trationale',
  ].join('\n');
  const result = withFixtures({ report, rules }, run);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /no unexcepted/);
});

test('an unrelated exception does not suppress a different rule', () => {
  const report = reportWith([{ pluginid: '40012', alert: 'Cross Site Scripting', riskcode: '3', riskdesc: 'High' }]);
  const rules = '10038\tIGNORE\thttps://x/1\towner\t2999-01-01\trationale';
  const result = withFixtures({ report, rules }, run);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /\[40012\]/);
});

test('aggregates alerts across multiple sites', () => {
  const report = {
    site: [
      { alerts: [{ pluginid: '1', alert: 'A', riskcode: '0', riskdesc: 'Info' }] },
      { alerts: [{ pluginid: '2', alert: 'B', riskcode: '3', riskdesc: 'High' }] },
    ],
  };
  const result = withFixtures({ report }, run);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /\[2\] B/);
});

test('exits non-zero on an unreadable report', () => {
  const result = run([join(tmpdir(), 'does-not-exist-zap.json')]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unable to read ZAP JSON report/);
});
