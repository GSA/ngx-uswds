import {DOCUMENT} from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {fromEvent, Observable, Subject, zip} from 'rxjs';
import {filter, switchMap, take, takeUntil, tap} from 'rxjs/operators';

import {getFocusableBoundaryElements} from '../util/focus-trap';
import { Key, KeyCode, MicrosfotKeys} from '../util/key';
import {ModalDismissReasons} from './modal-dismiss-reasons';
import {ngbRunTransition, NgbTransitionOptions} from '../util/transition/usaTransition';
import {reflow} from '../util/util';

@Component({
  selector: 'ngb-modal-window',
  host: {
    '[class]': '"usa-modal" + (modalDialogClass ? " " + modalDialogClass : "")',
    '[class.fade]': 'animation',
    '[class.usa-modal--lg]': 'size === \'lg\'',
    'role': 'dialog',
    'tabindex': '-1',
    '[attr.aria-modal]': 'true',
    '[attr.aria-labelledby]': 'ariaLabelledBy',
    '[attr.aria-describedby]': 'ariaDescribedBy'
  },
  template: `
    <div #dialog class="usa-modal__content">
      <div class="usa-modal__main">
        <ng-content></ng-content>
      </div>

      <button *ngIf="showClose" class="usa-button usa-modal__close" aria-label="Close this window" (click)="onCloseClicked()">
        <img aria-hidden="true" focusable="false" src="assets/image/close.svg" style="width: 15px" class="margin-top-2 margin-right-2">
      </button>
    </div>
    `,
  encapsulation: ViewEncapsulation.None,
})
export class NgbModalWindow implements OnInit,
    AfterViewInit, OnDestroy {
  private _closed$ = new Subject<void>();
  private _elWithFocus: Element | null = null;  // element that is focused prior to modal opening

  @ViewChild('dialog', {static: true}) private _dialogEl: ElementRef<HTMLElement>;

  @Input() animation: boolean;
  @Input() ariaLabelledBy: string;
  @Input() ariaDescribedBy: string;
  @Input() backdrop: boolean | string = true;
  @Input() centered: string;
  @Input() keyboard = true;
  @Input() scrollable: string;
  @Input() size: string;
  @Input() modalDialogClass: string;
  @Input() overlayElement: Element;
  @Input() showClose: boolean = true;

  @Output('dismiss') dismissEvent = new EventEmitter();

  shown = new Subject<void>();
  hidden = new Subject<void>();

  constructor(
      @Inject(DOCUMENT) private _document: any, private _elRef: ElementRef<HTMLElement>, private _zone: NgZone) {}

  dismiss(reason): void { this.dismissEvent.emit(reason); }

  ngOnInit() { this._elWithFocus = this._document.activeElement; console.log(this) }

  ngAfterViewInit() { this._show(); }

  ngOnDestroy() { this._disableEventHandling(); }

  hide(): Observable<any> {
    const {nativeElement} = this._elRef;
    const context: NgbTransitionOptions<any> = {animation: this.animation, runningTransition: 'stop'};

    const windowTransition$ =
        ngbRunTransition(this._zone, nativeElement, () => nativeElement.classList.remove('show'), context);
    const dialogTransition$ = ngbRunTransition(this._zone, this._dialogEl.nativeElement, () => {}, context);

    const transitions$ = zip(windowTransition$, dialogTransition$);
    transitions$.subscribe(() => {
      this.hidden.next();
      this.hidden.complete();
    });

    this._disableEventHandling();
    this._restoreFocus();

    return transitions$;
  }

  onCloseClicked() {
    this.dismiss(ModalDismissReasons.CLOSE_CLICKED);
  }

  private _show() {
    const context: NgbTransitionOptions<any> = {animation: this.animation, runningTransition: 'continue'};

    const windowTransition$ =
        ngbRunTransition(this._zone, this._elRef.nativeElement, (element: HTMLElement, animation: boolean) => {
          if (animation) {
            reflow(element);
          }
          element.classList.add('show');
        }, context);
    const dialogTransition$ = ngbRunTransition(this._zone, this._dialogEl.nativeElement, () => {}, context);

    zip(windowTransition$, dialogTransition$).subscribe(() => {
      this.shown.next();
      this.shown.complete();
    });

    this._enableEventHandling();
    this._setFocus();
  }

  private _enableEventHandling() {
    const {nativeElement} = this._elRef;
    this._zone.runOutsideAngular(() => {
      fromEvent<KeyboardEvent>(nativeElement, 'keydown')
          .pipe(
              takeUntil(this._closed$),
              // tslint:disable-next-line:deprecation
              filter(e => e.key === Key.Escape || e.key === MicrosfotKeys.Escape || e.which === KeyCode.Escape))
          .subscribe(event => {
            if (this.keyboard) {
              requestAnimationFrame(() => {
                if (!event.defaultPrevented) {
                  this._zone.run(() => this.dismiss(ModalDismissReasons.ESC));
                }
              });
            } else if (this.backdrop === 'static') {
              this._bumpBackdrop();
            }
          });

      // We're listening to 'mousedown' and 'mouseup' to prevent modal from closing when pressing the mouse
      // inside the modal dialog and releasing it outside
      let preventClose = false;
      fromEvent<MouseEvent>(this._dialogEl.nativeElement, 'mousedown')
          .pipe(
              takeUntil(this._closed$), tap(() => preventClose = false),
              switchMap(() => fromEvent<MouseEvent>(nativeElement, 'mouseup').pipe(takeUntil(this._closed$), take(1))),
              filter(({target}) => nativeElement === target))
          .subscribe(() => { preventClose = true; });

      // We're listening to 'click' to dismiss modal on modal window click, except when:
      // 1. clicking on modal dialog itself
      // 2. closing was prevented by mousedown/up handlers
      // 3. clicking on scrollbar when the viewport is too small and modal doesn't fit (click is not triggered at all)
      fromEvent<MouseEvent>(this.overlayElement, 'click').pipe(takeUntil(this._closed$)).subscribe(({target}) => {
        if (this.overlayElement === target) {
          if (this.backdrop === 'static') {
            this._bumpBackdrop();
          } else if (this.backdrop === true && !preventClose) {
            this._zone.run(() => this.dismiss(ModalDismissReasons.BACKDROP_CLICK));
          }
        }

        preventClose = false;
      });
    });
  }

  private _disableEventHandling() { this._closed$.next(); }

  private _setFocus() {
    const {nativeElement} = this._elRef;
    if (!nativeElement.contains(document.activeElement)) {
      const autoFocusable = nativeElement.querySelector(`[ngbAutofocus]`) as HTMLElement;
      const firstFocusable = getFocusableBoundaryElements(nativeElement)[0];

      const elementToFocus = autoFocusable || firstFocusable || nativeElement;
      elementToFocus.focus();
    }
  }

  private _restoreFocus() {
    const body = this._document.body;
    const elWithFocus = this._elWithFocus;

    let elementToFocus;
    if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
      elementToFocus = elWithFocus;
    } else {
      elementToFocus = body;
    }
    this._zone.runOutsideAngular(() => {
      setTimeout(() => elementToFocus.focus());
      this._elWithFocus = null;
    });
  }

  private _bumpBackdrop() {
    if (this.backdrop === 'static') {
      ngbRunTransition(this._zone, this._elRef.nativeElement, ({classList}) => {
        classList.add('modal-static');
        return () => classList.remove('modal-static');
      }, {animation: this.animation, runningTransition: 'continue'});
    }
  }
}
