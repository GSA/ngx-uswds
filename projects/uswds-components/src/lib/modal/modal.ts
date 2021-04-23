import {Injectable, Injector, ComponentFactoryResolver} from '@angular/core';

import {UsaModalOptions, UsaModalConfig} from './modal-config';
import {UsaModalRef} from './modal-ref';
import {UsaModalStack} from './modal-stack';

/**
 * A service for opening modal windows.
 *
 * Creating a modal is straightforward: create a component or a template and pass it as an argument to
 * the `.open()` method.
 */
@Injectable({providedIn: 'root'})
export class UsaModalService {
  constructor(
    private _moduleCFR: ComponentFactoryResolver, 
    private _injector: Injector, 
    private _modalStack: UsaModalStack,
    private _config: UsaModalConfig
  ) {}

  /**
   * Opens a new modal window with the specified content and supplied options.
   *
   * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
   * then instances of those components can be injected with an instance of the `UsaActiveModal` class. You can then
   * use `UsaActiveModal` methods to close / dismiss modals from "inside" of your component.
   */
  open(content: any, options: UsaModalOptions = {}): UsaModalRef {
    const combinedOptions = {...this._config, animation: this._config.animation, ...options};
    return this._modalStack.open(this._moduleCFR, this._injector, content, combinedOptions);
  }

  /**
   * Returns an observable that holds the active modal instances.
   */
  get activeInstances() { return this._modalStack.activeInstances; }

  /**
   * Dismisses all currently displayed modal windows with the supplied reason.
   *
   * @since 3.1.0
   */
  dismissAll(reason?: any) { this._modalStack.dismissAll(reason); }

  /**
   * Indicates if there are currently any open modal windows in the application.
   *
   * @since 3.3.0
   */
  hasOpenModals(): boolean { return this._modalStack.hasOpenModals(); }
}
