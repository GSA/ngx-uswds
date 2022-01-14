import { Component } from "@angular/core";


@Component({
  selector: 'accordion-basic',
  templateUrl: './accordion-basic.component.html',
})
export class AccordionBasicComponent {
  /**
     * If `true`, accordion will be animated.
     * @default true
     */
  animation: boolean = true;

  /**
   * An array or comma separated strings of panel ids that should be opened **initially**.
   *
   * For subsequent changes use methods like `expand()`, `collapse()`, etc. and
   * the `(panelChange)` event.
   */
  activeIds: string[] = [];

  /**
   *  If `true`, only one panel could be opened at a time.
   *
   *  Opening a new panel will close others.
   */
  singleSelect: boolean;

  /**
   * Type of panels.
   *
   * Bootstrap provides styles for the following types: `'success'`, `'info'`, `'warning'`, `'danger'`, `'primary'`,
   * `'secondary'`, `'light'` and `'dark'`.
   */
  bordered: boolean;

  /**
   * Heading level to use for accordion headers - possible inputs are anywhere from heading level 2 to 6.
   */
  headerLevel: 2 | 3 | 4 | 5 | 6 = 4;

  onPanelChange($event) {
    console.log($event);
  }

  shown($event) {
    console.log($event);
  }

  hidden($event) {
    console.log($event);
  }
}