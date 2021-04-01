import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'uswds-button',
  templateUrl: './button.component.html',
})
export class USWDSButtonComponent {

  @Input() secondary = false;
  @Input() accentCool = false;
  @Input() accentWarm = false;
  @Input() base = false;
  @Input() outline = false;
  @Input() inverse = false;
  @Input() big = false;
  @Input() unstyled = false;

  /** Screenreaders will typically read the text of the button on focus. However, if there is no
   * readable text - ex: button contains an icon - then this field can be used to define the label
   * of the button
   */
  @Input() ariaLabel: string;

  /**
   * If the button is part of a group of element and controls open/close state of another element,
   * then ariaControls and ariaExpanded values can be passed in
   */
  @Input() ariaControls: string;
  @Input() ariaExpanded: boolean;

  @Output() click = new EventEmitter<MouseEvent>();

  onClick($event) {
    this.click.emit($event);
  }

}
