#!/usr/bin/env node
/**
 * Tests for the demo security-header server (scripts/serve-security-scan.mjs).
 *
 * The server is what the DAST job scans, so a regression in its headers, SPA
 * fallback, path-traversal rejection, or malformed-URL handling would only
 * surface in CI scanning. These tests start the server on an ephemeral port
 * against a temp docroot and exercise those cases directly.
 *
 * Run: node --test scripts/serve-security-scan.test.mjs
 */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const script = join(scriptDir, 'serve-security-scan.mjs');

const PORT = 4319;
const base = `http://127.0.0.1:${PORT}`;
let serverProcess;
let docroot;

before(async () => {
  // The server serves `dist/usa-components` relative to its cwd; build a temp
  // repo-shaped dir and run the server there.
  docroot = mkdtempSync(join(tmpdir(), 'serve-scan-'));
  const dist = join(docroot, 'dist', 'usa-components');
  mkdirSync(dist, { recursive: true });
  writeFileSync(join(dist, 'index.html'), '<!doctype html><title>demo</title>');
  writeFileSync(join(dist, 'main.js'), 'console.log("hi");');
  mkdirSync(join(docroot, 'secret'));
  writeFileSync(join(docroot, 'secret', 'passwd.txt'), 'TOP SECRET');

  serverProcess = spawn('node', [script], {
    cwd: docroot,
    env: { ...process.env, SECURITY_SCAN_PORT: String(PORT) },
    stdio: 'ignore',
  });

  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      await fetch(`${base}/`);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 100));
    }
  }
  throw new Error('server did not start');
});

after(() => {
  serverProcess?.kill();
  if (docroot) rmSync(docroot, { recursive: true, force: true });
});

test('serves index.html with production security headers', async () => {
  const response = await fetch(`${base}/`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-security-policy') ?? '', /default-src 'self'/);
  assert.equal(response.headers.get('x-frame-options'), 'DENY');
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.match(response.headers.get('strict-transport-security') ?? '', /max-age=/);
  assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
  assert.match(await response.text(), /<title>demo<\/title>/);
});

test('serves a static asset with the right content type', async () => {
  const response = await fetch(`${base}/main.js`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') ?? '', /javascript/);
});

test('falls back to index.html for unknown SPA routes', async () => {
  const response = await fetch(`${base}/some/deep/route`);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /<title>demo<\/title>/);
});

test('does not serve files above the docroot via encoded traversal', async () => {
  const response = await fetch(`${base}/..%2f..%2fsecret%2fpasswd.txt`);
  const body = await response.text();
  assert.doesNotMatch(body, /TOP SECRET/);
});

test('handles a malformed percent-encoded URL without crashing', async () => {
  // A bare `%` is invalid percent-encoding; the server must respond, not die.
  const response = await fetch(`${base}/%zz`);
  assert.ok([200, 400, 404].includes(response.status));
  // Even the error path emits the security headers.
  assert.equal(response.headers.get('x-frame-options'), 'DENY');
});
