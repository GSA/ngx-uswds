import {Injectable} from '@angular/core';

/**
 * A configuration service for the UsaAccordion component.
 *
 * You can inject this service, typically in your root component, and customize its properties
 * to provide default values for all accordions used in the application.
 */
@Injectable({providedIn: 'root'})
export class UsaAccordionConfig {
  singleSelect = false;
  bordered: boolean;
  headerLevel: 2 | 3 | 4 | 5 | 6 = 4;
  private _animation: boolean = true;

  get animation(): boolean { return this._animation; }
  set animation(animation: boolean) { this._animation = animation; }
}
