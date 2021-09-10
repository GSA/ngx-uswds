import {NgZone} from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';

export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

export function toString(value: any): string {
  return (value !== undefined && value !== null) ? `${value}` : '';
}

export function getValueInRange(value: number, max: number, min = 0): number {
  return Math.max(Math.min(value, max), min);
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isNumber(value: any): value is number {
  return !isNaN(toInteger(value));
}

export function isInteger(value: any): value is number {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

export function isDefined(value: any): boolean {
  return value !== undefined && value !== null;
}

export function padNumber(value: number) {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  } else {
    return '';
  }
}

export function regExpEscape(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export function hasClassName(element: any, className: string): boolean {
  return element && element.className && element.className.split &&
      element.className.split(/\s+/).indexOf(className) >= 0;
}

if (typeof Element !== 'undefined' && !Element.prototype.closest) {
  // Polyfill for ie10+

  if (!Element.prototype.matches) {
    // IE uses the non-standard name: msMatchesSelector
    Element.prototype.matches = (Element.prototype as any).msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  Element.prototype.closest = function(s: string) {
    let el = this;
    if (!document.documentElement.contains(el)) {
      return null;
    }
    do {
      if (el.matches(s)) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

export function closest(element: HTMLElement, selector?: string): HTMLElement | null {
  if (!selector) {
    return null;
  }

  /*
   * In certain browsers (e.g. Edge 44.18362.449.0) HTMLDocument does
   * not support `Element.prototype.closest`. To emulate the correct behaviour
   * we return null when the method is missing.
   *
   * Note that in evergreen browsers `closest(document.documentElement, 'html')`
   * will return the document element whilst in Edge null will be returned. This
   * compromise was deemed good enough.
   */
  if (typeof element.closest === 'undefined') {
    return null;
  }

  return element.closest(selector);
}

/**
 * Force a browser reflow
 * @param element element where to apply the reflow
 */
export function reflow(element: HTMLElement) {
  return (element || document.body).getBoundingClientRect();
}

/**
 * Creates an observable where all callbacks are executed inside a given zone
 *
 * @param zone
 */
export function runInZone<T>(zone: NgZone): OperatorFunction<T, T> {
  return (source) => {
    return new Observable(observer => {
      const onNext = (value: T) => zone.run(() => observer.next(value));
      const onError = (e: any) => zone.run(() => observer.error(e));
      const onComplete = () => zone.run(() => observer.complete());
      return source.subscribe(onNext, onError, onComplete);
    });
  };
}

export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
* Returns the the last element in the array where predicate is true, and null
* otherwise.
* @param array The source array to search in
* @param predicate find calls predicate once for each element of the array, in descending
* order, until it finds one where predicate returns true. If such an element is found,
* findLast immediately returns that element. Otherwise, findLast returns null.
*/
export function findLast<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): T {
  let l = array.length;
  while (l--) {
      if (predicate(array[l], l, array))
          return array[l];
  }
  return null;
}

/**
* Returns the the last element's index in the array where predicate is true, and null
* otherwise.
* @param array The source array to search in
* @param predicate calls predicate once for each element of the array, in descending
* order, until it finds one where predicate returns true. If such an element is found,
* findLastIndex immediately returns that element's index. Otherwise, findLast returns -1.
*/
export function findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number {
  let l = array.length;
  while (l--) {
      if (predicate(array[l], l, array))
          return l;
  }
  return -1;
}

/**
 * Gets the next focusable item in a list. It is expected that the items in the given list contain
 * a disabled property such that disabled items are skipped when calculating next focusable item.
 * @param currentIndex - Starting point from where to start checking
 * @param allItems - all items in list
 * @param delta - either 1 to get next item in positive direction or -1 to get next item in previous direction
 * @returns next item
 */
export function getNextItemInList<T extends {disabled: boolean}>(currentIndex: number, allItems: T[], delta: 1 | -1) {
  let nextItemIndex = ((currentIndex + delta) + allItems.length) % allItems.length;

  while(nextItemIndex != currentIndex) {
    if (!allItems[nextItemIndex].disabled) {
      break;
    }
    
    nextItemIndex = ((nextItemIndex + delta) + allItems.length) % allItems.length;    
  }

  return allItems[nextItemIndex];
}

/**
 * Gets the next focusable item's index in a list. It is expected that the items in the given list contain
 * a disabled property such that disabled items are skipped when calculating next focusable item.
 * @param currentIndex - Starting point from where to start checking
 * @param allItems - all items in list
 * @param delta - either 1 to get next item in positive direction or -1 to get next item in previous direction
 * @returns next focusable item's index
 */
 export function getNextItemIndexInList<T extends {disabled?: boolean}>(currentIndex: number, allItems: T[], delta: 1 | -1) {
  let nextItemIndex = ((currentIndex + delta) + allItems.length) % allItems.length;

  while(nextItemIndex != currentIndex) {
    if (!allItems[nextItemIndex].disabled) {
      break;
    }
    
    nextItemIndex = ((nextItemIndex + delta) + allItems.length) % allItems.length;    
  }

  return nextItemIndex;
}

/**
 * Coerces a value to an array of trimmed non-empty strings.
 * Any input that is not an array, `null` or `undefined` will be turned into a string
 * via `toString()` and subsequently split with the given separator.
 * `null` and `undefined` will result in an empty array.
 * This results in the following outcomes:
 * - `null` -&gt; `[]`
 * - `[null]` -&gt; `["null"]`
 * - `["a", "b ", " "]` -&gt; `["a", "b"]`
 * - `[1, [2, 3]]` -&gt; `["1", "2,3"]`
 * - `[{ a: 0 }]` -&gt; `["[object Object]"]`
 * - `{ a: 0 }` -&gt; `["[object", "Object]"]`
 *
 * Useful for defining CSS classes or table columns.
 * @param value the value to coerce into an array of strings
 * @param separator split-separator if value isn't an array
 */
 export function coerceStringArray(value: any, separator: string | RegExp = /\s+/): string[] {
  const result = [];

  if (value != null) {
    const sourceValues = Array.isArray(value) ? value : `${value}`.split(separator);
    for (const sourceValue of sourceValues) {
      const trimmedString = `${sourceValue}`.trim();
      if (trimmedString) {
        result.push(trimmedString);
      }
    }
  }

  return result;
}
