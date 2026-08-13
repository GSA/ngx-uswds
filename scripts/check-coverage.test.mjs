#!/usr/bin/env node
/**
 * Tests for the coverage gate script (scripts/check-coverage.mjs).
 *
 * These run on the Node built-in test runner (no extra deps) by invoking the
 * script as a child process against temp fixture files, so we exercise the real
 * CLI surface (exit codes, --bump, malformed floors) rather than internals.
 *
 * Run: node --test scripts/check-coverage.test.mjs
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const script = join(scriptDir, 'check-coverage.mjs');
const floorPath = resolve(scriptDir, '..', 'coverage-floor.json');

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

function writeSummary(dir, pcts) {
  const total = Object.fromEntries(Object.entries(pcts).map(([k, v]) => [k, { pct: v }]));
  const path = join(dir, 'summary.json');
  writeFileSync(path, JSON.stringify({ total }));
  return path;
}

function withTempDir(fn) {
  const dir = mkdtempSync(join(tmpdir(), 'covgate-'));
  try {
    return fn(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

/**
 * Runs `fn` with the real coverage-floor.json swapped for `floors`, restoring
 * the original afterwards. The script always reads the repo-root floor file, so
 * we back it up rather than parameterise the path.
 */
function withFloors(floors, fn) {
  const backup = readFileSync(floorPath, 'utf8');
  try {
    writeFileSync(floorPath, `${JSON.stringify(floors, null, 2)}\n`);
    return fn();
  } finally {
    writeFileSync(floorPath, backup);
  }
}

test('passes when coverage meets every floor', () => {
  withFloors({ statements: 81, branches: 83, functions: 48, lines: 81 }, () => {
    withTempDir((dir) => {
      const summary = writeSummary(dir, { statements: 85, branches: 86, functions: 55, lines: 85 });
      const { status, stdout } = run([summary]);
      assert.equal(status, 0);
      assert.match(stdout, /Coverage gate passed/);
    });
  });
});

test('fails and names the metric below its floor', () => {
  withFloors({ statements: 81, branches: 83, functions: 48, lines: 81 }, () => {
    withTempDir((dir) => {
      const summary = writeSummary(dir, { statements: 80, branches: 86, functions: 55, lines: 80 });
      const { status, stderr } = run([summary]);
      assert.equal(status, 1);
      assert.match(stderr, /Coverage gate failed/);
      assert.match(stderr, /statements/);
      assert.match(stderr, /lines/);
      assert.doesNotMatch(stderr, /branches\s+8/);
    });
  });
});

test('--bump raises floors up to measured coverage', () => {
  withFloors({ statements: 81, branches: 83, functions: 48, lines: 81 }, () => {
    withTempDir((dir) => {
      const summary = writeSummary(dir, { statements: 85, branches: 86, functions: 55, lines: 85 });
      const { status } = run(['--bump', summary]);
      assert.equal(status, 0);
      const written = JSON.parse(readFileSync(floorPath, 'utf8'));
      assert.deepEqual(written, { statements: 85, branches: 86, functions: 55, lines: 85 });
    });
  });
});

test('--bump never lowers a floor (ratchet-only)', () => {
  withFloors({ statements: 90, branches: 90, functions: 90, lines: 90 }, () => {
    withTempDir((dir) => {
      const summary = writeSummary(dir, { statements: 85, branches: 86, functions: 55, lines: 85 });
      const { status, stdout } = run(['--bump', summary]);
      assert.equal(status, 0);
      assert.match(stdout, /nothing to bump/);
      const written = JSON.parse(readFileSync(floorPath, 'utf8'));
      assert.deepEqual(written, { statements: 90, branches: 90, functions: 90, lines: 90 });
    });
  });
});

test('a malformed floor (string/null) fails the gate without emitting NaN', () => {
  withFloors({ statements: '81', branches: null, functions: 48, lines: 81 }, () => {
    withTempDir((dir) => {
      const summary = writeSummary(dir, { statements: 85, branches: 86, functions: 55, lines: 85 });
      const { status, stderr, stdout } = run([summary]);
      assert.equal(status, 1);
      assert.match(stderr, /statements: missing or invalid/);
      assert.match(stderr, /branches: missing or invalid/);
      assert.doesNotMatch(stdout + stderr, /NaN/);
    });
  });
});

test('--bump treats a malformed floor as 0 and writes clean numbers', () => {
  withFloors({ statements: '81', branches: null, functions: 48, lines: 81 }, () => {
    withTempDir((dir) => {
      const summary = writeSummary(dir, { statements: 85, branches: 86, functions: 55, lines: 85 });
      const { status } = run(['--bump', summary]);
      assert.equal(status, 0);
      const written = JSON.parse(readFileSync(floorPath, 'utf8'));
      assert.deepEqual(written, { statements: 85, branches: 86, functions: 55, lines: 85 });
      for (const value of Object.values(written)) {
        assert.ok(Number.isFinite(value));
      }
    });
  });
});

test('exits non-zero when the coverage summary is missing', () => {
  const { status, stderr } = run([join(tmpdir(), 'does-not-exist-covgate.json')]);
  assert.equal(status, 1);
  assert.match(stderr, /Could not read coverage summary/);
});
