import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'tooltip-basic',
  templateUrl: './tooltip-basic.component.html'
})
export class TooltipBasicComponent {
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() title: string | TemplateRef<any> = 'Tooltip Text'
}
