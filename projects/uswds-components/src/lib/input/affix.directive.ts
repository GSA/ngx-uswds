import { AfterViewInit, Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: 'input[prefix], input[suffix]'
})
export class UsaInputAffixDirective implements AfterViewInit {

  @Input() prefix: TemplateRef<any> | string;
  @Input() suffix: TemplateRef<any> | string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private viewContainer: ViewContainerRef) {
  }

  ngAfterViewInit(){

    let prefixElement, suffixElement;
    if(this.prefix){
      prefixElement = this.handleAffix(this.prefix, 'usa-input-prefix')
    }
    if(this.suffix){
      suffixElement = this.handleAffix(this.suffix, 'usa-input-suffix')
    }

    const inputGroupDiv = document.createElement('div');
    this.renderer.addClass(inputGroupDiv,'usa-input-group')

    // Apply input class in case only directive was applied
    this.renderer.addClass(this.el.nativeElement, 'usa-input')


    const parent = this.renderer.parentNode(this.el.nativeElement);

    this.renderer.appendChild(inputGroupDiv, prefixElement);
    this.renderer.appendChild(inputGroupDiv, this.el.nativeElement);
    this.renderer.appendChild(inputGroupDiv, suffixElement);

    this.renderer.appendChild(parent, inputGroupDiv);

  }

  /**
   *
   * @param affix Template or string to be displayed as prefix or suffix.
   * @param affixClass USWDS class to apply to element
   */
  handleAffix(affix: TemplateRef<any> | string, affixClass: string){
    let affixView, affixElement;
    if(affix instanceof TemplateRef){
      affixView = this.viewContainer.createEmbeddedView(affix);
      affixElement = affixView.rootNodes[0];
    }

    // If text passed into template, need to wrap in element for USWDS CSS to kick in.
    if(affixView?.rootNodes[0].nodeName === '#text'){
      const div = document.createElement('div');
      this.renderer.appendChild(div, affixElement);
      affixElement = div;
    // If string passed in, insert into element for CSS to apply to
    } else if(typeof affix === 'string'){
      const div = document.createElement('div');
      div.innerText = affix;
      affixElement = div;
    }
    this.renderer.addClass(affixElement, affixClass)
    return affixElement;
  }



}
