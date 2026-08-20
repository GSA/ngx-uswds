#!/usr/bin/env node
/**
 * OWASP ZAP severity gate for the uswds-components demo runtime.
 *
 * The DAST job (`.github/workflows/security.yml`) runs the ZAP baseline scanner
 * with `fail_action: false`, so ZAP's own rule actions (WARN/FAIL) never decide
 * the build outcome. This script does: it parses ZAP's JSON report and fails
 * the build for any alert whose JSON `riskcode` is medium (`2`) or high (`3`),
 * unless a reviewed exception in `.zap/rules.tsv` matches it.
 *
 * Fail-closed posture:
 *   - An unreadable or non-object report exits non-zero.
 *   - A report whose `site`/`alerts` shape does not match ZAP's schema exits
 *     non-zero rather than silently reporting "no findings" (a truncated or
 *     changed report must not bypass the gate).
 *   - A missing or non-numeric `riskcode` is treated as blocking, not as
 *     "informational".
 *
 * Exception scope:
 *   Exceptions are matched on plugin id AND an instance scope (a URL substring),
 *   so a baseline row suppresses only the reviewed instance(s) of a finding, not
 *   every current and future instance of that ZAP rule across all URLs. This
 *   preserves the new-code gate and the "narrowest available scope" policy in
 *   docs/security-scanning.md. A literal `*` in the scope column means
 *   rule-wide and must be justified in review.
 *
 * Usage:
 *   node scripts/check-zap-severity.mjs [report_json.json] [.zap/rules.tsv]
 */
import { readFileSync } from 'node:fs';

const reportPath = process.argv[2] ?? 'report_json.json';
const rulesPath = process.argv[3] ?? '.zap/rules.tsv';

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readJson(path, description) {
  let raw;
  try {
    raw = readFileSync(path, 'utf8');
  } catch (error) {
    fail(`Unable to read ${description} at ${path}: ${error.message}`);
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    fail(`Unable to parse ${description} at ${path}: ${error.message}`);
  }
}

/**
 * Read reviewed exceptions as { pluginId, scope } pairs. `scope` is a URL
 * substring (or `*` for rule-wide). Column layout mirrors the validator:
 *   rule-id  IGNORE  scope  issue-url  owner  expiry  rationale
 */
function readExceptions(path) {
  let contents;
  try {
    contents = readFileSync(path, 'utf8');
  } catch {
    // No rules file means no exceptions — the gate stays strict.
    return [];
  }
  return contents
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.startsWith('#'))
    .map((line) => line.split('\t'))
    .filter((columns) => columns[1] === 'IGNORE')
    .map((columns) => ({ pluginId: columns[0]?.trim(), scope: columns[2]?.trim() ?? '' }));
}

function isException(alert, exceptions) {
  const pluginId = String(alert.pluginid);
  const url = String(alert.url ?? '');
  return exceptions.some((exception) => {
    if (exception.pluginId !== pluginId) return false;
    if (exception.scope === '*') return true;
    return exception.scope.length > 0 && url.includes(exception.scope);
  });
}

/** ZAP reports risk as a numeric string; anything non-numeric is suspicious. */
function riskcodeOf(alert) {
  const value = Number(alert.riskcode);
  return Number.isFinite(value) ? value : Number.NaN;
}

const report = readJson(reportPath, 'ZAP JSON report');
const exceptions = readExceptions(rulesPath);

// Fail closed on a report shape we do not recognise: ZAP always emits a `site`
// array (even if empty). A missing/non-array `site`, or a `site` entry whose
// `alerts` is not an array, means the report is truncated or schema-changed and
// must not be read as "no findings".
if (report === null || typeof report !== 'object' || !Array.isArray(report.site)) {
  fail('ZAP report is missing the expected "site" array — refusing to pass a malformed report.');
}
for (const site of report.site) {
  if (site === null || typeof site !== 'object' || !Array.isArray(site.alerts)) {
    fail('ZAP report has a site with no "alerts" array — refusing to pass a malformed report.');
  }
}

const alerts = report.site.flatMap((site) => site.alerts);

// A non-numeric riskcode is treated as blocking so a corrupted severity field
// cannot silently downgrade a finding below the gate.
const suspicious = alerts.filter((alert) => Number.isNaN(riskcodeOf(alert)));
if (suspicious.length > 0) {
  console.error('ZAP report has alerts with a missing or non-numeric riskcode:');
  for (const alert of suspicious) {
    console.error(`- [${alert.pluginid ?? '?'}] ${alert.alert ?? 'unknown'}: riskcode=${alert.riskcode}`);
  }
  process.exit(1);
}

const blockingAlerts = alerts.filter((alert) => riskcodeOf(alert) >= 2 && !isException(alert, exceptions));

if (blockingAlerts.length > 0) {
  console.error('ZAP found medium- or high-risk alerts:');
  for (const alert of blockingAlerts) {
    console.error(`- [${alert.pluginid}] ${alert.alert}: ${alert.riskdesc} (${alert.url ?? 'no url'})`);
  }
  process.exit(1);
}

console.log('ZAP found no unexcepted medium- or high-risk alerts.');
