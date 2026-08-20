import { existsSync, readFileSync } from 'node:fs';

/**
 * Policy validator for the security CI configuration. Runs in the main CI job
 * (`npm run validate:security-workflow`) so that any drift in the security
 * workflow, the ZAP severity gate, the reviewed exception baseline, or the
 * documentation is caught in-repo rather than silently weakening the gate.
 *
 * The checks intentionally assert on the *shape* of the configuration (the gate
 * exists, is least-privilege, does not disable the severity check, keeps
 * Dependabot, documents the admin-owned required checks) rather than running
 * the containerized CodeQL / ZAP scans, which only run in GitHub Actions.
 */
const workflowPath = '.github/workflows/security.yml';
const ciWorkflowPath = '.github/workflows/ci.yaml';
const dependabotPath = '.github/dependabot.yaml';
const rulesPath = '.zap/rules.tsv';
const documentationPath = 'docs/security-scanning.md';
const severityGatePath = 'scripts/check-zap-severity.mjs';
const serverPath = 'scripts/serve-security-scan.mjs';
const failures = [];

if (!existsSync(workflowPath)) {
  failures.push(`${workflowPath} exists`);
} else {
  const workflow = readFileSync(workflowPath, 'utf8');
  const checks = [
    [
      'runs for pull requests and pushes to main',
      /on:\s*\n(?=[\s\S]*pull_request:)(?=[\s\S]*push:\s*\n\s*branches:\s*\[main\])/,
    ],
    ['uses least-privilege default permissions', /^permissions:\s*\n {2}contents:\s*read\s*$/m],
    ['does not grant security-events write in this workflow', !/^\s*security-events:\s*write\s*$/m.test(workflow)],
    ['defers SAST to the repository CodeQL default setup', !/github\/codeql-action\//.test(workflow)],
    ['builds the demo runtime before DAST', /dast:\s*\n[\s\S]*npm run build:demo -- --configuration production/],
    ['serves the runtime with production security headers', /node scripts\/serve-security-scan\.mjs/],
    [
      'runs the OWASP ZAP baseline against the built runtime',
      /zaproxy\/action-baseline@[0-9a-f]{40}[\s\S]*target:\s*['"]http:\/\/127\.0\.0\.1:\d+['"]/,
    ],
    ['does not let ZAP rule actions fail the scan', /fail_action:\s*false/],
    [
      'enforces the JSON report severity gate',
      /node scripts\/check-zap-severity\.mjs report_json\.json \.zap\/rules\.tsv/,
    ],
    ['does not hand the 6-column exception file to ZAP as a 2-column config', !/rules_file_name:/.test(workflow)],
  ];

  for (const [description, condition] of checks) {
    const passed = condition instanceof RegExp ? condition.test(workflow) : condition;
    if (!passed) failures.push(description);
  }
}

if (!existsSync(ciWorkflowPath) || !/npm run validate:security-workflow/.test(readFileSync(ciWorkflowPath, 'utf8'))) {
  failures.push('runs this policy validator in the main CI job');
} else {
  const ciWorkflow = readFileSync(ciWorkflowPath, 'utf8');
  if (!/^permissions:|permissions:\s*\n\s*contents:\s*read/m.test(ciWorkflow)) {
    failures.push('declares least-privilege permissions in the CI workflow');
  }
}

if (!existsSync(rulesPath)) {
  failures.push('provides the reviewed ZAP baseline rules file');
} else {
  const today = new Date().toISOString().slice(0, 10);
  const exceptionRows = readFileSync(rulesPath, 'utf8')
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.startsWith('#'));
  for (const row of exceptionRows) {
    const [ruleId, action, issue, owner, expiry, rationale, ...extra] = row.split('\t');
    if (
      !/^\d+$/.test(ruleId) ||
      action !== 'IGNORE' ||
      !/^https:\/\/github\.com\/GSA\/ngx-uswds\/issues\/\d+$/.test(issue) ||
      !owner?.trim() ||
      !/^\d{4}-\d{2}-\d{2}$/.test(expiry) ||
      expiry < today ||
      !rationale?.trim() ||
      extra.length > 0
    ) {
      failures.push(`valid, unexpired ZAP exception row: ${row}`);
    }
  }
}

if (!existsSync(severityGatePath)) {
  failures.push('provides the ZAP JSON severity gate');
} else {
  const severityGate = readFileSync(severityGatePath, 'utf8');
  if (!/Number\(alert\.riskcode\) >= 2/.test(severityGate)) {
    failures.push('blocks ZAP medium- and high-risk alerts by JSON riskcode');
  }
}

if (!existsSync(serverPath)) {
  failures.push('provides the demo runtime security-header server');
} else {
  const server = readFileSync(serverPath, 'utf8');
  if (!/Content-Security-Policy/.test(server) || !/X-Frame-Options/.test(server)) {
    failures.push('serves representative production security headers');
  }
}

if (!existsSync(documentationPath)) {
  failures.push('documents baseline triage and required status checks');
} else {
  const documentation = readFileSync(documentationPath, 'utf8');
  const documentationChecks = [
    ['documents the initial finding baseline', /initial baseline/i],
    ['documents CodeQL new-alert merge protection', /code scanning.*new.*alert/is],
    ['names the DAST required status check', /DAST \(OWASP ZAP\)/],
    ['documents exception rationale and expiry', /rationale[\s\S]*expir/i],
    ['states that Dependabot remains complementary', /Dependabot[\s\S]*complement/i],
  ];
  for (const [description, pattern] of documentationChecks) {
    if (!pattern.test(documentation)) failures.push(description);
  }
}

if (!existsSync(dependabotPath)) {
  failures.push('keeps the existing Dependabot configuration');
}

if (failures.length > 0) {
  console.error('Security CI policy validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`${workflowPath} passes security CI policy validation.`);
