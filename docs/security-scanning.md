# Security scanning

This repository publishes an **Angular component library**
(`@gsa-sam/ngx-uswds`) — executable JavaScript/TypeScript that runs inside
consuming applications. Its security posture is layered: Dependabot for
dependency hygiene, CodeQL (SAST) for the code we ship, and an OWASP ZAP (DAST)
scan of the internal demo app. The rationale for each control — and the
deliberate limits of the DAST scan — is recorded in
[ADR 0001](adr/0001-security-scanning-posture.md).

The `Security` GitHub Actions workflow complements Dependabot's dependency-update
coverage with static and dynamic application security testing. Dependabot
remains complementary and is not replaced. The workflow runs on every pull
request, every push to `main`, and manual dispatches.

## Least-privilege workflow permissions

Every workflow declares an explicit `permissions` block so `GITHUB_TOKEN` is
scoped to least privilege (CodeQL rule `actions/missing-workflow-permissions`).
`security.yml` runs entirely read-only. `ci.yaml` defaults to `contents: read`
and every job — all of which run PR-controlled code (checkout, `npm` scripts) —
stays read-only. No CI job holds a write credential, so PR-controlled code can
never obtain one.

## Gates

- **Analyze (`javascript-typescript`)** and **Analyze (`actions`)** are provided
  by the repository's CodeQL **default setup**. Code scanning merge protection
  should block pull requests that introduce a new medium- or high-severity
  alert. The default setup is intentionally **not** duplicated in `security.yml`,
  because GitHub rejects advanced-configuration SARIF uploads while default
  setup is enabled.
- **DAST (OWASP ZAP)** builds and serves the production Angular demo
  (`usa-components` → `dist/usa-components`) with representative production
  security headers, then runs the ZAP baseline scanner. A separate report parser
  (`scripts/check-zap-severity.mjs`) fails the job only for unexcepted alerts
  whose JSON `riskcode` is medium (`2`) or high (`3`); low-risk alerts remain
  visible in the retained `zap-report` artifact.

  **Scope caveat (see [ADR 0001](adr/0001-security-scanning-posture.md)):** ZAP
  scans the `usa-components` **demo app**, which is internal tooling and is
  **not** the published package. The library built from
  `projects/uswds-components/` is what ships to consumers, and it has no
  standalone runtime surface. This DAST scan is therefore defense-in-depth on
  the demo, not a control that protects the delivered library. CodeQL (SAST),
  which analyzes the code we actually ship, is the primary control here.

## Required status checks (admin-owned)

Branch protection, required status checks, and CodeQL new-alert merge protection
are **admin-owned settings** and cannot be applied by this repository change
alone. Repository administrators (or DevSecOps) must add these required status
checks to the `main` branch protection or ruleset:

- `Analyze (javascript-typescript)`
- `Analyze (actions)`
- `DAST (OWASP ZAP)`

They must also enable the GitHub ruleset option **Code scanning results →
Require code scanning results**, selecting CodeQL and the threshold that blocks
new medium-or-higher alerts.

## Initial baseline and triage

Pre-existing findings are triaged and burned down rather than red-walled up
front (ADR-0010). ZAP's rule actions do **not** determine the gate: the JSON
report's risk codes do, so pre-existing low-risk observations remain report-only
while medium/high findings block immediately. `.zap/rules.tsv` currently
contains no ignored alerts. CodeQL's pull-request comparison identifies findings
introduced by changed code; existing default-branch findings remain visible in
Security → Code scanning for separate triage rather than blocking the rollout.

Before making the checks required, run the workflow on `main` and triage every
existing finding. Create a remediation issue for each valid finding. A finding
that is demonstrably not exploitable may be dismissed in GitHub code scanning or
temporarily added to the ZAP rules file using the process below.

## Exception policy

For ZAP, use one tab-separated row per exception:

```text
rule-id<TAB>IGNORE<TAB>issue-url<TAB>owner<TAB>expiry(YYYY-MM-DD)<TAB>rationale
```

The policy validator rejects malformed or expired rows. Every exception must be
reviewed in a pull request and include:

1. the scanner rule or alert identifier;
2. a link to its triage or remediation issue;
3. the technical rationale for accepting or suppressing it;
4. an owner and an expiry date; and
5. the narrowest available scope.

Expired exceptions must be removed or explicitly renewed through review. Never
lower the workflow threshold or broadly ignore medium/high findings to make CI
pass.

## Local validation

Run the policy validator whenever the security workflow, baseline, or this
document changes:

```sh
npm run validate:security-workflow
```

The severity gate itself has unit tests:

```sh
npm run test:scripts
```

The actual CodeQL and containerized ZAP scans run in GitHub Actions. Download
`zap-report` from a workflow run to inspect DAST evidence.
