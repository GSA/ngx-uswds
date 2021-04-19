import {Component, ElementRef, Input, NgZone, OnInit, ViewEncapsulation} from '@angular/core';

import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

import {usaRunTransition} from '../util/transition/usaTransition';
import {reflow} from '../util/util';

@Component({
  selector: 'usa-modal-backdrop',
  encapsulation: ViewEncapsulation.None,
  template: '',
  host: {
    'class': 'usa-modal-overlay',
    'style': 'z-index: 1050'
  }
})
export class UsaModalBackdrop implements OnInit {
  @Input() animation: boolean;
  @Input() backdropClass: string;

  constructor(public _el: ElementRef<HTMLElement>, private _zone: NgZone) {}

  ngOnInit() {
    // this._zone.onStable.asObservable().pipe(take(1)).subscribe(() => {
    //   usaRunTransition(this._zone, this._el.nativeElement, (element: HTMLElement) => {
    //     element.classList.add('show');
    //   }, {animation: this.animation, runningTransition: 'continue'});
    // });
  }

  // hide(): Observable<void> {
  //   return usaRunTransition(
  //       this._zone, this._el.nativeElement, ({classList}) => classList.remove('show'),
  //       {animation: this.animation, runningTransition: 'stop'});
  // }
}
