/**
 * Vitest test setup for the uswds-components library.
 *
 * The `@angular/build:unit-test` builder initialises the Angular TestBed and
 * cleanup hooks, but it does not wrap Vitest's `beforeEach`/`it` callbacks in a
 * Zone.js ProxyZone. Angular's `waitForAsync()` and `fakeAsync()` helpers rely
 * on that ProxyZone being present, so we wrap the global test functions here
 * using the `withProxyZone` helper that zone.js/testing exposes on the global
 * `Zone`.
 *
 * We also polyfill `ResizeObserver`, which jsdom does not implement but some
 * components (e.g. the character-count directive) depend on at runtime.
 */

// jsdom does not provide ResizeObserver; provide a no-op implementation.
if (typeof (globalThis as any).ResizeObserver === 'undefined') {
  (globalThis as any).ResizeObserver = class {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  };
}

const zone = (globalThis as any).Zone;
if (zone) {
  const fakeAsyncTestModule = zone[zone.__symbol__('fakeAsyncTest')];
  const withProxyZone: (<T extends (...args: any[]) => any>(fn: T) => T) | undefined =
    fakeAsyncTestModule?.withProxyZone;

  if (withProxyZone) {
    // Wrap the Vitest lifecycle/test functions so every setup and test body runs
    // inside a shared ProxyZone that Angular's zone-based async helpers can find.
    const g = globalThis as any;
    for (const name of ['beforeEach', 'afterEach', 'beforeAll', 'afterAll', 'it', 'test'] as const) {
      const original = g[name];
      if (typeof original !== 'function') {
        continue;
      }

      const wrap = (fn: unknown) => (typeof fn === 'function' ? withProxyZone(fn as any) : fn);

      const patched: any = (first: unknown, ...rest: unknown[]) => {
        // `it`/`test` take (name, fn, timeout); hooks take (fn, timeout).
        if (typeof first === 'string') {
          const [fn, ...tail] = rest;
          return original(first, wrap(fn), ...tail);
        }
        return original(wrap(first), ...rest);
      };

      // Preserve modifiers like it.only / it.skip / it.each.
      for (const key of Object.keys(original)) {
        patched[key] = (original as any)[key];
      }

      g[name] = patched;
    }
  }
}
