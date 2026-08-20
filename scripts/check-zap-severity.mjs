#!/usr/bin/env node
/**
 * OWASP ZAP severity gate for the uswds-components demo runtime.
 *
 * The DAST job (`.github/workflows/security.yml`) runs the ZAP baseline scanner
 * with `fail_action: false`, so ZAP's own rule actions (WARN/FAIL) never decide
 * the build outcome. This script does: it parses ZAP's JSON report and fails
 * the build only for alerts whose JSON `riskcode` is medium (`2`) or high (`3`)
 * — unless the alert's rule id is explicitly excepted in `.zap/rules.tsv`.
 *
 * Low-risk alerts (riskcode 0/1) remain visible in the retained ZAP report
 * artifact but never block the gate. Exceptions are reviewed in-PR; see
 * `docs/security-scanning.md` for the exception policy.
 *
 * Usage:
 *   node scripts/check-zap-severity.mjs [report_json.json] [.zap/rules.tsv]
 */
import { readFileSync } from 'node:fs';

const reportPath = process.argv[2] ?? 'report_json.json';
const rulesPath = process.argv[3] ?? '.zap/rules.tsv';

function readJson(path, description) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    console.error(`Unable to read ${description} at ${path}: ${error.message}`);
    process.exit(1);
  }
}

function readIgnoredRuleIds(path) {
  let contents;
  try {
    contents = readFileSync(path, 'utf8');
  } catch {
    // No rules file means no exceptions — the gate stays strict.
    return new Set();
  }
  return new Set(
    contents
      .split(/\r?\n/)
      .filter((line) => line.trim() && !line.startsWith('#'))
      .map((line) => line.split('\t'))
      .filter(([, action]) => action === 'IGNORE')
      .map(([ruleId]) => ruleId.trim()),
  );
}

const report = readJson(reportPath, 'ZAP JSON report');
const ignoredRuleIds = readIgnoredRuleIds(rulesPath);

const blockingAlerts = (report.site ?? [])
  .flatMap((site) => site.alerts ?? [])
  .filter((alert) => Number(alert.riskcode) >= 2 && !ignoredRuleIds.has(String(alert.pluginid)));

if (blockingAlerts.length > 0) {
  console.error('ZAP found medium- or high-risk alerts:');
  for (const alert of blockingAlerts) {
    console.error(`- [${alert.pluginid}] ${alert.alert}: ${alert.riskdesc}`);
  }
  process.exit(1);
}

console.log('ZAP found no unexcepted medium- or high-risk alerts.');
