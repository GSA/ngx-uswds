import {Injectable, Injector} from '@angular/core';

/**
 * Options available when opening new modal windows with `UsaModal.open()` method.
 */
export interface UsaModalOptions {
  /**
   * If `true`, modal opening and closing will be animated.
   *
   * @since 8.0.0
   */
  animation?: boolean;

  /**
   * `aria-labelledby` attribute value to set on the modal window.
   *
   * @since 2.2.0
   */
  ariaLabelledBy?: string;

  /**
   * `aria-describedby` attribute value to set on the modal window.
   *
   * @since 6.1.0
   */
  ariaDescribedBy?: string;

  /**
   * If `true`, the backdrop element will be created for a given modal.
   *
   * Alternatively, specify `'static'` for a backdrop which doesn't close the modal on click.
   *
   * Default value is `true`.
   */
  backdrop?: boolean | 'static';

  /**
   * Callback right before the modal will be dismissed.
   *
   * If this function returns:
   * * `false`
   * * a promise resolved with `false`
   * * a promise that is rejected
   *
   * then the modal won't be dismissed.
   */
  beforeDismiss?: () => boolean | Promise<boolean>;

  /**
   * If `true`, the modal will be centered vertically.
   *
   * Default value is `false`.
   *
   * @since 1.1.0
   */
  centered?: boolean;

  /**
   * A selector specifying the element all new modal windows should be appended to.
   * Since v5.3.0 it is also possible to pass the reference to an `HTMLElement`.
   *
   * If not specified, will be `body`.
   */
  container?: string | HTMLElement;

  /**
   * The `Injector` to use for modal content.
   */
  injector?: Injector;

  /**
   * If `true`, the modal will be closed when `Escape` key is pressed
   *
   * Default value is `true`.
   */
  keyboard?: boolean;

  /**
   * Scrollable modal content (false by default).
   *
   * @since 5.0.0
   */
  scrollable?: boolean;

  /**
   * Size of a new modal window. Default is 'sm'
   */
  size?: 'sm' | 'lg';


  /**
   * A custom class to append to the modal dialog.
   *
   * @since 9.1.0
   */
  modalDialogClass?: string;

  /**
   * A custom class to append to the modal backdrop.
   *
   * @since 1.1.0
   */
  backdropClass?: string;

  /**
   * Display close button (true by default)
   */
  showClose?: boolean;
}

/**
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all modals used in the application.
*
* @since 3.1.0
*/
@Injectable({providedIn: 'root'})
export class UsaModalConfig implements Required<UsaModalOptions> {
  ariaLabelledBy: string;
  ariaDescribedBy: string;
  backdrop: boolean | 'static' = true;
  beforeDismiss: () => boolean | Promise<boolean>;
  centered: boolean;
  container: string;
  injector: Injector;
  keyboard = true;
  scrollable: boolean;
  size: 'sm' | 'lg';
  modalDialogClass: string;
  backdropClass: string;
  showClose: boolean = true;

  private _animation: boolean;

  get animation(): boolean { return this._animation }
  set animation(animation: boolean) { this._animation = animation; }
}
