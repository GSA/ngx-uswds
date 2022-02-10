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

export function isArrowDown(event: KeyboardEvent) {
  return event.key === Key.ArrowDown || event.key === MicrosfotKeys.ArrowDown || event.keyCode === KeyCode.ArrowDown;
}

export function isArrowUp(event: KeyboardEvent) {
  return event.key === Key.ArrowUp || event.key === MicrosfotKeys.ArrowUp || event.keyCode === KeyCode.ArrowUp;
}

export function isArrowRight(event: KeyboardEvent) {
  return event.key === Key.ArrowRight || event.key === MicrosfotKeys.ArrowRight || event.keyCode === KeyCode.ArrowRight;
}

export function isArrowLeft(event: KeyboardEvent) {
  return event.key === Key.ArrowLeft || event.key === MicrosfotKeys.ArrowLeft || event.keyCode === KeyCode.ArrowLeft;
}

export function isHome(event: KeyboardEvent) {
  return event.key === Key.Home || event.key === MicrosfotKeys.Home || event.keyCode === KeyCode.Home;
}

export function isEnd(event: KeyboardEvent) {
  return event.key === Key.End || event.key === MicrosfotKeys.End || event.keyCode === KeyCode.End;
}

export function isEscape(event: KeyboardEvent) {
  return event.key === Key.Escape || event.key === MicrosfotKeys.Escape || event.keyCode === KeyCode.Escape;
}

export function isPageDown(event: KeyboardEvent) {
  return event.key === Key.PageDown || event.key === MicrosfotKeys.PageDown || event.keyCode === KeyCode.PageDown;
}

export function isPageUp(event: KeyboardEvent) {
  return event.key === Key.PageUp || event.key === MicrosfotKeys.PageUp || event.keyCode === KeyCode.PageUp;
} 

export function isEnter(event: KeyboardEvent) {
  return event.key === Key.Enter || event.key === MicrosfotKeys.Enter || event.keyCode === KeyCode.Enter;
}

export function isTab(event: KeyboardEvent) {
  return !hasModifierKey(event) && (event.key === Key.Tab || event.key === MicrosfotKeys.Tab || event.keyCode === KeyCode.Tab);
}

export function isSpace(event: KeyboardEvent) {
  return event.key === Key.Space || event.key === MicrosfotKeys.Space || event.keyCode === KeyCode.Space;
}

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
