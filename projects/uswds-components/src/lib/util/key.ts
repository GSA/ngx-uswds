export enum Key {
  Tab = 'Tab',
  Enter = 'Enter',
  Escape = 'Escape',
  Space = 'Space',
  PageUp = 'PageUp',
  PageDown = 'PageDown',
  End = 'End',
  Home = 'Home',
  ArrowLeft = 'ArrowLeft',
  ArrowUp = 'ArrowUp',
  ArrowRight = 'ArrowRight',
  ArrowDown = 'ArrowDown',
}

// Key values in IE/EDGE
export enum MicrosfotKeys {
  Tab = 'Tab',
  Enter = 'Enter',
  Escape = 'Esc',
  Space = 'Spacebar',
  PageUp = 'PageUp',
  PageDown = 'PageDown',
  End = 'End',
  Home = 'Home',
  ArrowLeft = 'Left',
  ArrowUp = 'Up',
  ArrowRight = 'Right',
  ArrowDown = 'Down',
}

// Deprecated ascii values
export enum KeyCode {
  Tab = 9,
  Enter = 13,
  Escape = 27,
  Space = 32,
  PageUp = 33,
  PageDown = 34,
  End = 35,
  Home = 36,
  ArrowLeft = 37,
  ArrowUp = 38,
  ArrowRight = 39,
  ArrowDown = 40
}

type ModifierKey = 'altKey' | 'shiftKey' | 'ctrlKey' | 'metaKey';

/**
 * Checks whether a modifier key is pressed.
 * @param event Event to be checked.
 */
export function hasModifierKey(event: KeyboardEvent, ...modifiers: ModifierKey[]): boolean {
  if (modifiers.length) {
    return modifiers.some(modifier => event[modifier]);
  }

  return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
}
