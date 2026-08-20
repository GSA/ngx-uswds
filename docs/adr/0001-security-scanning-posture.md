# ADR 0001: Security scanning posture (SAST, DAST, and dependency hygiene)

- Status: Accepted
- Date: 2026-08-20
- Deciders: ngx-uswds maintainers
- Related: [#272](https://github.com/GSA/ngx-uswds/issues/272), parent
  [#184](https://github.com/GSA/ngx-uswds/issues/184), reference
  [GSA/sam-styles#809](https://github.com/GSA/sam-styles/pull/809) and
  [GSA/ngx-uswds-icons#99](https://github.com/GSA/ngx-uswds-icons/pull/99)

## Context

The QASP "Secure" requirement states that new code must be "free of medium- and
high-level static and dynamic security vulnerabilities." At the time of this
decision the only security tooling on `GSA/ngx-uswds` was Dependabot (dependency
hygiene). Two sibling repositories in the same Angular migration added layered
security scanning that we were asked to align with where it makes sense:

- **`GSA/sam-styles`** publishes **SCSS only**. Its Storybook site is
  documentation tooling and is never delivered to package consumers; its DAST
  scan targets "docs tooling, not the published package."
- **`GSA/ngx-uswds-icons`** publishes an **Angular library** and reached the
  posture below: Dependabot + CodeQL default setup (SAST) + OWASP ZAP against
  its unpublished demo app (DAST).

`ngx-uswds` matches the icons repository: it publishes an **Angular component
library** (`@gsa-sam/ngx-uswds`, built from `projects/uswds-components/` via
ng-packagr) — real JavaScript/TypeScript/HTML/CSS downloaded and executed inside
consuming applications. The `usa-components` project (`src/`) is an internal
demo/docs app that is never published.

This means the two scan types have inverted value here:

- **SAST is the higher-value control**, because we ship executable code to
  consumers.
- **DAST is lower-value here**, because the only runtime surface available to
  scan is the unpublished demo app — the same "scan the docs tooling" caveat as
  sam-styles, and there is no hosted public site.

## Decision

1. **SAST via CodeQL default setup.** Use CodeQL default setup
   (`javascript-typescript` and `actions`) as the SAST control. Do **not**
   commit a CodeQL workflow file — advanced configuration conflicts with default
   setup and fails at startup. This is the primary, highest-value control
   because we ship executable code.

2. **DAST via OWASP ZAP against the demo runtime, with eyes open.** Add a
   `Security` workflow that builds and serves the production `usa-components`
   demo with representative production security headers
   (`scripts/serve-security-scan.mjs`) and runs the ZAP baseline scanner. A
   dedicated report parser (`scripts/check-zap-severity.mjs`) fails the job on
   unexcepted medium/high findings by JSON `riskcode`; ZAP's own rule actions
   never decide the outcome (`fail_action: false`). We explicitly record that
   its security value is **limited**: it scans internal demo tooling, not the
   published library, and no consumer ever loads the scanned surface. It is
   retained as defense-in-depth on the demo.

3. **New-code gate, not a red wall.** Pre-existing findings are triaged and
   burned down rather than blocking the initial rollout (ADR-0010). Low-risk ZAP
   alerts remain report-only; CodeQL's PR comparison flags findings introduced
   by changed code while existing default-branch findings are triaged
   separately. A reviewed `.zap/rules.tsv` exception file (with owner, expiry,
   and rationale, enforced by `scripts/validate-security-workflow.mjs`) is the
   only sanctioned suppression path.

4. **Retain Dependabot** as the dependency-hygiene control, complementary to
   SAST and DAST — not replaced by them.

5. **Least-privilege permissions.** Every workflow declares an explicit
   `permissions` block. `security.yml` and `ci.yaml` default to `contents: read`
   and hold no write credential in any job that runs PR-controlled code.

## Consequences

- **Positive:** The QASP "Secure" gap is closed with a documented, layered
  posture. The gate fails on new medium/high findings, and a reviewer can see
  what each control does and does not protect. We stay aligned with the
  sam-styles and ngx-uswds-icons patterns.
- **Negative / accepted:** The demo-app DAST scan spends CI time on a surface
  that is not shipped to consumers, so some findings are inherently about
  tooling rather than the product. We accept this for parity and
  defense-in-depth.
- **Deliberately not done:** We do not commit a CodeQL workflow (conflicts with
  default setup) and do not add a second, product-facing DAST target, because
  the published artifact is a component library with no standalone runtime
  surface to host and scan. Revisit if a hosted, consumer-facing surface is ever
  introduced.
- **Follow-up owned by admins / DevSecOps:** Branch protection, required status
  checks, and CodeQL new-alert merge protection must be configured by a
  repository administrator; they cannot be set by a repository change alone. See
  `docs/security-scanning.md`.
