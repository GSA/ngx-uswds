import {Component, ElementRef, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'usa-modal-backdrop',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="usa-modal-overlay"></div>
  `,
  host: {
    'class': 'usa-modal-wrapper',
    'style': 'z-index: 1050'
  }
})
export class UsaModalBackdrop {
  constructor(public _el: ElementRef<HTMLElement>) {}
}
