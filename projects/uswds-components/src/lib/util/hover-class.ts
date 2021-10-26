import { CommonModule } from '@angular/common';
import { Directive, HostListener, ElementRef, Input, NgModule } from '@angular/core';

/** For internal use - directive that adds or removes class based on hover */
@Directive({
  selector: '[hover-class]'
})
export class HoverClassDirective {

  constructor(public elementRef: ElementRef) { }
  @Input('hover-class') hoverClass:any;  

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.classList.add(this.hoverClass);
 }

  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.classList.remove(this.hoverClass);
  }

}


@NgModule({
  declarations: [HoverClassDirective],
  imports: [CommonModule],
  exports: [HoverClassDirective]
})
export class HoverClassModule {}
