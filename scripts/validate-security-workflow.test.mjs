#!/usr/bin/env node
/**
 * Tests for the security CI policy validator
 * (scripts/validate-security-workflow.mjs).
 *
 * The validator reads fixed repo-relative paths, so these tests run it as a
 * child process with `cwd` pointed at a temp mirror of the repo. Each test
 * copies the real config files in, optionally mutates one, and asserts the
 * validator's exit code and reported failures.
 *
 * Run: node --test scripts/validate-security-workflow.test.mjs
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '..');
const scriptName = 'scripts/validate-security-workflow.mjs';

const tracked = [
  '.github/workflows/security.yml',
  '.github/workflows/ci.yaml',
  '.github/dependabot.yaml',
  '.zap/rules.tsv',
  'docs/security-scanning.md',
  'scripts/check-zap-severity.mjs',
  'scripts/serve-security-scan.mjs',
  scriptName,
];

/** Build a temp mirror of the repo containing only the files the validator reads. */
function mirrorRepo() {
  const dir = mkdtempSync(join(tmpdir(), 'sec-validate-'));
  for (const rel of tracked) {
    const dest = join(dir, rel);
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(join(repoRoot, rel), dest);
  }
  return dir;
}

/** Run the validator with cwd set to `dir`. */
function run(dir) {
  try {
    const stdout = execFileSync('node', [join(dir, scriptName)], {
      cwd: dir,
      encoding: 'utf8',
    });
    return { status: 0, stdout, stderr: '' };
  } catch (error) {
    return {
      status: error.status ?? 1,
      stdout: error.stdout?.toString() ?? '',
      stderr: error.stderr?.toString() ?? '',
    };
  }
}

function withMirror(fn) {
  const dir = mirrorRepo();
  try {
    return fn(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test('passes on the real repository configuration', () => {
  const result = withMirror((dir) => run(dir));
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /passes security CI policy validation/);
});

test('fails when the security workflow is missing', () => {
  const result = withMirror((dir) => {
    rmSync(join(dir, '.github/workflows/security.yml'));
    return run(dir);
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /security\.yml exists/);
});

test('fails when the ZAP severity gate is disabled', () => {
  const result = withMirror((dir) => {
    const path = join(dir, '.github/workflows/security.yml');
    const workflow = readFileSync(path, 'utf8').replace(/fail_action:\s*false/, 'fail_action: true');
    writeFileSync(path, workflow);
    return run(dir);
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /does not let ZAP rule actions fail the scan/);
});

test('fails when the CI workflow does not run the validator', () => {
  const result = withMirror((dir) => {
    const path = join(dir, '.github/workflows/ci.yaml');
    const ci = readFileSync(path, 'utf8').replace(/npm run validate:security-workflow/g, 'noop');
    writeFileSync(path, ci);
    return run(dir);
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /runs this policy validator in the main CI job/);
});

test('rejects a malformed ZAP exception row', () => {
  const result = withMirror((dir) => {
    writeFileSync(join(dir, '.zap/rules.tsv'), 'not-a-number\tIGNORE\t*\tno-url\t\t\t\n');
    return run(dir);
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /valid, unexpired ZAP exception row/);
});

test('rejects an expired ZAP exception row', () => {
  const result = withMirror((dir) => {
    const row = '10038\tIGNORE\t*\thttps://github.com/GSA/ngx-uswds/issues/1\towner\t2000-01-01\told';
    writeFileSync(join(dir, '.zap/rules.tsv'), `${row}\n`);
    return run(dir);
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /valid, unexpired ZAP exception row/);
});

test('rejects a row with a syntactically valid but impossible calendar date', () => {
  const result = withMirror((dir) => {
    const row = '10038\tIGNORE\t*\thttps://github.com/GSA/ngx-uswds/issues/1\towner\t2027-02-30\treason';
    writeFileSync(join(dir, '.zap/rules.tsv'), `${row}\n`);
    return run(dir);
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /valid, unexpired ZAP exception row/);
});

test('rejects a row with an out-of-range date (9999-99-99)', () => {
  const result = withMirror((dir) => {
    const row = '10038\tIGNORE\t*\thttps://github.com/GSA/ngx-uswds/issues/1\towner\t9999-99-99\treason';
    writeFileSync(join(dir, '.zap/rules.tsv'), `${row}\n`);
    return run(dir);
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /valid, unexpired ZAP exception row/);
});

test('rejects a row missing the scope column', () => {
  const result = withMirror((dir) => {
    // 6 columns (no scope) must now be rejected under the 7-column layout.
    const row = '10038\tIGNORE\thttps://github.com/GSA/ngx-uswds/issues/1\towner\t2999-01-01\treason';
    writeFileSync(join(dir, '.zap/rules.tsv'), `${row}\n`);
    return run(dir);
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /valid, unexpired ZAP exception row/);
});

test('accepts a well-formed, unexpired ZAP exception row', () => {
  const result = withMirror((dir) => {
    const row = '10038\tIGNORE\t*\thttps://github.com/GSA/ngx-uswds/issues/1\towner\t2999-01-01\treason';
    writeFileSync(join(dir, '.zap/rules.tsv'), `# header\n${row}\n`);
    return run(dir);
  });
  assert.equal(result.status, 0, result.stderr);
});

test('fails when the CI workflow grants write-all permissions', () => {
  const result = withMirror((dir) => {
    const path = join(dir, '.github/workflows/ci.yaml');
    const ci = readFileSync(path, 'utf8').replace(/^permissions:\s*\n {2}contents:\s*read/m, 'permissions: write-all');
    writeFileSync(path, ci);
    return run(dir);
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /declares least-privilege permissions in the CI workflow/);
});

test('fails when Dependabot config is removed', () => {
  const result = withMirror((dir) => {
    rmSync(join(dir, '.github/dependabot.yaml'));
    return run(dir);
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /keeps the existing Dependabot configuration/);
});

test('fails when documentation drops a required section', () => {
  const result = withMirror((dir) => {
    const path = join(dir, 'docs/security-scanning.md');
    const doc = readFileSync(path, 'utf8').replace(/DAST \(OWASP ZAP\)/g, 'DAST');
    writeFileSync(path, doc);
    return run(dir);
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /names the DAST required status check/);
});

test('fails when the 6-column exception file is handed to ZAP as a config', () => {
  const result = withMirror((dir) => {
    const path = join(dir, '.github/workflows/security.yml');
    const workflow = readFileSync(path, 'utf8').replace(
      /target: 'http:\/\/127\.0\.0\.1:4200'/,
      "target: 'http://127.0.0.1:4200'\n          rules_file_name: '.zap/rules.tsv'",
    );
    writeFileSync(path, workflow);
    return run(dir);
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /does not hand the 6-column exception file to ZAP/);
});
