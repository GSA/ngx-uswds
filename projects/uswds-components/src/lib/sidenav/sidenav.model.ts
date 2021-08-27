export interface SidenavModel {
  labelText: string;
  href: string;
  id?: any;
  selected?: boolean;
  children?: SidenavModel[];
  /**
   * Can any child links be seen
   */
  collapsed?: boolean;

  /** Any additional data users may want to attach to the sidenav model */
  optionalData?: any;
}
