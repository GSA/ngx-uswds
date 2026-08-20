import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

/**
 * Static file server for the built uswds-components demo app, used only by the
 * DAST job in `.github/workflows/security.yml`. It serves `dist/usa-components`
 * with representative production security headers so the OWASP ZAP baseline
 * scan exercises the headers a real deployment would emit, rather than the
 * bare, header-less defaults of a dev file server.
 *
 * The demo app (`usa-components`) is internal tooling; the published package is
 * the `uswds-components` library, which has no standalone runtime surface. This
 * scan is therefore defense-in-depth on the demo, not a control over the
 * shipped artifact — see docs/adr/0001-security-scanning-posture.md.
 */
const root = resolve('dist/usa-components');
const port = Number(process.env.SECURITY_SCAN_PORT ?? 4200);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const securityHeaders = {
  'Content-Security-Policy':
    "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=()',
  'Referrer-Policy': 'no-referrer',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
  const requestedPath = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, '');
  let filePath = join(root, requestedPath);

  // Prevent path traversal outside the served root; fall back to the SPA
  // index so client-side routes still resolve for the scanner.
  if (!filePath.startsWith(root)) {
    response.writeHead(404, securityHeaders).end('Not found');
    return;
  }
  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    const candidate = existsSync(filePath) ? join(filePath, 'index.html') : filePath;
    filePath = existsSync(candidate) ? candidate : join(root, 'index.html');
  }
  if (!existsSync(filePath)) {
    response.writeHead(404, securityHeaders).end('Not found');
    return;
  }

  response.writeHead(200, {
    ...securityHeaders,
    'Content-Type': contentTypes[extname(filePath)] ?? 'application/octet-stream',
  });
  createReadStream(filePath).pipe(response);
}).listen(port, '127.0.0.1', () => console.log(`Security scan server listening on http://127.0.0.1:${port}`));
