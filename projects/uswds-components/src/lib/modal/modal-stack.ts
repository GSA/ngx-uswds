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
import {UsaModalWrapper} from './modal-wrapper';
import {UsaActiveModal, UsaModalRef} from './modal-ref';
import {UsaModalWindow} from './modal-window';

@Injectable({providedIn: 'root'})
export class UsaModalStack {
  private _activeWindowCmptHasChanged = new Subject();
  private _ariaHiddenValues: Map<Element, string | null> = new Map();
  private _modalRefs: UsaModalRef[] = [];
  private _windowAttributes = [
    'animation', 'ariaLabelledBy', 'ariaDescribedBy', 'backdrop', 'keyboard', 'size',
    'modalDialogClass', 'overlayElement', 'showClose', 'id'
  ];
  private _windowCmpts: ComponentRef<UsaModalWindow>[] = [];
  private _activeInstances: EventEmitter<UsaModalRef[]> = new EventEmitter();

  constructor(
      private _applicationRef: ApplicationRef, 
      private _injector: Injector, 
      @Inject(DOCUMENT) private _document: any,
      private _scrollBar: ScrollBar, 
      private _rendererFactory: RendererFactory2, 
      private _ngZone: NgZone) {
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

  open(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, options): UsaModalRef {

    const renderer = this._rendererFactory.createRenderer(null, null);
    let containerEl: Element = this._document.body;

    const revertPaddingForScrollBar = this._scrollBar.compensate();
    
    const removeBodyClass = () => {
      if (!this._modalRefs.length) {
        renderer.removeClass(this._document.body, 'usa-js-modal--active');
        this._revertAriaHidden();
      }
    };

    const activeModal = new UsaActiveModal();
    const contentRef =
        this._getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal);

    let backdropCmptRef: ComponentRef<UsaModalWrapper> | undefined =
        options.backdrop !== false ? this._attachBackdrop(moduleCFR, containerEl) : undefined;

    const overlayRef: HTMLDivElement = backdropCmptRef.instance._el.nativeElement.querySelector('.usa-modal-overlay');

    let windowCmptRef: ComponentRef<UsaModalWindow> = this._attachWindowComponent(moduleCFR, overlayRef, contentRef);
    let usaModalRef: UsaModalRef = new UsaModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);

    this._registerModalRef(usaModalRef);
    this._registerWindowCmpt(windowCmptRef);
    usaModalRef.result.then(revertPaddingForScrollBar, revertPaddingForScrollBar);
    usaModalRef.result.then(removeBodyClass, removeBodyClass);
    
    activeModal.close = (result: any) => { usaModalRef.close(result); };
    activeModal.dismiss = (reason: any) => { usaModalRef.dismiss(reason); };

    this._applyWindowOptions(windowCmptRef.instance, options);
    if (this._modalRefs.length === 1) {
      renderer.addClass(this._document.body, 'usa-js-modal--active');
    }

    return usaModalRef;
  }

  get activeInstances() { return this._activeInstances; }

  dismissAll(reason?: any) { this._modalRefs.forEach(usaModalRef => usaModalRef.dismiss(reason)); }

  hasOpenModals(): boolean { return this._modalRefs.length > 0; }

  private _attachBackdrop(moduleCFR: ComponentFactoryResolver, containerEl: any): ComponentRef<UsaModalWrapper> {
    let backdropFactory = moduleCFR.resolveComponentFactory(UsaModalWrapper);
    let backdropCmptRef = backdropFactory.create(this._injector);
    this._applicationRef.attachView(backdropCmptRef.hostView);
    containerEl.appendChild(backdropCmptRef.location.nativeElement);
    return backdropCmptRef;
  }

  private _attachWindowComponent(moduleCFR: ComponentFactoryResolver, containerEl: any, contentRef: any):
      ComponentRef<UsaModalWindow> {
    let windowFactory = moduleCFR.resolveComponentFactory(UsaModalWindow);
    let windowCmptRef = windowFactory.create(this._injector, contentRef.nodes);
    windowCmptRef.instance.overlayElement = containerEl;
    this._applicationRef.attachView(windowCmptRef.hostView);
    containerEl.appendChild(windowCmptRef.location.nativeElement);
    return windowCmptRef;
  }

  private _applyWindowOptions(windowInstance: UsaModalWindow, options: Object): void {
    this._windowAttributes.forEach((optionName: string) => {
      if (isDefined(options[optionName])) {
        windowInstance[optionName] = options[optionName];
      }
    });
  }

  private _getContentRef(
      moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, activeModal: UsaActiveModal): ContentRef {
    if (!content) {
      return new ContentRef([]);
    } else if (content instanceof TemplateRef) {
      return this._createFromTemplateRef(content, activeModal);
    } else if (isString(content)) {
      return this._createFromString(content);
    } else {
      return this._createFromComponent(moduleCFR, contentInjector, content, activeModal);
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
      moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, context: UsaActiveModal): ContentRef {
    const contentCmptFactory = moduleCFR.resolveComponentFactory(content);
    const modalContentInjector =
        Injector.create({providers: [{provide: UsaActiveModal, useValue: context}], parent: contentInjector});
    const componentRef = contentCmptFactory.create(modalContentInjector);
    const componentNativeEl = componentRef.location.nativeElement;
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

  private _registerModalRef(usaModalRef: UsaModalRef) {
    const unregisterModalRef = () => {
      const index = this._modalRefs.indexOf(usaModalRef);
      if (index > -1) {
        this._modalRefs.splice(index, 1);
        this._activeInstances.emit(this._modalRefs);
      }
    };
    this._modalRefs.push(usaModalRef);
    this._activeInstances.emit(this._modalRefs);
    usaModalRef.result.then(unregisterModalRef, unregisterModalRef);
  }

  private _registerWindowCmpt(usaWindowCmpt: ComponentRef<UsaModalWindow>) {
    this._windowCmpts.push(usaWindowCmpt);
    this._activeWindowCmptHasChanged.next();

    usaWindowCmpt.onDestroy(() => {
      const index = this._windowCmpts.indexOf(usaWindowCmpt);
      if (index > -1) {
        this._windowCmpts.splice(index, 1);
        this._activeWindowCmptHasChanged.next();
      }
    });
  }
}
