import {DOCUMENT} from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Inject,
  Injectable,
  Injector,
  NgZone,
  RendererFactory2,
  TemplateRef
} from '@angular/core';
import {Subject} from 'rxjs';

import { usaFocusTrap } from '../util/focus-trap';
import {ContentRef} from '../util/popup';
import {ScrollBar} from '../util/scrollbar';
import {isDefined, isString} from '../util/util';
import {UsaModalBackdrop} from './modal-backdrop';
import { UsaModalOptions } from './modal-config';
import {UsaActiveModal, NgbModalRef} from './modal-ref';
import {NgbModalWindow} from './modal-window';

@Injectable({providedIn: 'root'})
export class NgbModalStack {
  private _activeWindowCmptHasChanged = new Subject();
  private _ariaHiddenValues: Map<Element, string | null> = new Map();
  private _backdropAttributes = ['animation', 'backdropClass'];
  private _modalRefs: NgbModalRef[] = [];
  private _windowAttributes = [
    'animation', 'ariaLabelledBy', 'ariaDescribedBy', 'backdrop', 'centered', 'keyboard', 'scrollable', 'size',
    'modalDialogClass', 'overlayElement', 'showClose'
  ];
  private _windowCmpts: ComponentRef<NgbModalWindow>[] = [];
  private _activeInstances: EventEmitter<NgbModalRef[]> = new EventEmitter();

  constructor(
      private _applicationRef: ApplicationRef, private _injector: Injector, @Inject(DOCUMENT) private _document: any,
      private _scrollBar: ScrollBar, private _rendererFactory: RendererFactory2, private _ngZone: NgZone) {
    // Trap focus on active WindowCmpt
    this._activeWindowCmptHasChanged.subscribe(() => {
      if (this._windowCmpts.length) {
        const activeWindowCmpt = this._windowCmpts[this._windowCmpts.length - 1];
        usaFocusTrap(this._ngZone, activeWindowCmpt.location.nativeElement, this._activeWindowCmptHasChanged);
        this._revertAriaHidden();
        this._setAriaHidden(activeWindowCmpt.location.nativeElement);
      }
    });
  }

  open(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, options): NgbModalRef {
    let containerEl = options.container;
    let shouldRemoveContainer = false;

    if (!containerEl && isDefined(options.container)) {
      containerEl = this._document.querySelector(options.container);
    }

    if (!containerEl) {
      let wrapperNode: Element = this._document.createElement("div");
      wrapperNode.className = 'usa-modal-wrapper';
      this._document.body.appendChild(wrapperNode);
      containerEl = wrapperNode;
      shouldRemoveContainer = true;
    }
  
    const renderer = this._rendererFactory.createRenderer(null, null);

    const revertPaddingForScrollBar = this._scrollBar.compensate();
    const removeBodyClass = () => {
      if (!this._modalRefs.length) {
        renderer.removeClass(this._document.body, 'modal-open');
        this._revertAriaHidden();
      }
    };

    const removeContainer = () => {
      if (shouldRemoveContainer) {
        (this._document.body as Element).removeChild(containerEl);
      }
    }

    if (!containerEl) {
      throw new Error(`The specified modal container "${options.container || 'body'}" was not found in the DOM.`);
    }

    const activeModal = new UsaActiveModal();
    const contentRef =
        this._getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal, options);

    let backdropCmptRef: ComponentRef<UsaModalBackdrop> | undefined =
        options.backdrop !== false ? this._attachBackdrop(moduleCFR, containerEl) : undefined;
    let windowCmptRef: ComponentRef<NgbModalWindow> = this._attachWindowComponent(moduleCFR, backdropCmptRef.instance._el.nativeElement, contentRef);
    let ngbModalRef: NgbModalRef = new NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);

    this._registerModalRef(ngbModalRef);
    this._registerWindowCmpt(windowCmptRef);
    ngbModalRef.result.then(revertPaddingForScrollBar, revertPaddingForScrollBar);
    ngbModalRef.result.then(removeBodyClass, removeBodyClass);
    ngbModalRef.result.then(removeContainer, removeContainer);
    
    activeModal.close = (result: any) => { ngbModalRef.close(result); };
    activeModal.dismiss = (reason: any) => { ngbModalRef.dismiss(reason); };

    this._applyWindowOptions(windowCmptRef.instance, options);
    if (this._modalRefs.length === 1) {
      renderer.addClass(this._document.body, 'modal-open');
    }

    if (backdropCmptRef && backdropCmptRef.instance) {
      this._applyBackdropOptions(backdropCmptRef.instance, options);
    }
    return ngbModalRef;
  }

  get activeInstances() { return this._activeInstances; }

  dismissAll(reason?: any) { this._modalRefs.forEach(ngbModalRef => ngbModalRef.dismiss(reason)); }

  hasOpenModals(): boolean { return this._modalRefs.length > 0; }

  private _attachBackdrop(moduleCFR: ComponentFactoryResolver, containerEl: any): ComponentRef<UsaModalBackdrop> {
    let backdropFactory = moduleCFR.resolveComponentFactory(UsaModalBackdrop);
    let backdropCmptRef = backdropFactory.create(this._injector);
    this._applicationRef.attachView(backdropCmptRef.hostView);
    containerEl.appendChild(backdropCmptRef.location.nativeElement);
    return backdropCmptRef;
  }

  private _attachWindowComponent(moduleCFR: ComponentFactoryResolver, containerEl: any, contentRef: any):
      ComponentRef<NgbModalWindow> {
    let windowFactory = moduleCFR.resolveComponentFactory(NgbModalWindow);
    let windowCmptRef = windowFactory.create(this._injector, contentRef.nodes);
    windowCmptRef.instance.overlayElement = containerEl;
    this._applicationRef.attachView(windowCmptRef.hostView);
    containerEl.appendChild(windowCmptRef.location.nativeElement);
    return windowCmptRef;
  }

  private _applyWindowOptions(windowInstance: NgbModalWindow, options: Object): void {
    this._windowAttributes.forEach((optionName: string) => {
      if (isDefined(options[optionName])) {
        windowInstance[optionName] = options[optionName];
      }
    });
  }

  private _applyBackdropOptions(backdropInstance: UsaModalBackdrop, options: Object): void {
    this._backdropAttributes.forEach((optionName: string) => {
      if (isDefined(options[optionName])) {
        backdropInstance[optionName] = options[optionName];
      }
    });
  }

  private _getContentRef(
      moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, activeModal: UsaActiveModal,
      options: UsaModalOptions): ContentRef {
    if (!content) {
      return new ContentRef([]);
    } else if (content instanceof TemplateRef) {
      return this._createFromTemplateRef(content, activeModal);
    } else if (isString(content)) {
      return this._createFromString(content);
    } else {
      return this._createFromComponent(moduleCFR, contentInjector, content, activeModal, options);
    }
  }

  private _createFromTemplateRef(content: TemplateRef<any>, activeModal: UsaActiveModal): ContentRef {
    const context = {
      $implicit: activeModal,
      close(result) { activeModal.close(result); },
      dismiss(reason) { activeModal.dismiss(reason); }
    };
    const viewRef = content.createEmbeddedView(context);
    this._applicationRef.attachView(viewRef);
    return new ContentRef([viewRef.rootNodes], viewRef);
  }

  private _createFromString(content: string): ContentRef {
    const component = this._document.createTextNode(`${content}`);
    return new ContentRef([[component]]);
  }

  private _createFromComponent(
      moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, context: UsaActiveModal,
      options: UsaModalOptions): ContentRef {
    const contentCmptFactory = moduleCFR.resolveComponentFactory(content);
    const modalContentInjector =
        Injector.create({providers: [{provide: UsaActiveModal, useValue: context}], parent: contentInjector});
    const componentRef = contentCmptFactory.create(modalContentInjector);
    const componentNativeEl = componentRef.location.nativeElement;
    if (options.scrollable) {
      (componentNativeEl as HTMLElement).classList.add('component-host-scrollable');
    }
    this._applicationRef.attachView(componentRef.hostView);
    // FIXME: we should here get rid of the component nativeElement
    // and use `[Array.from(componentNativeEl.childNodes)]` instead and remove the above CSS class.
    return new ContentRef([[componentNativeEl]], componentRef.hostView, componentRef);
  }

  private _setAriaHidden(element: Element) {
    const parent = element.parentElement;
    if (parent && element !== this._document.body) {
      Array.from(parent.children).forEach(sibling => {
        if (sibling !== element && sibling.nodeName !== 'SCRIPT') {
          this._ariaHiddenValues.set(sibling, sibling.getAttribute('aria-hidden'));
          sibling.setAttribute('aria-hidden', 'true');
        }
      });

      this._setAriaHidden(parent);
    }
  }

  private _revertAriaHidden() {
    this._ariaHiddenValues.forEach((value, element) => {
      if (value) {
        element.setAttribute('aria-hidden', value);
      } else {
        element.removeAttribute('aria-hidden');
      }
    });
    this._ariaHiddenValues.clear();
  }

  private _registerModalRef(ngbModalRef: NgbModalRef) {
    const unregisterModalRef = () => {
      const index = this._modalRefs.indexOf(ngbModalRef);
      if (index > -1) {
        this._modalRefs.splice(index, 1);
        this._activeInstances.emit(this._modalRefs);
      }
    };
    this._modalRefs.push(ngbModalRef);
    this._activeInstances.emit(this._modalRefs);
    ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
  }

  private _registerWindowCmpt(ngbWindowCmpt: ComponentRef<NgbModalWindow>) {
    this._windowCmpts.push(ngbWindowCmpt);
    this._activeWindowCmptHasChanged.next();

    ngbWindowCmpt.onDestroy(() => {
      const index = this._windowCmpts.indexOf(ngbWindowCmpt);
      if (index > -1) {
        this._windowCmpts.splice(index, 1);
        this._activeWindowCmptHasChanged.next();
      }
    });
  }
}
