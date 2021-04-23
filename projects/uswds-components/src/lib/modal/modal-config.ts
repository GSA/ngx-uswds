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
   * Display close button (true by default)
   */
  showClose?: boolean;

  /**
   * Modal Id
   */
  id?: string;
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
  injector: Injector;
  keyboard = true;
  size: 'sm' | 'lg';
  modalDialogClass: string;
  showClose: boolean = true;
  animation: boolean = true;
  id: string;
}
